'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

// ⚠️ Cocokkan dulu nomor ini dengan WA Admin yang benar sebelum deploy —
// kode lama pakai 6285777126038, pesanmu barusan nulis 628577126038.
const ADMIN_WA_NUMBER = '6285777126038'

const FORMASI_OPTIONS = [
  { id: 'skd', label: 'SKD CPNS' },
  { id: 'kedinasan', label: 'Sekolah Kedinasan' },
  { id: 'skb', label: 'SKB CPNS' },
  { id: 'pppk', label: 'PPPK' },
] as const

export default function HeroSection() {
  const [formasi, setFormasi] = useState<(typeof FORMASI_OPTIONS)[number]>(FORMASI_OPTIONS[0])

  // Klik langsung buka WhatsApp — nggak ada field yang harus diisi manual.
  // Log klik ke Supabase itu optional dan nggak blocking; kalau gagal, redirect tetap jalan.
  const handleCtaClick = (intent: 'mini-tryout' | 'daftar') => {
    supabase
      .from('leads')
      .insert({
        target_formasi: formasi.label,
        intent,
        source: 'landing_hero',
      })
      .then(({ error }) => {
        if (error) console.error('Supabase log error:', error.message)
      })

    const message =
      intent === 'mini-tryout'
        ? `Halo Admin Nekoma Academy, saya mau coba mini tryout gratis untuk ${formasi.label}.`
        : `Halo Admin Nekoma Academy, saya mau daftar bimbel untuk ${formasi.label}.`

    window.location.href = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">

          {/* Kolom kiri: headline & konteks */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] text-nekoma-navy max-w-xl">
              Bersama <span className="text-nekoma-orange">Nekoma Academy</span>, belajar jadi lebih terarah.
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-lg">
              <strong className="text-nekoma-navy">Gratis trial tryout sebelum daftar.</strong> Latihan soal mengikuti standar CAT BKN terbaru,
              lengkap dengan evaluasi passing grade dan posisi rankingmu dibanding peserta lain.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg border-t border-slate-200 pt-6">
              <div>
                <dt className="text-2xl font-bold text-slate-900">500+</dt>
                <dd className="text-sm text-slate-500 mt-1">Soal sesuai kisi-kisi BKN</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">Real-time</dt>
                <dd className="text-sm text-slate-500 mt-1">Simulasi CAT, bukan hanya latihan biasa</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">Nasional</dt>
                <dd className="text-sm text-slate-500 mt-1">Ranking & evaluasi hasil</dd>
              </div>
            </dl>
          </div>

          {/* Kolom kanan: pilih formasi + dua aksi langsung ke WA */}
          <div className="lg:col-span-5" id="klaim-soal">
            <div className="relative pl-6 border-l-2 border-nekoma-orange">
              <h2 className="text-lg font-bold text-slate-900">
                Pilih seri tryout, langsung mulai.
              </h2>
              <p className="text-sm text-slate-500 mt-1 mb-5">
                Nggak perlu isi form. Klik seri tryout, klik tombol, admin kami lanjut lewat WhatsApp.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {FORMASI_OPTIONS.map((option) => {
                  const active = option.id === formasi.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFormasi(option)}
                      aria-pressed={active}
                      className={`px-3.5 py-2 rounded-md text-sm font-medium border transition-colors ${
                        active
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleCtaClick('mini-tryout')}
                  className="w-full py-3.5 px-6 rounded-md bg-nekoma-orange hover:bg-nekoma-dark-orange text-white font-bold text-sm transition-colors"
                >
                  Coba Mini Tryout Gratis
                </button>
                <button
                  type="button"
                  onClick={() => handleCtaClick('daftar')}
                  className="w-full py-3.5 px-6 rounded-md border border-slate-300 text-slate-800 font-semibold text-sm hover:border-slate-400 transition-colors"
                >
                  Daftar Bimbel Lengkap
                </button>
              </div>

              <p className="text-xs text-slate-400 mt-4">
                Terhubung langsung dengan Admin Nekoma Academy di WhatsApp.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
