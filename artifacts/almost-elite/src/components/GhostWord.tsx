export default function GhostWord({ word, className = "" }: { word: string; className?: string }) {
  return (
    <div className={`absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none ${className}`}>
      <span
        className="font-display font-black italic uppercase text-white leading-none whitespace-nowrap"
        style={{ fontSize: "clamp(6rem, 22vw, 22rem)", opacity: 0.032 }}
      >
        {word}
      </span>
    </div>
  );
}
