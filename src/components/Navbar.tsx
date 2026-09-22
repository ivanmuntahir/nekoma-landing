'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const tryoutMenu = [
  {
    label: 'SKD CPNS',
    desc: 'TWK, TIU, dan TKP',
    href: '#tryout',
  },
  {
    label: 'SKB CPNS',
    desc: 'Tes sesuai formasi dan instansi',
    href: '#tryout',
  },
  {
    label: 'Sekolah Kedinasan',
    desc: 'Persiapan seleksi sekolah kedinasan',
    href: '#tryout',
  },
  {
    label: 'PPPK',
    desc: 'Latihan kompetensi PPPK',
    href: '#tryout',
  },
  {
    label: 'Ebook Analisis Formasi CPNS',
    desc: 'Panduan memahami dan memilih formasi',
    href: '#ebook-formasi',
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTryoutOpen, setIsTryoutOpen] = useState(false)
  const [isMobileTryoutOpen, setIsMobileTryoutOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTryoutOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setIsMobileTryoutOpen(false)
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between sm:h-[74px]">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          >
            <Image
              src="/img/logo.webp"
              alt="Nekoma Academy"
              width={44}
              height={44}
              className="h-10 w-auto object-contain sm:h-11"
              priority
            />

            <div className="leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  NEKOMA
                </span>

                <span className="text-xs font-semibold tracking-[0.08em] text-slate-600 sm:text-sm">
                  ACADEMY
                </span>
              </div>

              <div className="mt-1 hidden text-[9px] uppercase tracking-[0.25em] text-slate-400 sm:block">
                Belajar dari Rumah
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsTryoutOpen((value) => !value)}
                aria-expanded={isTryoutOpen}
                aria-haspopup="true"
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-nekoma-orange"
              >
                Tryout

                <svg
                  className={`h-4 w-4 transition-transform ${
                    isTryoutOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isTryoutOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-80 -translate-x-1/2 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                  {tryoutMenu.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsTryoutOpen(false)}
                      className="block rounded-lg px-3 py-3 transition-colors hover:bg-orange-50"
                    >
                      <div className="text-sm font-semibold text-slate-800">
                        {item.label}
                      </div>

                      <div className="mt-0.5 text-xs text-slate-500">
                        {item.desc}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/mentor"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-nekoma-orange"
            >
              Mentor
            </Link>

            <a
              href="#faq"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-nekoma-orange"
            >
              FAQ
            </a>

            <a
              href="#klaim-soal"
              className="inline-flex items-center justify-center rounded-lg bg-nekoma-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-nekoma-dark-orange hover:shadow-md"
            >
              Coba Gratis
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-slate-100 py-4 md:hidden">
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setIsMobileTryoutOpen((value) => !value)}
                aria-expanded={isMobileTryoutOpen}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Tryout

                <svg
                  className={`h-4 w-4 transition-transform ${
                    isMobileTryoutOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isMobileTryoutOpen && (
                <div className="space-y-1 pl-3">
                  {tryoutMenu.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-orange-50"
                    >
                      <div className="text-sm font-medium text-slate-700">
                        {item.label}
                      </div>

                      <div className="mt-0.5 text-xs text-slate-500">
                        {item.desc}
                      </div>
                    </a>
                  ))}
                </div>
              )}

              <Link
                href="/mentor"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Mentor
              </Link>

              <a
                href="#faq"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                FAQ
              </a>
            </div>

            <div className="pt-3">
              <a
                href="#klaim-soal"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg bg-nekoma-orange px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition-colors hover:bg-nekoma-dark-orange"
              >
                Coba Gratis
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
