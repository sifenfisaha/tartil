"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Arrow } from "@/components/arrow";

/*
 * Watched-lesson progress, kept in this browser only.
 * Stored as a JSON array of YouTube ids under one key.
 */

const KEY = "tartil.watched.v1";
const CHANGE = "tartil:progress";

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE, onChange);
  };
}

function read(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

/** `null` while rendering on the server and during hydration. */
function readOnServer(): string | null {
  return null;
}

const EMPTY: ReadonlySet<string> = new Set();
let cachedRaw: string | null = null;
let cachedSet: ReadonlySet<string> = EMPTY;

function parse(raw: string): ReadonlySet<string> {
  if (raw === cachedRaw) return cachedSet;
  let ids: unknown = [];
  try {
    ids = JSON.parse(raw);
  } catch {
    ids = [];
  }
  cachedRaw = raw;
  cachedSet = new Set(Array.isArray(ids) ? ids.filter((id) => typeof id === "string") : []);
  return cachedSet;
}

function write(next: ReadonlySet<string>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...next]));
  } catch {
    // Storage unavailable (private mode, blocked site data). Progress just won't persist.
  }
  window.dispatchEvent(new Event(CHANGE));
}

export function useWatched() {
  const raw = useSyncExternalStore(subscribe, read, readOnServer);
  const ready = raw !== null;
  const watched = raw === null ? EMPTY : parse(raw);

  const toggle = (id: string, on: boolean) => {
    const next = new Set(parse(read()));
    if (on) next.add(id);
    else next.delete(id);
    write(next);
  };

  const reset = () => write(new Set());

  return { ready, watched, toggle, reset };
}

/* ---------- pieces ---------- */

export function LessonToggle({ id, title }: { id: string; title: string }) {
  const { watched, toggle } = useWatched();
  const checked = watched.has(id);

  return (
    // Pinned to the first line of the title: (line-height 25.6px − box 13px) / 2 ≈ 6px.
    <label className="toggle -m-2.5 flex translate-y-[6px] cursor-pointer items-center justify-center self-start p-2.5">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(event) => toggle(id, event.currentTarget.checked)}
        aria-label={`Mark “${title}” as watched`}
      />
      <span aria-hidden className="toggle-box" />
    </label>
  );
}

export function WatchedCount({
  ids,
  pad = 0,
  className,
}: {
  ids: string[];
  pad?: number;
  className?: string;
}) {
  const { watched } = useWatched();
  const done = ids.reduce((sum, id) => sum + (watched.has(id) ? 1 : 0), 0);
  const fmt = (n: number) => String(n).padStart(pad, "0");

  return (
    <span className={className}>
      <span className="sr-only">{`${done} of ${ids.length} lessons watched`}</span>
      <span aria-hidden>
        {fmt(done)}/{fmt(ids.length)}
      </span>
    </span>
  );
}

type Next = { id: string; stage: string; index: number; title: string };

export function ContinueLink({
  lessons,
  begin = { href: "#index", label: "Begin with the index" },
}: {
  lessons: Next[];
  /** Shown before any lesson has been watched. */
  begin?: { href: string; label: string; onClick?: () => void };
}) {
  const { ready, watched } = useWatched();
  const next = lessons.find((lesson) => !watched.has(lesson.id));
  const started = ready && watched.size > 0;

  if (!started) {
    return (
      <a href={begin.href} onClick={begin.onClick} className="link-quiet inline-flex items-center gap-1.5">
        {begin.label}
        <Arrow direction="down" />
      </a>
    );
  }

  if (!next) {
    return <span>Every lesson watched. Begin again, slower.</span>;
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${next.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="link-quiet inline-flex max-w-full items-center gap-1.5"
    >
      <span className="truncate">
        Continue with {next.stage}.{String(next.index).padStart(2, "0")}, {next.title}
      </span>
      <Arrow direction="up-right" />
    </a>
  );
}

export function ResetProgress() {
  const { ready, watched, reset } = useWatched();
  const [armed, setArmed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (!ready || watched.size === 0) return null;

  const onClick = () => {
    if (armed) {
      window.clearTimeout(timer.current);
      setArmed(false);
      reset();
      return;
    }
    setArmed(true);
    timer.current = window.setTimeout(() => setArmed(false), 3500);
  };

  return (
    <button type="button" onClick={onClick} className="link-quiet label text-ink-3">
      {armed ? "Press again to clear progress" : `Clear progress (${watched.size})`}
    </button>
  );
}
