import { Footer } from "@/app/(landingpage)/layout/Footer";
import { Benefits } from "@/app/(landingpage)/layout/Benefits";
import { CTA } from "@/app/(landingpage)/layout/Cta";
import { SocialProof } from "@/app/(landingpage)/layout/SocialProof";
import { TitleHero } from "@/app/(landingpage)/layout/TitleHero";

export default function Home() {
  return (
    <main className="w-full flex-col flex justify-center items-center">
      <TitleHero />
      <Benefits />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}
