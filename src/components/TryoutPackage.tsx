"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Clock, FileQuestion, Flame, Loader2, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* KONFIGURASI                                                         */
/* ------------------------------------------------------------------ */
const WA_NUMBER = "6285777126038";
const SALES_OPEN = true; // ubah ke false untuk mode "Segera Hadir" (tombol Beli dinonaktifkan)
const SERVICE_HOURS = "08.00–22.00 WIB"; // jam layanan admin
const CONFIRM_ETA = "maksimal 1×24 jam"; // estimasi konfirmasi
const QRIS_IMAGE = "/img/qris.webp"; // taruh gambar QRIS di public/img/qris.webp
const REGISTER_URL = "https://tryout.nekoma.id/dashboard/register";
const LOGIN_URL = "https://tryout.nekoma.id/dashboard/login";
const BUNDLE_QUOTA = 30; // ubah sesuai kebutuhan (saran: 30-50)
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
const BUNDLE = { price: 15000, original: 75000 };

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

function AccountHint() {
  return (
    <p className="mt-3 text-center text-[11px] leading-relaxed text-neutral-400">
      Belum punya akun?{" "}
      <a
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-orange-600 hover:underline"
      >
        Daftar di sini
      </a>
    </p>
  );
}

function waConfirmUrl(pkg: PackageData) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo admin Nekoma, saya sudah bayar via QRIS untuk ${pkg.title} (${rp(
      pkg.price
    )}). Email akun saya: (isi email). Bukti transfer saya lampirkan di chat ini.`
  )}`;
}

function PaymentModal({
  pkg,
  onClose,
}: {
  pkg: PackageData;
  onClose: () => void;
}) {
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Pembayaran ${pkg.title}`}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-sm overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="pr-8 text-xs font-bold uppercase tracking-wider text-orange-600">
          Pembayaran QRIS
        </p>
        <h3 className="mt-1 pr-8 font-[family-name:var(--font-jakarta)] text-base font-bold leading-snug text-neutral-900">
          {pkg.title}
        </h3>

        <div className="mt-4 rounded-2xl bg-orange-50 p-4 text-center">
          <p className="text-xs text-neutral-500">Total bayar</p>
          <p className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold text-[#102741]">
            {rp(pkg.price)}
          </p>
        </div>

        <div className="mt-4 flex justify-center rounded-2xl border border-neutral-200 bg-white p-3">
          {qrError ? (
            <p className="py-16 text-center text-sm text-neutral-400">
              QRIS belum tersedia. Silakan hubungi admin via WhatsApp.
            </p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={QRIS_IMAGE}
              alt="QRIS pembayaran Nekoma Academy"
              onError={() => setQrError(true)}
              className="h-auto w-full max-w-[260px] object-contain"
            />
          )}
        </div>

        <ol className="mt-4 list-decimal space-y-1 pl-5 text-xs leading-relaxed text-neutral-500">
          <li>Scan QRIS memakai m-banking atau e-wallet.</li>
          <li>
            Masukkan nominal <b>{rp(pkg.price)}</b> lalu bayar.
          </li>
          <li>Screenshot bukti bayar, lalu kirim ke admin.</li>
        </ol>

        <a
          href={waConfirmUrl(pkg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#102741] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0b1c30]"
        >
          Konfirmasi Admin via WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-center text-[11px] text-neutral-400">
          Paket diaktifkan admin setelah pembayaran dicek.
        </p>
        <p className="mt-2 rounded-lg bg-neutral-50 px-3 py-2 text-center text-[11px] leading-relaxed text-neutral-500">
          Jam layanan admin {SERVICE_HOURS}. Konfirmasi {CONFIRM_ETA} setelah
          bukti bayar diterima.
        </p>
      </div>
    </div>,
    document.body
  );
}

function PackageCard({ pkg }: { pkg: PackageData }) {
  const [open, setOpen] = useState(false);

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
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={!SALES_OPEN}
          className="flex items-center gap-1.5 rounded-xl bg-[#102741] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0b1c30] disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:hover:bg-neutral-300"
        >
          {SALES_OPEN ? (
            <>
              Beli
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </>
          ) : (
            "Segera Hadir"
          )}
        </button>
      </div>
      <AccountHint />
      {open && <PaymentModal pkg={pkg} onClose={() => setOpen(false)} />}
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
  const [open, setOpen] = useState(false);
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
    if (busy || soldOut || !SALES_OPEN) return;
    if (honeypot.current?.value) return; // bot mengisi field tersembunyi
    if (now - lastClick.current < CLICK_COOLDOWN_MS) return;
    if (!withinAttemptLimit()) {
      setMessage("Terlalu banyak percobaan. Coba lagi beberapa saat.");
      return;
    }
    lastClick.current = now;
    setBusy(true);
    setMessage(null);

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
      setOpen(true);
    } catch {
      setMessage("Terjadi kendala. Silakan coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="group relative flex flex-col rounded-3xl border-2 border-orange-300 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5" id="paket-tryout">
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

      {SALES_OPEN && !soldOut && (
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
          disabled={!SALES_OPEN || soldOut || busy || !ready}
          className="flex items-center gap-1.5 rounded-xl bg-[#102741] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#0b1c30] disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : !SALES_OPEN ? (
            "Segera Hadir"
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

      <AccountHint />
      {open && <PaymentModal pkg={pkg} onClose={() => setOpen(false)} />}

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