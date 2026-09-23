/* eslint-disable @next/next/no-img-element -- pinned repository screenshots are served as-is by static export */
type Props = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
};

export function ProjectImage({
  src,
  alt,
  caption,
  className = "",
  priority = false,
}: Props) {
  return (
    <figure className={`project-figure ${className}`}>
      {/* Static export serves these pinned local assets without an image optimization server. */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      <figcaption>
        {caption}{" "}
        <a href={src} target="_blank" rel="noopener noreferrer">
          Open full image ↗
        </a>
      </figcaption>
    </figure>
  );
}
