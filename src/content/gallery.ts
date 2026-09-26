export type GalleryWork = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  captionZh: string;
  altZh: string;
  shape: "landscape" | "portrait" | "wide";
  scale: "anchor" | "standard" | "sample";
  width: number;
  height: number;
};

// Add future works here. Each item renders in both looped visual lanes;
// only the main lane's middle copy is exposed to assistive technology.
export const galleryWorks: readonly GalleryWork[] = [
  {
    id: "birthday-color",
    src: "/gallery/birthday-color.webp",
    alt: "Color illustration of a white-haired fantasy character among flowers and clouds",
    caption: "Color character illustration",
    captionZh: "彩色角色插画",
    altZh: "白发幻想角色置身花朵与云层中的彩色插画",
    shape: "landscape",
    scale: "sample",
    width: 960,
    height: 480,
  },
  {
    id: "birthday-ink",
    src: "/gallery/birthday-ink.webp",
    alt: "Monochrome ink version of the fantasy character and cloud scene",
    caption: "Monochrome ink study",
    captionZh: "黑白线稿习作",
    altZh: "幻想角色与云层场景的黑白线稿版本",
    shape: "landscape",
    scale: "anchor",
    width: 960,
    height: 480,
  },
  {
    id: "comic-two-panel",
    src: "/gallery/comic-two-panel.webp",
    alt: "Two black-and-white comic panels featuring different character portraits",
    caption: "Two-panel character sequence",
    captionZh: "双格角色叙事",
    altZh: "由两格黑白漫画组成的角色肖像",
    shape: "portrait",
    scale: "standard",
    width: 830,
    height: 1181,
  },
  {
    id: "comic-triptych",
    src: "/gallery/comic-triptych.webp",
    alt: "Three black-and-white comic panels with expressive character close-ups",
    caption: "Three-panel character sequence",
    captionZh: "三格角色叙事",
    altZh: "由三格黑白漫画组成的角色特写",
    shape: "portrait",
    scale: "sample",
    width: 830,
    height: 1179,
  },
  {
    id: "riverside-ink",
    src: "/gallery/riverside-ink.webp",
    alt: "Monochrome illustration of a long-haired character reaching toward ripples in a river",
    altZh: "长发角色俯身触碰河面涟漪的黑白插画",
    caption: "Riverside character illustration",
    captionZh: "河畔角色插画",
    shape: "wide",
    scale: "anchor",
    width: 1916,
    height: 821,
  },
];
