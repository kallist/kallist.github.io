export function WordHover({ text }: { text: string }) {
  return <>{text.split(/(\s+)/).map((part, index) =>
    /\s+/.test(part) ? part : <span className="v2-word" key={`${index}-${part}`}>{part}</span>
  )}</>;
}
