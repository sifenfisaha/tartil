export type Lesson = {
  /** YouTube video id */
  id: string;
  title: string;
  /** Arabic letters or term shown beside the title */
  ar?: string;
  /** mm:ss */
  duration: string;
};

export type Stage = {
  n: string;
  slug: string;
  name: string;
  ar: string;
  line: string;
  note: string;
  lessons: Lesson[];
  aside?: { label: string; lessons: Lesson[] };
};

export const CHANNEL_URL = "https://www.youtube.com/@Arabic101";
export const SOURCE_PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PL6TlMIZ5ylgqM4Uuu7iAhIeuSdF0v9yxo";
export const EDITION = "2026/11";

export const stages: Stage[] = [
  {
    n: "00",
    slug: "reading",
    name: "Reading",
    ar: "القراءة",
    line: "The letters, and the marks that give them voice.",
    note: "Only if you cannot yet read Arabic script. If you can, begin at Stage 01.",
    lessons: [
      { id: "c-7SVieC_04", title: "The alphabet, part one", duration: "13:57" },
      { id: "1AT7IMLcA58", title: "The alphabet, part two", duration: "13:51" },
      { id: "8pfQg26vfaA", title: "The alphabet, part three", duration: "8:13" },
      { id: "LTwCmA6AjdI", title: "The alphabet, part four", duration: "7:37" },
      { id: "T6uDEwYdbv4", title: "Short vowels", ar: "بَ بِ بُ", duration: "9:49" },
      { id: "saHb0bcVa7k", title: "The shaddah", ar: "بّ", duration: "5:09" },
      { id: "J5jEItBIYco", title: "Tanween", ar: "بً بٍ بٌ", duration: "4:16" },
      { id: "iIM1q6_3U8o", title: "Long vowels", ar: "ا و ي", duration: "5:32" },
      { id: "Vab9gvfhn-I", title: "Letter combinations", duration: "6:53" },
    ],
  },
  {
    n: "01",
    slug: "orientation",
    name: "Orientation",
    ar: "المدخل",
    line: "What Tajweed asks of you, before the rules.",
    note: "Four short talks on where to begin, what makes a recitation valid, and which Mushaf to keep open.",
    lessons: [
      { id: "kklrHE85hHE", title: "Too many rules? The way through", duration: "11:12" },
      { id: "-WsxJ3bIPys", title: "The four conditions of a valid recitation", duration: "8:03" },
      { id: "OLOcXCVHAe8", title: "The Mushaf a beginner should avoid", duration: "11:50" },
      { id: "Xz8MU1fLg9Y", title: "How not to use the colour-coded Mushaf", duration: "7:26" },
    ],
  },
  {
    n: "02",
    slug: "makharij",
    name: "Makharij",
    ar: "المخارج",
    line: "Where each letter is born.",
    note: "The heart of the path. Stay with each letter until your mouth knows it. A sound learned wrong here follows you into every rule that comes after.",
    lessons: [
      { id: "-YrfRpwFMe8", title: "Makharij and sifaat, an introduction", duration: "9:46" },
      { id: "Bzz_wo6skWA", title: "Hamzah and ha", ar: "ء هـ", duration: "9:42" },
      { id: "-oA0HfNUezI", title: "Ayn and the throat ha", ar: "ع ح", duration: "9:17" },
      { id: "FzDyCoJCgIg", title: "Ghayn and kha", ar: "غ خ", duration: "9:51" },
      { id: "wwHmytGNi2M", title: "Qaf", ar: "ق", duration: "7:44" },
      { id: "X-iZ4yZrltA", title: "Jim", ar: "ج", duration: "7:49" },
      { id: "gEBzZLbuo-4", title: "Dad", ar: "ض", duration: "8:28" },
      { id: "-dPYDd4zNio", title: "Lam", ar: "ل", duration: "8:21" },
      { id: "BDgw0fWZwMU", title: "Nun, and its two parts", ar: "ن", duration: "5:37" },
      { id: "ObYKEtceQbU", title: "Ra", ar: "ر", duration: "10:36" },
      { id: "XeQ5cxhkzlE", title: "The heavy ta", ar: "ط", duration: "10:18" },
      { id: "yhIFJiPqVqA", title: "Sad", ar: "ص", duration: "9:22" },
      { id: "6_Qfe0g6uks", title: "Dha", ar: "ظ", duration: "7:50" },
      { id: "sM27vvgq_os", title: "Fa, waw, mim and ba", ar: "ف و م ب", duration: "12:10" },
      { id: "n48BJumH2_M", title: "Telling dad from dha", ar: "ض ظ", duration: "12:16" },
      { id: "mbwm1L_M9Ys", title: "Heavy and light letters in one word", duration: "10:17" },
    ],
  },
  {
    n: "03",
    slug: "sifaat",
    name: "Sifaat",
    ar: "الصفات",
    line: "How each letter carries itself.",
    note: "Where a letter comes from is half of it. Whether it is whispered, echoed or heavy is the other half.",
    lessons: [
      { id: "ZwgM-1M_J7o", title: "Hams, the whispered letters", duration: "9:45" },
      { id: "LeWwxpm_Lzw", title: "Why qalqalah exists", duration: "10:26" },
      { id: "QIxzLs1qGik", title: "A trait that can change the meaning", duration: "7:42" },
      { id: "I1BEoHQzK8E", title: "Why some heavy letters are heavier", duration: "6:53" },
      { id: "zy4GVrl3H94", title: "Traits that shape your pronunciation", duration: "9:16" },
      { id: "TBBMuGVy4mc", title: "Where most ra mistakes happen", ar: "ر", duration: "7:15" },
      { id: "ph9AB2CQbVo", title: "An exercise for qalqalah", duration: "11:07" },
    ],
  },
  {
    n: "04",
    slug: "rules",
    name: "Rules",
    ar: "الأحكام",
    line: "The rules most recitation lives inside.",
    note: "Nun and mim at rest, the lengthening, the echo, the heavy and light ra. Learn them in this order.",
    lessons: [
      { id: "hy8V7CsxaQk", title: "Nun sakinah and tanween", ar: "نْ", duration: "11:34" },
      { id: "MAvDrZgWRTs", title: "Mim sakinah", ar: "مْ", duration: "10:30" },
      { id: "Q737ZCSbC_g", title: "Madd, the lengthening", ar: "مدّ", duration: "14:04" },
      { id: "thu6eZ-AeOA", title: "Qalqalah, the echo", ar: "قطب جد", duration: "10:15" },
      { id: "-Uc5vkrTYnU", title: "The rules of ra", ar: "ر", duration: "12:41" },
      { id: "G8ZGHfCCjgc", title: "The one rule that settles ra", duration: "7:28" },
      { id: "0paH22-NvzU", title: "Saying the name of Allah", ar: "الله", duration: "5:46" },
      { id: "NOCKyEcgW7U", title: "Idgham, when letters fuse", ar: "إدغام", duration: "11:55" },
      { id: "iS31xI9JF2k", title: "The connecting and the cutting hamzah", ar: "ٱ أ", duration: "13:49" },
      { id: "4g61PiwOQ2E", title: "Letters with no vowel marks", duration: "10:18" },
    ],
  },
  {
    n: "05",
    slug: "mushaf",
    name: "The Mushaf",
    ar: "المصحف",
    line: "Reading the page itself.",
    note: "Its small symbols, where to stop, and how to begin again.",
    lessons: [
      { id: "meQsEM3V2m8", title: "What the symbols mean", duration: "6:38" },
      { id: "IOXzx2H5cT8", title: "The symbols, part two", duration: "11:18" },
      { id: "h5JZIkzG3Hw", title: "Why one Mushaf differs from another", duration: "9:16" },
      { id: "j3AR6-BThPU", title: "Stopping and resuming in long verses", duration: "12:47" },
      { id: "MaKZ3ZAE6gU", title: "The word you never begin after", duration: "8:09" },
      { id: "TAF6hGTddm0", title: "Stopping on tanween fathah", ar: "ـًا", duration: "6:09" },
      { id: "tz39tQ2sg7A", title: "The silent-letter symbols", duration: "6:16" },
      { id: "6_gKg6PByOI", title: "The separated letters", ar: "الٓمٓ", duration: "11:34" },
      { id: "kYti7Fa6Azc", title: "The sukoon method for difficult words", duration: "10:46" },
      { id: "FxcIjAnbUVM", title: "A letter combination, untangled", duration: "11:17" },
    ],
    aside: {
      label: "If you read from an Indo-Pak Mushaf",
      lessons: [
        { id: "48KSABnA0D8", title: "Its symbols, explained", duration: "13:25" },
        { id: "02vVE5uMqqw", title: "The symbols you must know", duration: "11:05" },
      ],
    },
  },
  {
    n: "06",
    slug: "breath",
    name: "Breath & Pause",
    ar: "الوقف",
    line: "The other half of reciting well.",
    note: "Breath, pause and pace. The channel’s newest series, and the part most learners skip.",
    lessons: [
      { id: "TuvHtvj0tUA", title: "Tajweed is only half of it", duration: "8:44" },
      { id: "65d6Du0PpWw", title: "Running out of breath", duration: "10:24" },
      { id: "dAhgpvNB8vE", title: "Pausing in the wrong place", duration: "8:39" },
      { id: "KIwOl-djFJE", title: "The four kinds of optional pause", duration: "12:58" },
      { id: "2IySEeYHpS8", title: "Exercises for a longer breath", duration: "15:33" },
      { id: "xq4rm8Y-jlI", title: "The pace of recitation", duration: "10:22" },
    ],
  },
  {
    n: "07",
    slug: "details",
    name: "Fine Points",
    ar: "الدقائق",
    line: "Smaller things, once the ground is steady.",
    note: "Leave these until the earlier stages feel natural. They refine a recitation; they do not build one.",
    lessons: [
      { id: "_344AVeWcQI", title: "Stopping on a letter with shaddah", duration: "11:52" },
      { id: "jNAmUGc_ruc", title: "The rule many never learned", duration: "8:40" },
      { id: "x5YPUJONVhg", title: "Carrying a dammah forward", duration: "6:42" },
      { id: "z2vRvMG1M5k", title: "The madd of glorification", ar: "مدّ التعظيم", duration: "6:17" },
      { id: "lrtxuEKKrrc", title: "Letters unseen but spoken", duration: "7:53" },
      { id: "dYGDSGQQDGs", title: "Why a shaddah is sometimes missing", duration: "7:39" },
      { id: "sUkp2XivuvM", title: "Shaddah on ra", ar: "رّ", duration: "4:54" },
      { id: "ftB68_7QRz4", title: "Words that begin with a shaddah", duration: "12:16" },
      { id: "2uRtlsL8nTw", title: "Hamzah or alif", ar: "أ ا", duration: "14:20" },
      { id: "nk3wjTBluSo", title: "The alif maqsurah", ar: "ى", duration: "13:25" },
      { id: "8hj7u0F3yEg", title: "The seven ahruf and the ten readings", duration: "16:50" },
    ],
  },
  {
    n: "08",
    slug: "practice",
    name: "Practice",
    ar: "التطبيق",
    line: "Bring it home to your own voice.",
    note: "Begin with Al-Fatihah, the surah you recite most. Then the voice, the breath and the patience.",
    lessons: [
      { id: "td40V6Qi4Cc", title: "Precision in Al-Fatihah", duration: "13:37" },
      { id: "v0f5qzTdZJ8", title: "Unsure of your Fatihah? Three steps", duration: "7:54" },
      { id: "hma_T8jw6fg", title: "Common mistakes in South Asia", duration: "7:52" },
      { id: "uGACKMhO85k", title: "A beautiful voice, step by step", duration: "16:14" },
      { id: "vyLc21ceFFk", title: "Reciting as the Prophet ﷺ recited", duration: "6:05" },
      { id: "_acpVGn0ys0", title: "On fluency, and why it takes time", duration: "11:07" },
    ],
  },
];

