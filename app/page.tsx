import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { CornerIndex, IndexTrigger } from "@/components/corner-index";
import { Wordmark } from "@/components/wordmark";
import { ContinueLink, LessonToggle, ResetProgress, WatchedCount } from "@/components/progress";
import {
  CHANNEL_URL,
  EDITION,
  SOURCE_PLAYLIST_URL,
  allLessons,
  formatLength,
  notes,
  playAllUrl,
  stageSeconds,
  stages,
  totalLessons,
  totalSeconds,
  videoUrl,
  type Stage,
} from "@/lib/roadmap";
import reeds from "@/public/images/reeds.jpg";
import water from "@/public/images/water.jpg";

const allIds = allLessons.map((lesson) => lesson.id);

const indexStages = stages.map((stage) => ({
  n: stage.n,
  slug: stage.slug,
  name: stage.name,
  ids: stage.lessons.map((lesson) => lesson.id),
}));

export default function Home() {
  return (
    <>
      <main>
        <Poster />
        <Verse />
        <Index />
        {stages.map((stage) => (
          <StageSection key={stage.slug} stage={stage} />
        ))}
        <Notes />
      </main>
      <Colophon />
      <CornerIndex stages={indexStages} lessons={allLessons} />
    </>
  );
}

/* ---------------------------------------------------------------- poster */

function Poster() {
  return (
    <section
      id="top"
      className="flex min-h-svh flex-col items-center px-5 sm:px-8"
      aria-labelledby="poster-title"
    >
      {/* Printed corner text: part of the sheet, not a bar. */}
      <div className="rise flex w-full max-w-[1160px] items-baseline justify-between pt-5 sm:pt-7">
        <p className="label text-ink-3">Arabic 101</p>
        <IndexTrigger ids={allIds} />
      </div>

      <div className="flex w-full flex-1 items-center justify-center pt-14 pb-16">
        <div className="w-[min(70vw,300px)]">
          <h1 id="poster-title" className="rise label text-[13px] tracking-[0.34em] text-ink">
            Tajweed
          </h1>
          <dl className="rise meta mt-2.5 text-[11.5px]" style={{ "--i": 1 } as React.CSSProperties}>
            <div className="flex gap-1">
              <dt>Theme:</dt>
              <dd>Recitation of the Qur’an</dd>
            </div>
            <div className="flex gap-1">
              <dt>Form:</dt>
              <dd>Nine stages, seventy-nine lessons</dd>
            </div>
          </dl>

          <figure className="develop relative mt-9 aspect-[3/4] overflow-hidden bg-paper-deep">
            <Image
              src={reeds}
              alt="Five geese flying low over a bed of tall reeds, in black and white."
              fill
              sizes="(min-width: 640px) 300px, 70vw"
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              className="object-cover mix-blend-multiply"
            />
          </figure>

          <div
            className="rise mt-9 flex flex-col items-end text-right"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <p className="stamp">{EDITION}</p>
            <p className="meta mt-2.5 text-[10.5px] leading-[1.5]">
              Lessons by Arabic 101.
              <br />
              Arranged for slow study.
            </p>
            <p className="meta mt-5 max-w-full text-[11.5px] text-ink">
              <ContinueLink lessons={allLessons} />
            </p>
          </div>
        </div>
      </div>

      <p
        className="rise pb-9 text-[clamp(24px,2.6vw,32px)]"
        style={{ "--i": 5 } as React.CSSProperties}
        aria-hidden
      >
        <Wordmark />
      </p>
    </section>
  );
}

/* ---------------------------------------------------------------- verse */

function Verse() {
  return (
    <section className="px-5 py-[clamp(7rem,18vh,11rem)] text-center" aria-label="Opening verse">
      <p lang="ar" dir="rtl" className="text-[clamp(32px,4.6vw,54px)] leading-[1.7]">
        وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
      </p>
      <p className="mt-5 text-[15px] text-ink-2">And recite the Qur’an with measured recitation.</p>
      <p className="label mt-3 text-ink-3">Al-Muzzammil, 73:4</p>
    </section>
  );
}

/* ---------------------------------------------------------------- layout */

