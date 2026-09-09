import "./PitchDivider.scss";

type PitchDividerProps = {
  // "kickoff" = halfway line + centre circle + spot; "arc" = penalty-box D.
  variant?: "kickoff" | "arc";
};

const PitchDivider = ({ variant = "kickoff" }: PitchDividerProps) => {
  return (
    <div className="pitch-divider" aria-hidden="true">
      <svg
        className="pitch-divider__svg"
        viewBox="0 0 240 40"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        <line x1="0" y1="20" x2="240" y2="20" className="pitch-divider__line" />
        {variant === "kickoff" ? (
          <>
            <circle cx="120" cy="20" r="13" className="pitch-divider__mark" />
            <circle cx="120" cy="20" r="1.8" className="pitch-divider__spot" />
          </>
        ) : (
          <path
            d="M104 20 A 18 18 0 0 0 136 20"
            className="pitch-divider__mark"
          />
        )}
      </svg>
    </div>
  );
};

export default PitchDivider;
