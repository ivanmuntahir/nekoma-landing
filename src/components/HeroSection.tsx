'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const ADMIN_WA_NUMBER = '6285777126038'

const NEED_OPTIONS = [
  {
    id: 'skd',
    label: 'SKD CPNS',
    description: 'Latihan dan simulasi SKD',
    type: 'tryout',
  },
  {
    id: 'skb',
    label: 'SKB CPNS',
    description: 'Persiapan sesuai formasi',
    type: 'tryout',
  },
  {
    id: 'kedinasan',
    label: 'Sekolah Kedinasan',
    description: 'Persiapan seleksi kedinasan',
    type: 'tryout',
  },
  {
    id: 'pppk',
    label: 'PPPK',
    description: 'Latihan sesuai kebutuhan jabatan',
    type: 'tryout',
  },
  {
    id: 'ebook',
    label: 'Ebook Formasi CPNS',
    description: 'Analisis formasi dan target',
    type: 'ebook',
  },
] as const

type NeedId = (typeof NEED_OPTIONS)[number]['id']

export default function HeroSection() {
  const [selectedNeed, setSelectedNeed] = useState<NeedId>('skd')

  const selected = NEED_OPTIONS.find((item) => item.id === selectedNeed)!

  const sendToWhatsApp = (
    intent: 'mini-tryout' | 'consultation' | 'ebook',
  ) => {
    const intentLabel =
      intent === 'mini-tryout'
        ? 'mini tryout gratis'
        : intent === 'ebook'
          ? 'Ebook Analisis Formasi CPNS'
          : 'konsultasi'

    supabase
      .from('leads')
      .insert({
        target_formasi: selected.label,
        intent,
        source: 'landing_hero',
      })
      .then(({ error }) => {
        if (error) {
          console.error('Supabase log error:', error.message)
        }
      })

    let message = ''

    if (intent === 'mini-tryout') {
      message = `Halo Admin Nekoma Academy, saya mau coba mini tryout gratis untuk ${selected.label}.`
    }

    if (intent === 'consultation') {
      message = `Halo Admin Nekoma Academy, saya ingin konsultasi mengenai ${selected.label}.`
    }

    if (intent === 'ebook') {
      message =
        'Halo Admin Nekoma Academy, saya tertarik dengan Ebook Analisis Formasi CPNS. Boleh minta ebooknya?'
    }

    if (intentLabel) {
      window.location.href = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`
    }
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-nekoma-orange">
                <span className="h-1.5 w-1.5 rounded-full bg-nekoma-orange" />
                Persiapan CPNS & ASN lebih terarah
              </div>

              <h1 className="max-w-xl text-4xl font-bold leading-[1.1] tracking-tight text-nekoma-navy sm:text-5xl lg:text-[3.35rem]">
                Bersama{' '}
                <span className="text-nekoma-orange">Nekoma Academy</span>,
                belajar jadi lebih terarah.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                <strong className="text-nekoma-navy">
                  Gratis trial tryout sebelum daftar.
                </strong>{' '}
                Latihan soal mengikuti standar CAT BKN, lengkap dengan evaluasi
                hasil dan gambaran posisi performamu.
              </p>

              <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-slate-200 py-5">
                <div className="pr-4">
                  <dt className="text-xl font-bold text-slate-900 sm:text-2xl">
                    100+
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Soal sesuai kisi-kisi
                  </dd>
                </div>

                <div className="border-l border-slate-200 px-4">
                  <dt className="text-xl font-bold text-slate-900 sm:text-2xl">
                    CAT
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Simulasi seperti ujian
                  </dd>
                </div>

                <div className="border-l border-slate-200 pl-4">
                  <dt className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Evaluasi
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Hasil & perkembangan
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="lg:col-span-5" id="klaim-soal">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-100/70 blur-3xl" />

              <div className="relative p-5 sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-nekoma-orange">
                    Mulai dari sini
                  </p>

                  <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                    Apa yang sedang kamu cari?
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Pilih kebutuhanmu. Setelah itu, pilih aksi yang paling
                    sesuai dan langsung terhubung dengan admin.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {NEED_OPTIONS.map((option) => {
                    const active = option.id === selectedNeed

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedNeed(option.id)}
                        aria-pressed={active}
                        className={`rounded-xl border px-3.5 py-3 text-left transition-all ${
                          active
                            ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-white'
                        } ${option.id === 'ebook' ? 'col-span-2' : ''}`}
                      >
                        <span className="block text-sm font-semibold">
                          {option.label}
                        </span>

                        <span
                          className={`mt-0.5 block text-[11px] leading-relaxed ${
                            active ? 'text-slate-300' : 'text-slate-400'
                          }`}
                        >
                          {option.description}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="my-5 h-px bg-slate-200" />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Pilihanmu
                  </p>

                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {selected.label}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {selected.description}
                  </p>
                </div>

                <div className="mt-4 space-y-2.5">
                  {selected.type === 'ebook' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => sendToWhatsApp('ebook')}
                        className="group flex w-full items-center justify-between rounded-xl bg-nekoma-orange px-4 py-3.5 text-left text-white transition-colors hover:bg-nekoma-dark-orange"
                      >
                        <span>
                          <span className="block text-sm font-bold">
                            Minta Ebook via WhatsApp
                          </span>
                          <span className="mt-0.5 block text-xs text-white/75">
                            Hubungi admin untuk mendapatkan ebook
                          </span>
                        </span>

                        <span className="ml-4 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/15 text-base transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => sendToWhatsApp('consultation')}
                        className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        <span>
                          <span className="block text-sm font-bold text-slate-900">
                            Konsultasi Formasi
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            Diskusikan target formasi dengan admin
                          </span>
                        </span>

                        <span className="ml-4 text-lg text-slate-400 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => sendToWhatsApp('mini-tryout')}
                        className="group flex w-full items-center justify-between rounded-xl bg-nekoma-orange px-4 py-3.5 text-left text-white transition-colors hover:bg-nekoma-dark-orange"
                      >
                        <span>
                          <span className="block text-sm font-bold">
                            Coba Mini Tryout Gratis
                          </span>
                          <span className="mt-0.5 block text-xs text-white/75">
                            Ukur kemampuan awalmu
                          </span>
                        </span>

                        <span className="ml-4 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/15 text-base transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => sendToWhatsApp('consultation')}
                        className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-slate-300 hover:bg-slate-50"
                      >
                        <span>
                          <span className="block text-sm font-bold text-slate-900">
                            Konsultasi Bimbel
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            Langsung terhubung dengan admin
                          </span>
                        </span>

                        <span className="ml-4 text-lg text-slate-400 transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    </>
                  )}
                </div>

                <p className="mt-4 text-center text-[11px] text-slate-400">
                  Kamu akan diarahkan langsung ke WhatsApp Admin Nekoma
                  Academy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
