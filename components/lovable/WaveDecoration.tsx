type Props = {
  className?: string;
};

/*
 * Each path starts at (0, y) with tangent (+120, -40) and ends at (1440, y)
 * with the same tangent (+120, -40), so when two copies are placed side-by-side
 * for the seamless loop the join is smooth with no kink.
 */
export function WaveDecoration({ className }: Props) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className ?? ""}`} aria-hidden>
      <div
        className="flex"
        style={{ width: "200%", animation: "wave-drift 26s linear infinite" }}
      >
        {([0, 1] as const).map((i) => (
          <svg
            key={i}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-1/2 shrink-0"
          >
            {/* Primary wave — navy, mid amplitude */}
            <path
              d="M0 60 C120 20 240 20 360 60 C480 100 600 100 720 60 C840 20 960 20 1080 60 C1200 100 1320 100 1440 60"
              fill="none"
              stroke="hsl(215 50% 22% / 0.2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Secondary wave — navy, shifted down, softer */}
            <path
              d="M0 75 C120 35 240 35 360 75 C480 115 600 115 720 75 C840 35 960 35 1080 75 C1200 115 1320 115 1440 75"
              fill="none"
              stroke="hsl(215 50% 22% / 0.12)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Accent wave — gold, shifted up */}
            <path
              d="M0 45 C120 10 240 10 360 45 C480 80 600 80 720 45 C840 10 960 10 1080 45 C1200 80 1320 80 1440 45"
              fill="none"
              stroke="hsl(38 45% 58% / 0.22)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
