import type { ReactNode } from 'react'

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
      <rect x="4" y="5" width="16" height="10" rx="1" strokeLinejoin="round" />
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
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
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
    subtitle:
      'Tiga jenis tes yang harus dilewati melalui sistem CAT BKN, sesuai ambang batas resmi yang berlaku.',
    parts: [
      {
        title: 'TWK — Wawasan Kebangsaan',
        desc: 'Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI. Mengukur pemahaman nilai kebangsaan.',
        icon: icons.flag,
      },
      {
        title: 'TIU — Intelegensia Umum',
        desc: 'Kemampuan verbal, numerik, figural, dan logika. Bagian yang banyak membutuhkan latihan soal.',
        icon: icons.brain,
      },
      {
        title: 'TKP — Karakteristik Pribadi',
        desc: 'Integritas, pelayanan publik, kerja sama, dan orientasi hasil. Jawaban memiliki skor bertingkat.',
        icon: icons.heart,
      },
    ],
  },

  skb: {
    eyebrow: 'CPNS · Tahap 2',
    title: 'Bagian Tes SKB CPNS',
    subtitle:
      'Materi dan bentuk tes berbeda tergantung instansi dan formasi yang dilamar. Berikut gambaran umumnya.',
    parts: [
      {
        title: 'Kompetensi Teknis',
        desc: 'CAT atau praktik sesuai bidang formasi, seperti Pranata Komputer atau Analis.',
        icon: icons.laptop,
      },
      {
        title: 'Tes Tambahan Instansi',
        desc: 'Sebagian instansi menambahkan psikotes, tes fisik, atau uji kompetensi lapangan sesuai kebutuhan jabatan.',
        icon: icons.clipboard,
      },
      {
        title: 'Wawancara',
        desc: 'Menilai kesiapan kerja, motivasi, dan kesesuaian dengan unit kerja yang dituju.',
        icon: icons.chat,
      },
    ],
  },

  kedinasan: {
    eyebrow: 'Sekolah Kedinasan',
    title: 'Bagian Tes Sekolah Kedinasan',
    subtitle:
      'Dasarnya mirip SKD, ditambah beberapa tahap khusus yang menjadi ciri seleksi sekolah kedinasan seperti STAN, IPDN, dan STIS.',
    parts: [
      {
        title: 'TWK, TIU & TKP',
        desc: 'Materi dasar yang juga terdapat dalam SKD CPNS dan dapat menjadi bekal untuk kedua jalur seleksi.',
        icon: icons.brain,
      },
      {
        title: 'Tes Kesehatan',
        desc: 'Pemeriksaan fisik dan kesehatan sesuai standar masing-masing instansi kedinasan.',
        icon: icons.stethoscope,
      },
      {
        title: 'Kesamaptaan',
        desc: 'Tes kebugaran jasmani seperti lari, push-up, dan sit-up, terutama untuk instansi dengan tuntutan fisik tertentu.',
        icon: icons.run,
      },
      {
        title: 'Psikotes & Wawancara',
        desc: 'Menilai aspek kepribadian dan kesiapan untuk menjalani pendidikan kedinasan.',
        icon: icons.chat,
      },
    ],
  },

  pppk: {
    eyebrow: 'PPPK',
    title: 'Bagian Tes PPPK',
    subtitle:
      'Mekanismenya berbeda dari CPNS reguler, dengan kompetensi sesuai jabatan yang dilamar sebagai bagian utama seleksi.',
    parts: [
      {
        title: 'Kompetensi Teknis',
        desc: 'Soal sesuai bidang jabatan yang dilamar dan menjadi bagian utama dalam penilaian kompetensi.',
        icon: icons.laptop,
      },
      {
        title: 'Manajerial',
        desc: 'Mengukur kemampuan mengelola pekerjaan, mengambil keputusan, dan bekerja dalam tim.',
        icon: icons.target,
      },
      {
        title: 'Sosial Kultural',
        desc: 'Mengukur kepekaan terhadap keberagaman dan kemampuan beradaptasi di lingkungan kerja yang majemuk.',
        icon: icons.users,
      },
      {
        title: 'Wawancara',
        desc: 'Menilai aspek kesiapan dan motivasi kerja sebagai bagian dari rangkaian seleksi.',
        icon: icons.chat,
      },
    ],
  },
}

export default function TryoutTypeSection({
  category,
}: {
  category: CategoryKey
}) {
  const data = CATEGORY_DATA[category]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <span className="text-xs font-semibold tracking-wide text-nekoma-orange">
          {data.eyebrow}
        </span>

        <h2 className="mt-2 max-w-xl text-2xl font-bold tracking-tight text-nekoma-navy sm:text-3xl">
          {data.title}
        </h2>

        <p className="mt-3 max-w-xl text-slate-600">{data.subtitle}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {data.parts.map((part) => (
            <article
              key={part.title}
              className="flex gap-4 rounded-lg border border-slate-200 p-5"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-orange-50 text-nekoma-orange">
                <div className="h-5 w-5">{part.icon}</div>
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-nekoma-navy">
                  {part.title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {part.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
