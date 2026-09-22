// src/components/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
            <Link href="/skd" className="text-sm font-semibold text-slate-600 hover:text-nekoma-orange transition-colors">
              Katalog SKD
            </Link>
            <Link href="/skb" className="text-sm font-semibold text-slate-600 hover:text-nekoma-orange transition-colors">
              Katalog SKB
            </Link>
            <Link href="/tryout" className="text-sm font-semibold text-slate-600 hover:text-nekoma-orange transition-colors">
              Paket Tryout
            </Link>
            <a href="#fitur" className="text-sm font-semibold text-slate-600 hover:text-nekoma-orange transition-colors">
              Fitur
            </a>
            
            {/* CTA Utama */}
            <a
              href="#klaim-soal"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-nekoma-orange text-white text-sm font-bold hover:bg-nekoma-dark-orange transition-all shadow-sm hover:shadow-md"
            >
              Akses Soal Gratis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Toggle Menu"
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
          <div className="md:hidden border-t border-slate-100 py-4 space-y-2">
            <Link href="/skd" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Katalog SKD
            </Link>
            <Link href="/skb" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Katalog SKB
            </Link>
            <Link href="/tryout" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
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
                Akses Soal Gratis
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}