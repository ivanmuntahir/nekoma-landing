'use client'

import { useState, type FormEvent } from 'react'
import { supabase } from '@/lib/supabase'

export default function HeroSection() {
  const [nama, setNama] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [formasi, setFormasi] = useState('SKD CPNS')
  const [loading, setLoading] = useState(false)

  const handleSubmitLead = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. Simpan Lead ke Supabase Database
      const { error } = await supabase.from('leads').insert({
        nama,
        whatsapp,
        target_formasi: formasi,
        source: 'landing_hero',
      })

      if (error) {
        console.error('Supabase Error:', error.message)
        alert('Gagal menyimpan data, silakan coba lagi.')
        return
      }

      // 2. Redirect Otomatis ke WhatsApp Admin Nekoma Academy
      const targetNumber = '6285777126038' // Masukkan nomor WA Admin kamu
      const message = encodeURIComponent(
        `Halo Admin Nekoma Academy, saya ${nama}. Saya sudah daftar di website nekoma.id dan mau klaim akses gratis Latihan Soal & Tryout ${formasi}!`
      )

      window.location.href = `https://wa.me/${targetNumber}?text=${message}`
    } catch (err) {
      console.error('Error submitting lead:', err)
      alert('Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-orange-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Headline & Deskripsi */}
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-nekoma-orange animate-pulse"></span>
              <span className="text-xs font-bold text-nekoma-orange uppercase tracking-wider">
                Bimbel & Tryout CAT CPNS 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
              Persiapkan SKD & SKB CPNS <br className="hidden sm:block" />
              <span className="text-nekoma-orange">Tanpa Perlu Pusing.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              Latihan soal standar CAT BKN terbaru, pembahasannya analitis, lengkap dengan evaluasi passing grade & ranking nasional. Belajar dari mana saja!
            </p>

            {/* Feature Pills */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-nekoma-orange flex items-center justify-center font-bold text-xs">✓</span>
                Soal Sesuai FR Terbaru
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-nekoma-orange flex items-center justify-center font-bold text-xs">✓</span>
                Simulasi CAT Real-Time
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-100 text-nekoma-orange flex items-center justify-center font-bold text-xs">✓</span>
                Ranking & Evaluasi SKD
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Card Form Lead Capture (Marketing Funnel) */}
          <div className="lg:col-span-5" id="klaim-soal">
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Akses Gratis
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Dapatkan Bank Soal & Tryout SKD Gratis
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Isi form singkat untuk klaim bonus modul PDF & akses latihan soal.
                </p>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ivan Muntahir"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-nekoma-orange focus:border-nekoma-orange text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-nekoma-orange focus:border-nekoma-orange text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Ujian</label>
                  <select
                    value={formasi}
                    onChange={(e) => setFormasi(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-nekoma-orange focus:border-nekoma-orange text-sm outline-none transition-all bg-white"
                  >
                    <option value="SKD CPNS">SKD CPNS (TIU, TWK, TKP)</option>
                    <option value="SKB Pranata Komputer">SKB Pranata Komputer / Manggala Informatika</option>
                    <option value="SKB Teknis Lainnya">SKB Formasi Teknis Lainnya</option>
                    <option value="Sekolah Kedinasan">Sekolah Kedinasan</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-lg bg-nekoma-orange hover:bg-nekoma-dark-orange text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Memproses...' : 'Klaim Soal Gratis via WhatsApp'}
                </button>
              </form>
              
              <p className="text-[10px] text-center text-slate-400 mt-4">
                *Data kamu aman & langsung terhubung dengan Admin Nekoma Academy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
