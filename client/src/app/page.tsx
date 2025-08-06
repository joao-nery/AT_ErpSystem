import { Hero } from "./layout/Hero";
import Confidence from "./layout/Confidence";
import { ContentCTA } from "./layout/Content_CTA";
import { Features } from "./layout/Features";
import { Footer } from "./layout/Footer";

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
