"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type User = { name: string };

const KEY = "av_user";

// Fallback en memoria si localStorage no está disponible (modo privado, bloqueado).
let memoryValue: string | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return memoryValue;
  }
}

function write(value: string | null) {
  memoryValue = value;
  try {
    if (value === null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, value);
  } catch {
    // sin persistencia: queda solo en memoria
  }
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY || e.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

// Nombre de usuario: mayúsculas, máximo 10 caracteres, "PLAYER1" por defecto.
export function normalizeName(raw: string): string {
  return (raw.trim() || "PLAYER1").toUpperCase().slice(0, 10);
}

function parseUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    const u = JSON.parse(raw);
    return u && typeof u.name === "string" ? { name: u.name } : null;
  } catch {
    return null;
  }
}

type SessionContextValue = {
  user: User | null;
  login: (user: User) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  // El servidor (y el primer render del cliente) ven siempre "invitado".
  const raw = useSyncExternalStore(subscribe, read, () => null);
  const user = useMemo(() => parseUser(raw), [raw]);

  const login = useCallback((u: User) => write(JSON.stringify(u)), []);
  const signOut = useCallback(() => write(null), []);

  const value = useMemo(() => ({ user, login, signOut }), [user, login, signOut]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de <SessionProvider>");
  return ctx;
}