function Spread({
  id,
  aside,
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  aside: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`px-5 sm:px-8 ${className}`}>
      <div className="mx-auto grid max-w-[1160px] gap-y-10 border-t border-rule pt-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-x-16 lg:pt-12">
        <div className="lg:sticky lg:top-14 lg:self-start">{aside}</div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- index */

function Index() {
  return (
    <Spread
      id="index"
      labelledBy="index-title"
      className="pb-[clamp(6rem,14vh,9rem)]"
      aside={
        <>
          <h2 id="index-title" className="label">
            Index
          </h2>
          <p className="meta mt-3">
            {stages.length} stages · {totalLessons} lessons
            <br />
            {formatLength(totalSeconds)} of listening
          </p>
        </>
      }
    >
      <p className="statement max-w-[34ch]">
        Seventy-nine lessons from the Arabic&nbsp;101 channel, set in the order they are best
        learned. First the letters, then their character, then the rules, the page, the breath,
        and at last your own voice.
      </p>

      <ol className="mt-12 border-t border-rule">
        {stages.map((stage) => (
          <li key={stage.slug} className="border-b border-rule">
            <a
              href={`#${stage.slug}`}
              className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-4 sm:grid-cols-[2.75rem_minmax(0,1fr)_auto_5.5rem]"
            >
              <span className="text-[11px] tabular-nums tracking-[0.12em] text-ink-3">{stage.n}</span>
              <span className="min-w-0">
                <span className="font-medium">{stage.name}</span>
                <span className="ml-3 hidden text-ink-3 transition-colors group-hover:text-ink-2 md:inline">
                  {stage.line}
                </span>
              </span>
              <WatchedCount
                ids={stage.lessons.map((l) => l.id)}
                className="text-[11.5px] tabular-nums text-ink-3"
              />
              <span className="hidden text-right text-[11.5px] tabular-nums text-ink-3 sm:block">
                {formatLength(stageSeconds(stage))}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Spread>
  );
}

/* ---------------------------------------------------------------- stage */

function StageSection({ stage }: { stage: Stage }) {
  const ids = stage.lessons.map((l) => l.id);
  const titleId = `${stage.slug}-title`;

  return (
    <Spread
      id={stage.slug}
      labelledBy={titleId}
      className="pb-[clamp(6rem,14vh,9rem)]"
      aside={
        <>
          <p className="label text-ink-2">Stage {stage.n}</p>
          <h2 id={titleId} className="mt-5 text-[clamp(30px,3.4vw,40px)] leading-[1.08] font-medium tracking-[-0.015em]">
            {stage.name}
            <span lang="ar" dir="rtl" className="ml-4 inline-block align-baseline text-[0.72em] font-normal text-ink-3">
              {stage.ar}
            </span>
          </h2>
          <p className="mt-2 text-[17px] leading-snug font-light text-ink-2">{stage.line}</p>
        </>
      }
    >
      <p className="max-w-[54ch] text-ink-2">{stage.note}</p>

      <div className="meta mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-[11.5px]">
        <p className="tabular-nums">
          {stage.lessons.length} lessons · {formatLength(stageSeconds(stage))} ·{" "}
          <WatchedCount ids={ids} /> watched
        </p>
        <a
          href={playAllUrl(stage)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet inline-flex items-center gap-1.5 text-ink"
        >
          Play the stage
          <Arrow />
          <span className="sr-only">(opens YouTube in a new tab)</span>
        </a>
      </div>

      <ol className="mt-4 border-t border-rule">
        {stage.lessons.map((lesson, i) => (
          <LessonRow key={lesson.id} n={i + 1} lesson={lesson} />
        ))}
      </ol>

      {stage.aside ? (
        <div className="mt-10">
          <p className="label text-ink-3">{stage.aside.label}</p>
          <ul className="mt-3 border-t border-rule">
            {stage.aside.lessons.map((lesson) => (
              <li key={lesson.id} className="border-b border-rule">
                <a
                  href={videoUrl(lesson.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-3 text-[14.5px] text-ink-2"
                >
                  <span className="inline-flex items-center gap-2 transition-colors group-hover:text-ink">
                    {lesson.title}
                    <Arrow className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="text-[11.5px] tabular-nums text-ink-3">{lesson.duration}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Spread>
  );
}

function LessonRow({ n, lesson }: { n: number; lesson: Stage["lessons"][number] }) {
  return (
    <li className="group/row grid grid-cols-[2.25rem_minmax(0,1fr)_auto_auto] items-baseline gap-x-4 border-b border-rule py-3.5 sm:grid-cols-[2.75rem_minmax(0,1fr)_auto_auto] sm:gap-x-5">
      <span className="text-[11px] tabular-nums tracking-[0.12em] text-ink-3">
        {String(n).padStart(2, "0")}
      </span>

      <a
        href={videoUrl(lesson.id)}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link min-w-0 transition-colors group-has-[:checked]/row:text-ink-3"
      >
        <span className="decoration-rule decoration-1 underline-offset-[0.3em] group-hover/link:underline">
          {lesson.title}
        </span>
        {lesson.ar ? (
          <span lang="ar" dir="rtl" className="ml-3 inline-block text-[19px] leading-none text-ink-2 group-has-[:checked]/row:text-ink-3">
            {lesson.ar}
          </span>
        ) : null}
        {/* Hover-only affordance: kept out of the layout on touch screens, where it would only cause wrapping. */}
        <Arrow className="ml-2 hidden align-[-0.05em] opacity-0 transition-opacity duration-150 group-hover/link:opacity-60 pointer-fine:inline-block" />
        <span className="sr-only"> (opens YouTube in a new tab)</span>
      </a>

      <span className="text-[11.5px] tabular-nums text-ink-3">{lesson.duration}</span>

      <LessonToggle id={lesson.id} title={lesson.title} />
    </li>
  );
}

/* ---------------------------------------------------------------- notes */

function Notes() {
  return (
    <Spread
      id="notes"
      labelledBy="notes-title"
      className="pb-[clamp(3rem,8vh,5rem)]"
      aside={
        <>
          <h2 id="notes-title" className="label">
            Notes
          </h2>
          <p className="meta mt-3">On using this well.</p>
          <figure className="relative mt-10 hidden aspect-[3/4] w-full max-w-[300px] overflow-hidden bg-paper-deep lg:block">
            <Image
              src={water}
              alt="A long line of birds crossing low over still water at dawn."
              fill
              sizes="300px"
              placeholder="blur"
              className="object-cover mix-blend-multiply"
            />
          </figure>
        </>
      }
    >
      <ol className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
        {notes.map((note, i) => (
          <li key={note.title}>
            <p className="text-[11px] tabular-nums tracking-[0.12em] text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-medium">{note.title}</h3>
            <p className="mt-2 text-ink-2">{note.body}</p>
          </li>
        ))}
      </ol>

      <figure className="relative mx-auto mt-16 aspect-[3/4] w-[min(70vw,300px)] overflow-hidden bg-paper-deep lg:hidden">
        <Image
          src={water}
          alt="A long line of birds crossing low over still water at dawn."
          fill
          sizes="70vw"
          placeholder="blur"
          className="object-cover mix-blend-multiply"
        />
      </figure>
    </Spread>
  );
}

/* ---------------------------------------------------------------- colophon */

function Colophon() {
  return (
    <footer className="flex min-h-[68svh] flex-col items-center px-5">
      <div className="flex w-full flex-1 items-center justify-center py-20">
        <div className="w-[min(70vw,300px)]">
          <p className="label text-[13px] tracking-[0.34em]">Colophon</p>
          <dl className="meta mt-2.5 space-y-0.5 text-[11.5px]">
            <div className="flex gap-1">
              <dt>Lessons:</dt>
              <dd>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  Arabic 101
                </a>
                , YouTube
              </dd>
            </div>
            <div className="flex gap-1">
              <dt>Source:</dt>
              <dd>
                <a href={SOURCE_PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="link-quiet">
                  Learn Tajweed Easily
                </a>
                , and more
              </dd>
            </div>
            <div className="flex gap-1">
              <dt>Photographs:</dt>
              <dd>
                <a
                  href="https://unsplash.com/photos/rq_MQQoNrZs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  reeds
                </a>
                ,{" "}
                <a
                  href="https://unsplash.com/photos/Nw7PGwoprmY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-quiet"
                >
                  water
                </a>
                , Unsplash
              </dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-col items-end text-right">
            <p className="stamp">{EDITION}</p>
            <p className="meta mt-2.5 text-[10.5px] leading-[1.5]">
              Every lesson belongs to its teacher.
              <br />
              Progress is kept in this browser only.
            </p>
            <div className="mt-5">
              <ResetProgress />
            </div>
          </div>
        </div>
      </div>

      <p className="pb-9 text-[clamp(24px,2.6vw,32px)]">
        <Wordmark />
      </p>
    </footer>
  );
}
