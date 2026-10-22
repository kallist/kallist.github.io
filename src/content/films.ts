import type { Language } from "./home-copy";

type Localized = Record<Language, string>;
export type Film = {
  id: string;
  title: Localized;
  category: Localized;
  description: Localized;
  boundary: Localized;
  source: string;
  poster: string;
  duration: string;
  seconds: number;
  size: string;
  format: string;
};

export const films: Film[] = [
  {
    id: "cueparcel", title: { en: "Context, in motion.", zh: "让上下文流动。" },
    category: { en: "CueParcel / Product film", zh: "CueParcel / 产品影像" },
    description: { en: "A cinematic walkthrough of collecting, shaping and handing off web context. The product, the interaction and the source stay in the frame.", zh: "从收集、整理到交接网页上下文。用一段产品影像，让界面、交互和来源一起进入视野。" },
    boundary: { en: "User-supplied product demonstration with embedded Chinese captions. A presentation of the workflow, not measured agent performance.", zh: "用户提供的产品演示，含画内中文字幕。展示工作流，不代表已测得的智能体效果。" },
    source: "/films/cueparcel-cinematic.mp4", poster: "/films/cueparcel-cinematic.webp", duration: "03:22", seconds: 201.734, size: "51.2 MiB", format: "1080p / 30 fps",
  },
  {
    id: "qingming", title: { en: "One song. Two visions.", zh: "同一首歌，两种想象。" },
    category: { en: "Qingming / Side-by-side MV", zh: "清明雨上 / 同屏 MV" },
    description: { en: "Two illustrated worlds unfold side by side. The supplied comparison keeps its GPT / DeepSeek labels and shared musical timeline.", zh: "两组插画世界沿同一条音乐时间线并行展开。保留原片 GPT / DeepSeek 双栏标记，把差异留给观看者。" },
    boundary: { en: "User-supplied comparison, adapted from a 4K master. Labels describe the supplied edit; this is not a controlled model benchmark or a claim of exclusive authorship. Lyrics are embedded in the image.", zh: "由用户提供的 4K 对照片派生。标签沿用原剪辑；不代表受控模型评测或独立创作归属证明。歌词嵌入画面。" },
    source: "/films/qingming-comparison.mp4", poster: "/films/qingming-comparison.webp", duration: "03:09", seconds: 188.934, size: "70.6 MiB", format: "1080p / 30 fps",
  },
  {
    id: "singularity", title: { en: "Echoes of the singularity.", zh: "奇点遗音。" },
    category: { en: "Generative study / Gemini credited", zh: "生成影像 / 来源署名 Gemini" },
    description: { en: "Light, gravity and a looping visual score. A short experiment in turning an abstract system into a moving image.", zh: "光、引力与循环的视觉乐谱。一段把抽象系统转成动态影像的实验样片。" },
    boundary: { en: "User-supplied generative sample; the source ending credits Gemini. This web excerpt omits an unverified festival title. No festival selection, award or exclusive authorship is claimed. Captions are embedded.", zh: "用户提供的生成影像样片，来源片尾署名 Gemini。网页节选移除了未经核实的节展片头，不声称节展入选、获奖或个人独立创作。字幕嵌入画面。" },
    source: "/films/singularity-study.mp4", poster: "/films/singularity-study.webp", duration: "00:48", seconds: 48, size: "16.9 MiB", format: "720p / 24 fps",
  },
];
