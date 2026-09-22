import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        {/* Section-section berikutnya (Fitur, Testimoni, dll) nambah di sini */}
      </main>
    </div>
  );
}
