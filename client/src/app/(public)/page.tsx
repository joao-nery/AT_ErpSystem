import { Hero } from "@/app/(public)/layout/Hero";
import Confidence from "@/app/(public)/layout/Confidence";
import { ContentCTA } from "@/app/(public)/layout/Content_CTA";
import { Features } from "@/app/(public)/layout/Features";
import { Footer } from "@/app/(public)/layout/Footer";

export default function Home() {
  return (
    <main className="w-full flex-col flex justify-center items-center">
      <Hero />
      <Features />
      <Confidence />
      <ContentCTA />
      <Footer />
    </main>
  );
}
