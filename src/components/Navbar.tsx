// src/components/Navbar.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const tryoutMenu = [
  { label: 'Katalog SKD', desc: 'Seleksi Kompetensi Dasar CPNS', href: '/skd' },
  { label: 'Katalog SKB', desc: 'Seleksi Kompetensi Bidang per formasi', href: '/skb' },
  { label: 'Sekolah Kedinasan', desc: 'Persiapan tes masuk sekolah kedinasan', href: '/kedinasan' },
  { label: 'PPPK', desc: 'Latihan soal & tryout PPPK', href: '/pppk' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false) // mobile menu
  const [isTryoutOpen, setIsTryoutOpen] = useState(false) // desktop dropdown
  const [isMobileTryoutOpen, setIsMobileTryoutOpen] = useState(false) // mobile accordion
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Tutup dropdown desktop kalau klik di luar area
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsTryoutOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset state dropdown saat menu mobile ditutup
  useEffect(() => {
    if (!isOpen) setIsMobileTryoutOpen(false)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[68px] sm:h-[74px] flex items-center justify-between">

          {/* Logo Nekoma */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Image
              src="/img/logo.webp"
              alt="Nekoma Academy"
              width={44}
              height={44}
              className="h-10 sm:h-11 w-auto object-contain"
              priority
            />
            <div className="leading-none">
              <div className="flex items-baseline gap-1">
                <span className="font-extrabold tracking-tight text-lg sm:text-xl text-slate-900">
                  NEKOMA
                </span>
                <span className="font-semibold tracking-[0.08em] text-xs sm:text-sm text-slate-600">
                  ACADEMY
                </span>
              </div>
              <div className="hidden sm:block mt-1 text-[9px] tracking-[0.25em] text-slate-400 uppercase">
                Belajar dari Rumah
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {/* Dropdown Tryout */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsTryoutOpen((v) => !v)}
                aria-expanded={isTryoutOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-nekoma-orange transition-colors"
              >
                Tryout
                <svg
                  className={`w-4 h-4 transition-transform ${isTryoutOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isTryoutOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 rounded-xl border border-slate-100 bg-white p-2 shadow-lg">
                  {tryoutMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsTryoutOpen(false)}
                      className="block rounded-lg px-3 py-2.5 hover:bg-slate-50"
                    >
                      <div className="text-sm font-semibold text-slate-800">{item.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/paket-tryout" className="text-sm font-semibold text-slate-600 hover:text-nekoma-orange transition-colors">
              Paket Tryout
            </Link>
            <a
                href="#faq"
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-nekoma-orange"
                >
                FAQ
            </a>


            {/* CTA Utama */}
            <a
              href="#klaim-soal"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-nekoma-orange text-white text-sm font-bold hover:bg-nekoma-dark-orange transition-all shadow-sm hover:shadow-md"
            >
              Coba Gratis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-1">
            {/* Accordion Tryout */}
            <button
              type="button"
              onClick={() => setIsMobileTryoutOpen((v) => !v)}
              aria-expanded={isMobileTryoutOpen}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Tryout
              <svg
                className={`w-4 h-4 transition-transform ${isMobileTryoutOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMobileTryoutOpen && (
              <div className="pl-3 space-y-1">
                {tryoutMenu.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-nekoma-orange"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/paket-tryout" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Paket Tryout
            </Link>
            <a href="#fitur" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Fitur
            </a>

            <div className="pt-2">
              <a
                href="#klaim-soal"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-3 rounded-lg bg-nekoma-orange text-white text-sm font-bold shadow"
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
