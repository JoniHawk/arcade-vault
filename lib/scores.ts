export type SavedScore = {
  game: string;
  score: number;
  name: string;
  at: number;
};

const KEY = "av_scores";

// Fallback en memoria si localStorage no está disponible.
let memoryScores: SavedScore[] = [];

export function readScores(): SavedScore[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return memoryScores;
  }
}

// Solo debe llamarse desde el cliente (handlers de eventos).
export function saveScore(entry: Omit<SavedScore, "at">): void {
  const next = [...readScores(), { ...entry, at: Date.now() }];
  memoryScores = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // sin persistencia: queda solo en memoria
  }
}
