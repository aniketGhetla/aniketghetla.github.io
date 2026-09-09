import { useState } from "react";
import "./Toolkit.scss";

type Group = { name: string; skills: string[] };

const GROUPS: Group[] = [
  {
    name: "Data & engineering",
    skills: [
      "Python",
      "SQL",
      "PostgreSQL",
      "kloppy",
      "databallpy",
      "Airflow",
      "PySpark",
      "dbt",
      "GCP",
      "GitHub",
    ],
  },
  {
    name: "ML & computer vision",
    skills: [
      "YOLOv11",
      "OpenCV",
      "Optical flow",
      "K-Means",
      "ResNet-18",
      "GNNs",
      "scikit-learn",
      "Anomaly detection",
      "Time-series forecasting",
    ],
  },
  {
    name: "Dashboards & reporting",
    skills: ["Power BI", "Tableau", "Looker Studio", "Streamlit", "Flask"],
  },
  {
    name: "Sports tech",
    skills: ["Hudl Sportscode", "Hudl Wyscout", "Catapult", "MatchTracker"],
  },
  {
    name: "Tracking & event data",
    skills: ["Sportec", "StatsBomb", "Metrica", "PFF", "Opta / TRACAB"],
  },
];

// ---------------------------------------------------------------------------
// Geometry — five hubs on an ellipse, each fanning its skills outward from
// the centre. Computed once; the SVG never re-lays-out.
// ---------------------------------------------------------------------------
const VIEW = { w: 1080, h: 700, x: -40, y: -24 };
const CENTER = { x: 500, y: 348 };
const HUB_RX = 262;
const HUB_RY = 150;
const POP = 20; // how far a skill lifts off its resting spot on hover

type Node = { label: string; x: number; y: number; px: number; py: number };
type Laid = Group & { hub: { x: number; y: number }; nodes: Node[]; lines: [string, string] };

function splitLabel(s: string): [string, string] {
  const words = s.split(" ");
  if (words.length === 1) return [s, ""];
  const half = s.length / 2;
  let l1 = "";
  let i = 0;
  while (i < words.length - 1 && (l1 + words[i]).length < half) {
    l1 += (l1 ? " " : "") + words[i];
    i += 1;
  }
  if (!l1) return [s, ""];
  return [l1, words.slice(i).join(" ")];
}

const LAID: Laid[] = GROUPS.map((g, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / GROUPS.length;
  const hub = {
    x: CENTER.x + HUB_RX * Math.cos(a),
    y: CENTER.y + HUB_RY * Math.sin(a),
  };
  const outward = Math.atan2(hub.y - CENTER.y, hub.x - CENTER.x);
  const n = g.skills.length;
  const fan = Math.min(Math.PI * 1.05, 0.36 * n);
  const r = 72 + n * 7;
  const nodes = g.skills.map((label, j) => {
    const t = n === 1 ? 0 : j / (n - 1) - 0.5;
    const ang = outward + t * fan;
    return {
      label,
      x: r * Math.cos(ang),
      y: r * Math.sin(ang),
      px: (r + POP) * Math.cos(ang),
      py: (r + POP) * Math.sin(ang),
    };
  });
  return { ...g, hub, nodes, lines: splitLabel(g.name) };
});

const Toolkit = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const active = hovered ?? pinned;

  return (
    <section className="toolkit" id="toolkit">
      <div className="toolkit__inner">
        <p className="toolkit__kicker">Toolkit</p>
        <h2 className="toolkit__heading">What I actually build with</h2>
        <p className="toolkit__hint">
          Hover a hub to bring its tools onto the pitch.
        </p>

        <div className="toolkit__net">
          <svg
            viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
            role="img"
            aria-label="Toolkit grouped into five areas, see the list below"
          >
            {LAID.map((g, i) => {
              const isActive = active === i;
              const cls = [
                "toolkit__group",
                isActive ? "is-active" : "",
                active !== null && !isActive ? "is-dim" : "",
              ]
                .join(" ")
                .trim();
              return (
                <g
                  key={g.name}
                  className={cls}
                  transform={`translate(${g.hub.x} ${g.hub.y})`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${g.name}: ${g.skills.join(", ")}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() =>
                    setPinned((p) => (p === i ? null : i))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPinned((p) => (p === i ? null : i));
                    }
                  }}
                >
                  {g.nodes.map((node) => (
                    <line
                      key={`l-${node.label}`}
                      className="toolkit__link"
                      x1={0}
                      y1={0}
                      x2={node.x}
                      y2={node.y}
                    />
                  ))}
                  {g.nodes.map((node) => (
                    <g
                      key={node.label}
                      className="toolkit__skill"
                      style={
                        {
                          "--x": node.x,
                          "--y": node.y,
                          "--px": node.px,
                          "--py": node.py,
                        } as React.CSSProperties
                      }
                    >
                      <circle r={4} />
                      <text
                        textAnchor="middle"
                        y={node.y < -4 ? -12 : 22}
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                  <circle className="toolkit__hub" r={54} />
                  <text
                    className="toolkit__hub-label"
                    textAnchor="middle"
                    y={g.lines[1] ? -6 : 5}
                  >
                    <tspan x={0}>{g.lines[0]}</tspan>
                    {g.lines[1] && (
                      <tspan x={0} dy={16}>
                        {g.lines[1]}
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <ul className="toolkit__list">
          {GROUPS.map((g) => (
            <li key={g.name}>
              <details>
                <summary>
                  {g.name}
                  <span>{g.skills.length}</span>
                </summary>
                <ul>
                  {g.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Toolkit;
