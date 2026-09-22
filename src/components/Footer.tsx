import Image from 'next/image'
import Link from 'next/link'

const tryoutLinks = [
  { label: 'SKD CPNS', href: '#tryout' },
  { label: 'SKB CPNS', href: '#tryout' },
  { label: 'Sekolah Kedinasan', href: '#tryout' },
  { label: 'PPPK', href: '#tryout' },
  {
    label: 'Ebook Analisis Formasi CPNS',
    href: '#ebook-formasi',
  },
]

const nekomaLinks = [
  { label: 'Mentor', href: '/mentor' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Tentang Nekoma', href: '/tentang' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2 lg:max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/img/logo.webp"
                alt="Nekoma Academy"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />

              <div className="leading-none">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-extrabold tracking-tight text-slate-900">
                    NEKOMA
                  </span>

                  <span className="text-xs font-semibold tracking-[0.08em] text-slate-600">
                    ACADEMY
                  </span>
                </div>

                <span className="mt-1 block text-[8px] uppercase tracking-[0.2em] text-slate-400">
                  Belajar dari Rumah
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-500">
              Platform belajar untuk membantu persiapan SKD CPNS, SKB CPNS,
              Sekolah Kedinasan, dan PPPK melalui latihan soal, tryout, materi,
              dan evaluasi belajar.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Tryout</h3>

            <ul className="mt-4 space-y-3">
              {tryoutLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-500 transition-colors hover:text-nekoma-orange"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Nekoma</h3>

            <ul className="mt-4 space-y-3">
              {nekomaLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 transition-colors hover:text-nekoma-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-900">
                Ikuti Kami
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/nekoma.academy_id?stkn=ZTRtbnh6cnVvMjIx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Nekoma Academy"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-orange-200 hover:text-nekoma-orange"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      ry="5"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@nekoma.academy_id?_r=1&_t=ZS-99tOOFHKvRN"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Nekoma Academy"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-orange-200 hover:text-nekoma-orange"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M16.6 3c.4 2.4 1.8 4.1 4.4 4.3v3.1c-1.5 0-2.9-.4-4.2-1.2v6.3c0 4.1-3 6.8-6.7 6.8-3.6 0-6.3-2.4-6.3-5.8 0-3.6 3-6.1 6.7-6.1.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-1.7 0-3.5 1.1-3.5 3 0 1.6 1.2 2.7 2.9 2.7 1.9 0 3.7-1.1 3.7-4V3h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            © {year} Nekoma Academy. All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Belajar dari rumah.
          </p>
        </div>
      </div>
    </footer>
  )
}
