import Image from "next/image";
import Link from "next/link";

const layananLinks = [
  { label: "Paket Tryout", href: "/paket-tryout" },
  { label: "Tryout & Latihan Soal", href: "/tryout" },
  { label: "Cara Belajar", href: "/cara-belajar" },
  { label: "Tentang Nekoma Academy", href: "/tentang" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Brand */}
          <div className="lg:max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo.webp"
                alt="Nekoma Academy"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0"
              />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                NEKOMA ACADEMY
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Nekoma Academy adalah platform bimbel CPNS untuk membantu
              persiapan SKD CPNS, SKB CPNS, Sekolah Kedinasan, dan PPPK
              melalui materi, latihan soal, tryout, dan evaluasi.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Layanan Nekoma Academy
            </h3>
            <ul className="mt-4 space-y-3">
              {layananLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-500 transition-colors hover:text-orange-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosial media */}
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Ikuti Nekoma Academy
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Dapatkan informasi dan konten terbaru seputar CPNS, Sekolah
              Kedinasan, dan persiapan ujian.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/nekoma.academy_id?stkn=ZTRtbnh6cnVvMjIx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Nekoma Academy"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-orange-200 hover:text-orange-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@nekoma.academy_id?_r=1&_t=ZS-99tOOFHKvRN"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Nekoma Academy"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-orange-200 hover:text-orange-500"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.6 3c.4 2.4 1.8 4.1 4.4 4.3v3.1c-1.5 0-2.9-.4-4.2-1.2v6.3c0 4.1-3 6.8-6.7 6.8-3.6 0-6.3-2.4-6.3-5.8 0-3.6 3-6.1 6.7-6.1.4 0 .8 0 1.2.1v3.2c-.4-.1-.8-.2-1.2-.2-1.7 0-3.5 1.1-3.5 3 0 1.6 1.2 2.7 2.9 2.7 1.9 0 3.7-1.1 3.7-4V3h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {year} Nekoma Academy. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">Belajar dari rumah.</p>
        </div>
      </div>
    </footer>
  );
}
