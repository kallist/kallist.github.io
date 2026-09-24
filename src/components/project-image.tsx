/* eslint-disable @next/next/no-img-element -- pinned repository screenshots are served as-is by static export */
type Props = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
};

const imageDimensions: Record<string, { width: number; height: number }> = {
  "/projects/repobound-hero.png": { width: 1512, height: 982 },
  "/projects/repobound-context.png": { width: 1512, height: 982 },
  "/projects/cueparcel-lens.png": { width: 1280, height: 800 },
  "/projects/cueparcel-taskspec.png": { width: 1280, height: 800 },
  "/projects/agent-studio-trace.png": { width: 1440, height: 900 },
  "/projects/skin-lesion-result.png": { width: 2160, height: 1460 },
};

export function ProjectImage({
  src,
  alt,
  caption,
  className = "",
  priority = false,
}: Props) {
  const dimensions = imageDimensions[src];
  return (
    <figure className={`project-figure ${className}`}>
      {/* Static export serves these pinned local assets without an image optimization server. */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={dimensions?.width}
        height={dimensions?.height}
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
