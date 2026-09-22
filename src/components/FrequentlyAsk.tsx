'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'Apa itu SKD CPNS dan apa saja yang diujikan?',
    answer:
      'SKD (Seleksi Kompetensi Dasar) adalah tahap awal seleksi CPNS, terdiri dari tiga jenis tes: TWK (Tes Wawasan Kebangsaan), TIU (Tes Intelegensia Umum), dan TKP (Tes Karakteristik Pribadi). Ketiganya diujikan lewat sistem CAT BKN dan punya ambang batas (passing grade) masing-masing yang harus dicapai bersamaan.',
  },
  {
    question: 'Apa itu SKB CPNS dan apa saja yang diujikan?',
    answer:
      'SKB (Seleksi Kompetensi Bidang) adalah tahap berikutnya setelah SKD, di mana peserta diuji kemampuan profesional sesuai dengan bidang pekerjaan yang dilamar. Tes ini biasanya berupa ujian tulis atau wawancara.',
  },
  {
    question: 'Apa itu Tes Kompetensi PPPK dan apa saja yang diujikan?',
    answer:
      'Tes Kompetensi PPPK adalah ujian yang diadakan untuk menilai kemampuan profesional calon PPPK. Tes tulis biasanya terdiri dari kompetensi teknis, kompetensi manajerial, kompetensi sosial kultural, dan wawancara berbasis CAT.',
  },
{
    question: 'Bedanya persiapan CPNS dan Sekolah Kedinasan apa?',
    answer:
      'Materi dasarnya mirip — TWK, TIU, dan TKP tetap jadi fondasi. Bedanya, Sekolah Kedinasan biasanya menambahkan tahapan lain seperti tes kesehatan, kesamaptaan, dan psikotes sesuai ketentuan masing-masing instansi (STAN, IPDN, STIS, dan lainnya). Di Nekoma Academy, materi disesuaikan dengan jalur yang kamu ambil.',
  },
  {
    question: 'Soal-soalnya sesuai kisi-kisi BKN nggak?',
    answer:
      'Iya. Bank soal disusun mentor kami berdasarkan kisi-kisi resmi BKN, dipadukan dengan FR (feedback/recall soal) dari peserta ujian periode-periode sebelumnya. Bobot dan tingkat kesulitan tiap kategori juga diselaraskan supaya simulasinya mendekati kondisi ujian asli, dan diperbarui tiap ada perubahan pola soal.',
  },
  {
    question: 'Gimana cara coba mini tryout gratisnya?',
    answer:
      'Tinggal pilih formasi kamu di bagian atas halaman ini, lalu klik "Coba Mini Tryout Gratis". Kamu akan langsung dapat beberapa soal contoh dan skor evaluasi dibanding passing grade — tanpa perlu isi data dulu.',
  },
  {
    question: 'Kalau mau ikut paket bimbel lengkap, daftarnya gimana?',
    answer:
      'Klik "Daftar Bimbel Lengkap", kamu akan diarahkan ke WhatsApp Admin untuk penjelasan paket, jadwal, dan pembayaran. Semua proses pendaftaran dibantu langsung oleh admin, bukan sistem otomatis.',
  },
  {
    question: 'Ada bahan bacaan buat menentukan formasi yang tepat?',
    answer:
      'Ada — ebook Analisis Formasi CPNS kami, berisi rekapan dan rekomendasi  formasi sesuai ijazah, buat bantu kamu mempertimbangkan pilihan formasi. Detail dan cara belinya ada di bagian atas, sebelum FAQ ini.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section id="faq" className="bg-white border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-nekoma-navy">
          Frequently Ask Question
        </h2>
        <p className="mt-3 text-slate-600">
          Kalau masih ada yang kurang jelas, bisa langsung tanya admin lewat WhatsApp.
        </p>

        <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-nekoma-navy">{item.question}</span>
                  <span
                    className={`mt-1 flex-none w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'border-nekoma-orange rotate-45'
                        : 'border-slate-300'
                    }`}
                  >
                    <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                      <path
                        d="M5 0v10M0 5h10"
                        stroke={isOpen ? '#f36b3c' : '#64748b'}
                        strokeWidth="1.2"
                      />
                    </svg>
                  </span>
                </button>

                {/* Grid-rows trick: animates height without measuring JS, no extra deps */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}