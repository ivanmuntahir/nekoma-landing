import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import MentorSection from "@/components/MentorSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <MentorSection />
        <Footer />
      </main>
    </div>
  );
}
