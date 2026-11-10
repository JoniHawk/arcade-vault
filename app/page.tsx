import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import GamesPreview from "@/components/home/games-preview";
import Stats from "@/components/home/stats";
import LiveActivity from "@/components/home/live-activity";
import Pricing from "@/components/home/pricing";
import FinalCta from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: { absolute: "Arcade Vault · El arcade clásico está de vuelta" },
  description:
    "Juega los mejores clásicos directamente en tu navegador. Sin descargas, sin costo, con ranking global.",
};

export default function Home() {
  return (
    <div className="fade-in relative">
      <Hero />
      <Features />
      <GamesPreview />
      <Stats />
      <LiveActivity />
      <Pricing />
      <FinalCta />
    </div>
  );
}
