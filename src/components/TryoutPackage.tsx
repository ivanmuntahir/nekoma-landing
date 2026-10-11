"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, FileQuestion, Flame, Loader2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* KONFIGURASI                                                         */
/* ------------------------------------------------------------------ */
const WA_NUMBER = "6285777126038";
const BUNDLE_QUOTA = 20; // ubah sesuai kebutuhan (saran: 30-50)
const MIN_DWELL_MS = 2500; // tombol "aktif" setelah kartu terlihat sekian ms
const CLICK_COOLDOWN_MS = 8000; // jeda antar klik
const MAX_ATTEMPTS_PER_HOUR = 5; // batas percobaan per browser

/**
 * KONTRAK BACKEND (wajib untuk keamanan sungguhan):
 *
 * GET  {API}/api/tryout-packages/bundle-stock
 *      -> { quota: number, sold: number }
 *
 * POST {API}/api/tryout-packages/bundle-claim
 *      body: { elapsed: number, website: string, turnstileToken?: string }
 *      -> 200 { ok: true }            (stok berhasil di-reserve, atomik)
 *      -> 409 { error: "sold_out" }   (stok habis)
 *      -> 429                          (rate limit per IP)
 *
 * Di server: pakai counter atomik (mis. UPDATE ... WHERE sold < quota),
 * rate limit per IP, dan verifikasi Cloudflare Turnstile.
 * Cek di browser saja BISA dilewati bot.
 */

interface PackageData {
  id: number;
  title: string;
  image: string; // path banner di /public/img
  description: string;
  duration_minutes: number;
  questions_count: number;
  price: number;
  original_price: number;
  isBundle?: boolean;
}

const discountPct = (price: number, original: number) =>
  Math.round(((original - price) / original) * 100);

const rp = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const SINGLE = { price: 12000, original: 25000 };
const BUNDLE = { price: 20000, original: 75000 };

const SINGLE_PACKAGES: PackageData[] = [1, 2, 3].map((part) => ({
  id: part,
  title: `Tryout SKD CASN Part ${part}`,
  image: `/img/banner-part-${part}.webp`,
  description: `Simulasi SKD lengkap (TWK, TIU, TKP) dengan skema skor resmi BKN. Diskon ${discountPct(
    SINGLE.price,
    SINGLE.original
  )}% dari harga awal ${rp(SINGLE.original)}.`,
  duration_minutes: 100,
  questions_count: 110,
  price: SINGLE.price,
  original_price: SINGLE.original,
}));

const BUNDLE_PACKAGE: PackageData = {
  id: 4,
  title: "Bundling Tryout SKD CASN Part 1, 2 & 3",
  image: "/img/banner-bundling.webp",
  description: `Terbatas untuk ${BUNDLE_QUOTA} orang pertama! Dapat 3 paket sekaligus, diskon ${discountPct(
    BUNDLE.price,
    BUNDLE.original
  )}% dari harga awal ${rp(BUNDLE.original)}.`,
  duration_minutes: 100,
  questions_count: 330,
  price: BUNDLE.price,
  original_price: BUNDLE.original,
  isBundle: true,
};

const PACKAGES: PackageData[] = [...SINGLE_PACKAGES, BUNDLE_PACKAGE];

/* ------------------------------------------------------------------ */
/* BANNER                                                              */
/* ------------------------------------------------------------------ */
function Banner({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="aspect-[16/9] w-full rounded-2xl object-cover"
    />
  );
}

