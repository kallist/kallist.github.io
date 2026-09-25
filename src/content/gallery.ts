export type GalleryWork = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  shape: "landscape" | "portrait";
  width: number;
  height: number;
};

// Add future works here. Each item renders in both looped visual lanes;
// only the first lane's first copy is exposed to assistive technology.
export const galleryWorks: readonly GalleryWork[] = [
  {
    id: "birthday-color",
    src: "/gallery/birthday-color.webp",
    alt: "Color illustration of a white-haired fantasy character among flowers and clouds",
    caption: "Color character illustration",
    shape: "landscape",
    width: 960,
    height: 480,
  },
  {
    id: "birthday-ink",
    src: "/gallery/birthday-ink.webp",
    alt: "Monochrome ink version of the fantasy character and cloud scene",
    caption: "Monochrome ink study",
    shape: "landscape",
    width: 960,
    height: 480,
  },
  {
    id: "comic-two-panel",
    src: "/gallery/comic-two-panel.webp",
    alt: "Two black-and-white comic panels featuring different character portraits",
    caption: "Two-panel character sequence",
    shape: "portrait",
    width: 830,
    height: 1181,
  },
  {
    id: "comic-triptych",
    src: "/gallery/comic-triptych.webp",
    alt: "Three black-and-white comic panels with expressive character close-ups",
    caption: "Three-panel character sequence",
    shape: "portrait",
    width: 830,
    height: 1179,
  },
];
