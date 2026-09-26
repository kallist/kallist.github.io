import Image from "next/image";

export function AsciiTree() {
  return <div className="v2-global-tree" data-global-ascii-tree aria-hidden="true">
    <Image className="v2-tree-depth v2-tree-far" src="/graphics/ascii-tree-far.svg" alt="" width={1580} height={1222} loading="eager" unoptimized />
    <Image className="v2-tree-depth v2-tree-middle" src="/graphics/ascii-tree-middle.svg" alt="" width={1580} height={1222} loading="eager" unoptimized />
    <Image className="v2-tree-depth v2-tree-near" src="/graphics/ascii-tree-near.svg" alt="" width={1580} height={1222} preload unoptimized />
  </div>;
}
