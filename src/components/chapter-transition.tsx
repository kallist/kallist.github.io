export function ChapterTransition({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div
      className={`v11-page-turn v11-page-turn--${number}`}
      aria-hidden="true"
    >
      <div className="shell v11-page-turn-inner">
        <span className="v11-page-turn-label">Next chapter / {label}</span>
        <span className="v11-page-turn-number">{number}</span>
        <span className="v11-page-turn-line" />
      </div>
    </div>
  );
}
