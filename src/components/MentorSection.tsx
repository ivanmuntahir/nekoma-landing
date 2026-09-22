type Mentor = {
  name: string
  achievement: string
  score: string
  position: string
  initials: string
  linkedin: string
}

const mentors: Mentor[] = [
  {
    name: 'Ivan',
    achievement: 'SKD CPNS 2024',
    score: '438',
    position: 'Fungsional Sandiman Ahli Pertama',
    initials: 'IV',
    linkedin: 'https://www.linkedin.com/in/muhammadivanmuntahir/',
  },
  {
    name: 'Yavid',
    achievement: 'PPPK 2022',
    score: '502',
    position: 'Fungsional Pranata Humas Ahli Pertama',
    initials: 'YV',
    linkedin: 'https://www.linkedin.com/in/yavid-rahmat-perwita-46771121b/',
  },
]

export default function MentorSection() {
  return (
    <section id="mentor" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold tracking-wide text-orange-600">
            MENTOR NEKOMA ACADEMY
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Belajar dari yang Pernah Melewati Seleksi
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            Dibimbing oleh mentor yang memiliki pengalaman langsung dalam
            menghadapi seleksi dan ujian berbasis CAT.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2">
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="group rounded-3xl border border-slate-100 bg-slate-50/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-2xl font-black text-orange-600 ring-4 ring-white shadow-sm">
                  {mentor.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {mentor.name}
                  </h3>

                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#0A66C2]"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V8.99H3.54v11.46Z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Rekam Jejak
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {mentor.achievement}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Skor
                    </p>

                    <p className="mt-1 text-3xl font-black text-orange-600">
                      {mentor.score}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 12 4 4L19 6"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Lolos sebagai {mentor.position}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Memiliki pengalaman langsung dalam proses seleksi
                    berbasis CAT.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}