"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock, FileQuestion, ShieldCheck } from "lucide-react";

interface TryoutPackageData {
  id: number;
  title: string;
  description: string;
  mode: "SKD" | "BASIC";
  duration_minutes: number;
  questions_count: number;
  price?: number | null;
  slug?: string;
}

const DUMMY_PACKAGES: TryoutPackageData[] = [
  {
    id: 1,
    title: "Paket 1 — SKD CPNS Reguler",
    description:
      "Simulasi ujian SKD lengkap mengikuti kisi-kisi terbaru 2026: TWK, TIU, dan TKP dengan skema skor resmi BKN.",
    mode: "SKD",
    duration_minutes: 100,
    questions_count: 110,
    price: null,
  },
  {
    id: 2,
    title: "Paket 2 — SKD CPNS Intensif",
    description:
      "Tingkat kesulitan disesuaikan mendekati soal asli, dilengkapi pembahasan tiap butir soal untuk evaluasi mandiri.",
    mode: "SKD",
    duration_minutes: 100,
    questions_count: 110,
    price: null,
  },
];

const CATEGORY_LABEL: Record<string, string> = {
  SKD: "SKD CPNS",
  BASIC: "Tryout Umum",
};

function formatPrice(price?: number | null) {
  if (!price) return "Segera hadir";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function PackageCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-neutral-200 bg-white p-6 md:p-7">
      <div className="h-32 rounded-2xl bg-neutral-100" />
      <div className="mt-6 h-4 w-20 rounded-full bg-neutral-100" />
      <div className="mt-3 h-6 w-3/4 rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-full rounded bg-neutral-100" />
      <div className="mt-1 h-4 w-5/6 rounded bg-neutral-100" />
      <div className="mt-6 h-11 w-full rounded-xl bg-neutral-100" />
    </div>
  );
}

function PackageIllustration({ mode }: { mode: TryoutPackageData["mode"] }) {
  return (
    <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-200/60" />
      <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-amber-200/50" />
      <ShieldCheck className="relative h-12 w-12 text-orange-600" strokeWidth={1.75} />
    </div>
  );
}

function PackageCard({ pkg }: { pkg: TryoutPackageData }) {
  return (
    <div className="group flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 md:p-7">
      <PackageIllustration mode={pkg.mode} />

      <span className="mt-6 w-fit rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-600">
        {CATEGORY_LABEL[pkg.mode] ?? pkg.mode}
      </span>

      <h3 className="mt-3 font-[family-name:var(--font-jakarta)] text-xl font-bold leading-snug text-neutral-900">
        {pkg.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-neutral-500">
        {pkg.description}
      </p>

      <div className="mt-5 flex items-center gap-4 text-xs font-medium text-neutral-500">
        <span className="flex items-center gap-1.5">
          <FileQuestion className="h-4 w-4 text-neutral-400" />
          {pkg.questions_count} soal
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-neutral-400" />
          {pkg.duration_minutes} menit
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
        <span className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-neutral-900">
          {formatPrice(pkg.price)}
        </span>

        <a
          href={`https://wa.me/6285777126038?text=Halo,+saya+mau+tanya+tentang+${encodeURIComponent(
            pkg.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-orange-700"
        >
          Lihat Detail
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

export default function TryoutPackage() {
  const [packages, setPackages] = useState<TryoutPackageData[]>(DUMMY_PACKAGES);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPackages() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_TRYOUT_API_URL;
        if (!apiUrl) {
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${apiUrl}/api/tryout-packages/public`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Gagal memuat paket tryout");

        const data: TryoutPackageData[] = await res.json();

        if (data.length > 0) {
          setPackages(data);
          setUsingFallback(false);
        }
      } catch {
        setUsingFallback(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadPackages();
    return () => controller.abort();
  }, []);

  return (
    <section id="paket-tryout" className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Paket Try Out
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
            Simulasi SKD CPNS mengikuti kisi-kisi 2026
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-500">
            Pilih paket yang sesuai tahap persiapanmu. Setiap paket memakai
            skema skor resmi dan bisa dikerjakan ulang untuk mengukur progres.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {isLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <PackageCardSkeleton key={i} />
              ))
            : packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>

        {!isLoading && usingFallback && (
          <p className="mt-6 text-center text-xs text-neutral-400">
            Menampilkan contoh paket. Hubungi admin untuk info paket terbaru.
          </p>
        )}
      </div>
    </section>
  );
}