export const notes = [
  {
    title: "Go slowly",
    body: "Two or three lessons a day is enough. Do not move past a letter until you can say it without thinking.",
  },
  {
    title: "Recite after every lesson",
    body: "Take a short surah and recite it with that one rule in mind. Record yourself, then listen back.",
  },
  {
    title: "Stay longest at Stage 02",
    body: "A sound learned wrong follows you into every rule that comes after it. Time spent here is never wasted.",
  },
  {
    title: "Find someone to listen",
    body: "Recite to a teacher when you can. A video can teach you; it cannot hear you.",
  },
];

/* ---------- derived values ---------- */

export function toSeconds(duration: string) {
  return duration.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

export function formatLength(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h} h ${String(m).padStart(2, "0")} m` : `${m} m`;
}

export function stageSeconds(stage: Stage) {
  return stage.lessons.reduce((sum, lesson) => sum + toSeconds(lesson.duration), 0);
}

export function playAllUrl(stage: Stage) {
  return `https://www.youtube.com/watch_videos?video_ids=${stage.lessons.map((l) => l.id).join(",")}`;
}

export function videoUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export const allLessons = stages.flatMap((stage) =>
  stage.lessons.map((lesson, index) => ({ ...lesson, stage: stage.n, index: index + 1 })),
);

export const totalLessons = allLessons.length;
export const totalSeconds = stages.reduce((sum, stage) => sum + stageSeconds(stage), 0);

const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
export const stageCountWord = words[stages.length] ?? String(stages.length);
