'use client'

import { useState, type ReactNode } from 'react'

type CategoryKey = 'skd' | 'skb' | 'kedinasan' | 'pppk'

interface TryoutTypeSection {
  title: string
  desc: string
  icon: ReactNode
}

interface CategoryContent {
  eyebrow: string
  title: string
  subtitle: string
  parts: TryoutTypeSection[]
}

const icons = {
  flag: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3v18M5 4h11l-2.5 3.5L16 11H5"
      />
    </svg>
  ),

  brain: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-1 5.6V15a3 3 0 0 0 3 3h1m4-14a3 3 0 0 1 3 3v1a3 3 0 0 1 1 5.6V15a3 3 0 0 1-3 3h-1M9 4v14m6-14v14"
      />
    </svg>
  ),

  heart: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-7-4.35-9.5-8.8C.8 8 2.4 4.5 6 4.5c2 0 3.3 1.2 6 3.8 2.7-2.6 4-3.8 6-3.8 3.6 0 5.2 3.5 3.5 6.7C19 15.65 12 20 12 20Z"
      />
    </svg>
  ),

  laptop: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="10"
        rx="1"
        strokeLinejoin="round"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 19h20M9 19l1-4h4l1 4"
      />
    </svg>
  ),

  stethoscope: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 4v6a4 4 0 0 0 8 0V4M6 4H4.5M14 4h1.5M18 12v2a6 6 0 0 1-12 0v-2"
      />
      <circle cx="19" cy="10" r="2" />
    </svg>
  ),

  run: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="14.5" cy="4.5" r="1.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 8l3 2 3 4-1 6M14 10l-4 1-2 5M7 12l4 1 2 3-1 5"
      />
    </svg>
  ),

  clipboard: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9V4ZM8 12l2.5 2.5L16 9"
      />
    </svg>
  ),

  chat: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16v11H8l-4 4V5Z"
      />
    </svg>
  ),

  target: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="12"
        cy="12"
        r="0.6"
        fill="currentColor"
      />
    </svg>
  ),

  users: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 7.5a2.7 2.7 0 1 1 0 5.4M20.5 20c0-2.6-1.9-4.6-4.5-5.3"
      />
    </svg>
  ),
}

const CATEGORY_DATA: Record<CategoryKey, CategoryContent> = {
  skd: {
    eyebrow: 'CPNS · Tahap 1',
    title: 'Bagian Tes SKD CPNS',
    subtitle: 'Tiga jenis tes utama dalam Seleksi Kompetensi Dasar.',
    parts: [
      {
        title: 'TWK — Wawasan Kebangsaan',
        desc: 'Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI.',
        icon: icons.flag,
      },
      {
        title: 'TIU — Intelegensia Umum',
        desc: 'Kemampuan verbal, numerik, figural, dan logika.',
        icon: icons.brain,
      },
      {
        title: 'TKP — Karakteristik Pribadi',
        desc: 'Integritas, pelayanan publik, kerja sama, dan orientasi hasil.',
        icon: icons.heart,
      },
    ],
  },

  skb: {
    eyebrow: 'CPNS · Tahap 2',
    title: 'Bagian Tes SKB CPNS',
    subtitle: 'Materi SKB menyesuaikan formasi dan instansi yang dilamar.',
    parts: [
      {
        title: 'Kompetensi Teknis',
        desc: 'Tes sesuai bidang dan kebutuhan formasi yang dilamar.',
        icon: icons.laptop,
      },
      {
        title: 'Tes Tambahan Instansi',
        desc: 'Dapat mencakup psikotes, tes fisik, atau uji kompetensi tertentu.',
        icon: icons.clipboard,
      },
      {
        title: 'Wawancara',
        desc: 'Menggali kesiapan, motivasi, dan kesesuaian dengan jabatan.',
        icon: icons.chat,
      },
    ],
  },

  kedinasan: {
    eyebrow: 'Sekolah Kedinasan',
    title: 'Bagian Tes Sekolah Kedinasan',
    subtitle:
      'Seleksi dasar ditambah tahapan khusus sesuai sekolah kedinasan.',
    parts: [
      {
        title: 'TWK, TIU & TKP',
        desc: 'Materi dasar seleksi yang menjadi bagian dari SKD.',
        icon: icons.brain,
      },
      {
        title: 'Tes Kesehatan',
        desc: 'Pemeriksaan kesehatan sesuai standar instansi.',
        icon: icons.stethoscope,
      },
      {
        title: 'Kesamaptaan',
        desc: 'Tes kebugaran seperti lari, push-up, dan sit-up pada instansi tertentu.',
        icon: icons.run,
      },
      {
        title: 'Psikotes & Wawancara',
        desc: 'Tahapan untuk melihat aspek kepribadian dan kesiapan peserta.',
        icon: icons.chat,
      },
    ],
  },

  pppk: {
    eyebrow: 'PPPK',
    title: 'Bagian Tes PPPK',
    subtitle:
      'Seleksi kompetensi yang disesuaikan dengan jabatan yang dilamar.',
    parts: [
      {
        title: 'Kompetensi Teknis',
        desc: 'Mengukur penguasaan bidang sesuai jabatan yang dilamar.',
        icon: icons.laptop,
      },
      {
        title: 'Manajerial',
        desc: 'Kemampuan mengelola pekerjaan, mengambil keputusan, dan bekerja dalam tim.',
        icon: icons.target,
      },
      {
        title: 'Sosial Kultural',
        desc: 'Kemampuan beradaptasi dan bekerja dalam lingkungan yang beragam.',
        icon: icons.users,
      },
      {
        title: 'Wawancara',
        desc: 'Menilai kesiapan dan motivasi kerja dalam rangkaian seleksi.',
        icon: icons.chat,
      },
    ],
  },
}

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'skd', label: 'SKD CPNS' },
  { key: 'skb', label: 'SKB CPNS' },
  { key: 'kedinasan', label: 'Kedinasan' },
  { key: 'pppk', label: 'PPPK' },
]

export default function TryoutTypeSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('skd')
  const data = CATEGORY_DATA[activeCategory]

  return (
    <section
      id="tryout"
      className="scroll-mt-24 bg-white"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-nekoma-orange">
            Pilihan Tryout
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-nekoma-navy sm:text-3xl">
            Persiapkan tes sesuai tujuanmu
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Pilih jenis seleksi untuk melihat bagian tes yang perlu kamu
            persiapkan.
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => {
            const isActive = activeCategory === item.key

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveCategory(item.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-nekoma-orange text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-nekoma-orange'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-7">
            <span className="text-xs font-semibold uppercase tracking-wide text-nekoma-orange">
              {data.eyebrow}
            </span>

            <h3 className="mt-1 text-xl font-bold tracking-tight text-nekoma-navy sm:text-2xl">
              {data.title}
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              {data.subtitle}
            </p>
          </div>

          <div className="grid divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {data.parts.map((part) => (
              <article
                key={part.title}
                className="group flex gap-4 p-5 transition-colors hover:bg-orange-50/40 sm:p-6"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-orange-50 text-nekoma-orange transition-transform group-hover:scale-105">
                  <div className="h-5 w-5">
                    {part.icon}
                  </div>
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-nekoma-navy">
                    {part.title}
                  </h4>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {part.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