/* ------------------------------------------------------------------ */
/* KARTU                                                               */
/* ------------------------------------------------------------------ */
function PriceBlock({ pkg }: { pkg: PackageData }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-neutral-400 line-through">
        {rp(pkg.original_price)}
      </span>
      <span className="font-[family-name:var(--font-jakarta)] text-xl font-bold text-[#102741]">
        {rp(pkg.price)}
      </span>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: PackageData }) {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo, saya mau order ${pkg.title}`
  )}`;

  return (
    <div className="group flex flex-col rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:p-5">
      <Banner src={pkg.image} alt={pkg.title} />

      <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-base font-bold leading-snug text-neutral-900">
        {pkg.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
        {pkg.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs font-medium text-neutral-500">
        <span className="flex items-center gap-1.5">
          <FileQuestion className="h-4 w-4 text-neutral-400" />
          {pkg.questions_count} soal
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-neutral-400" />
          {pkg.duration_minutes} menit
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
        <PriceBlock pkg={pkg} />
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl bg-[#102741] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0b1c30]"
        >
          Beli
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

function BundleCard({ pkg }: { pkg: PackageData }) {
  const apiUrl = process.env.NEXT_PUBLIC_TRYOUT_API_URL;
  const [sold, setSold] = useState(0);
  const [quota, setQuota] = useState(BUNDLE_QUOTA);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(Date.now());
  const lastClick = useRef(0);

  const soldOut = sold >= quota;
  const left = Math.max(quota - sold, 0);

  // ambil sisa stok dari server
  useEffect(() => {
    if (!apiUrl) return;
    const c = new AbortController();
    fetch(`${apiUrl}/api/tryout-packages/bundle-stock`, { signal: c.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setQuota(d.quota ?? BUNDLE_QUOTA);
          setSold(d.sold ?? 0);
        }
      })
      .catch(() => {});
    return () => c.abort();
  }, [apiUrl]);

  // tombol aktif setelah jeda minimal (bot instan akan gagal)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), MIN_DWELL_MS);
    return () => clearTimeout(t);
  }, []);

  function withinAttemptLimit() {
    try {
      const now = Date.now();
      const raw = localStorage.getItem("bundle_attempts");
      const list: number[] = (raw ? JSON.parse(raw) : []).filter(
        (t: number) => now - t < 3600_000
      );
      if (list.length >= MAX_ATTEMPTS_PER_HOUR) return false;
      list.push(now);
      localStorage.setItem("bundle_attempts", JSON.stringify(list));
    } catch {}
    return true;
  }

  async function handleClaim() {
    const now = Date.now();
    if (busy || soldOut) return;
    if (honeypot.current?.value) return; // bot mengisi field tersembunyi
    if (now - lastClick.current < CLICK_COOLDOWN_MS) return;
    if (!withinAttemptLimit()) {
      setMessage("Terlalu banyak percobaan. Coba lagi beberapa saat.");
      return;
    }
    lastClick.current = now;
    setBusy(true);
    setMessage(null);

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      `Halo, saya mau order ${pkg.title}`
    )}`;

    try {
      if (apiUrl) {
        const res = await fetch(`${apiUrl}/api/tryout-packages/bundle-claim`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            elapsed: now - mountedAt.current,
            website: honeypot.current?.value ?? "",
            // turnstileToken: token dari Cloudflare Turnstile (disarankan)
          }),
        });
        if (res.status === 409) {
          setSold(quota);
          return;
        }
        if (res.status === 429) {
          setMessage("Terlalu banyak permintaan. Coba lagi nanti.");
          return;
        }
        if (!res.ok) throw new Error();
        setSold((s) => s + 1);
      }
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch {
      setMessage("Terjadi kendala. Silakan coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="group relative flex flex-col rounded-3xl border-2 border-orange-300 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5">
      <span className="absolute -top-3 left-5 flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
        <Flame className="h-3 w-3" /> Paling Hemat
      </span>

      <Banner src={pkg.image} alt={pkg.title} />

      <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-base font-bold leading-snug text-neutral-900">
        {pkg.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-500">
        {pkg.description}
      </p>

      {!soldOut && (
        <p className="mt-3 text-xs font-semibold text-orange-600">
          Sisa {left} dari {quota} slot
        </p>
      )}

      <div className="mt-4 flex items-center gap-4 text-xs font-medium text-neutral-500">
        <span className="flex items-center gap-1.5">
          <FileQuestion className="h-4 w-4 text-neutral-400" />
          {pkg.questions_count} soal (3 paket)
        </span>
      </div>

      {/* honeypot: tersembunyi dari manusia */}
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
        <PriceBlock pkg={pkg} />
        <button
          type="button"
          onClick={handleClaim}
          disabled={soldOut || busy || !ready}
          className="flex items-center gap-1.5 rounded-xl bg-[#102741] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0b1c30] disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : soldOut ? (
            "Stok Habis"
          ) : (
            <>
              Beli
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {soldOut && (
        <p className="mt-3 rounded-lg bg-orange-50 px-3 py-2 text-xs font-medium text-orange-600">
          Mohon maaf, stok paket bundling habis.
        </p>
      )}
      {message && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          {message}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SECTION                                                             */
/* ------------------------------------------------------------------ */
export default function TryoutPackage() {
  return (
    <section id="paket-tryout" className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Paket Try Out
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
            Simulasi SKD CPNS mengikuti kisi-kisi 2026
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-500">
            Pilih paket satuan atau ambil bundling untuk harga paling hemat.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((pkg) =>
            pkg.isBundle ? (
              <BundleCard key={pkg.id} pkg={pkg} />
            ) : (
              <PackageCard key={pkg.id} pkg={pkg} />
            )
          )}
        </div>
      </div>
    </section>
  );
}