import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import MentorSection from "@/components/MentorSection";
import FrequentlyAsk from "@/components/FrequentlyAsk";
import TryoutTypeSection from "@/components/TryoutTypeSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <MentorSection />
        <TryoutTypeSection />
        <FrequentlyAsk />
        <Footer />
      </main>
    </div>
  );
}
