import type { Metadata } from "next";
import Library from "@/components/library";

export const metadata: Metadata = {
  title: "Biblioteca",
  description: "Explora todos los juegos disponibles en Arcade Vault.",
};

export default function GamesPage() {
  return <Library />;
}
