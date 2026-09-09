import "./PlayerCard.scss";
import portrait from "../assets/images/portrait-headshot.jpg";

type Attribute = { label: string; value: number };

// Order is preserved top-to-bottom, filling the two columns row by row.
const ATTRIBUTES: Attribute[] = [
  { label: "Python", value: 98 },
  { label: "SQL", value: 97 },
  { label: "Power BI", value: 99 },
  { label: "GCP", value: 96 },
  { label: "GNN / DL", value: 95 },
  { label: "Tracking Data", value: 99 },
];

const OVR = Math.round(
  ATTRIBUTES.reduce((sum, a) => sum + a.value, 0) / ATTRIBUTES.length
);

const PlayerCard = () => {
  return (
    <div className="player-card">
      <div className="player-card__top">
        <div className="player-card__rating">
          <span className="player-card__ovr">{OVR}</span>
          <span className="player-card__pos">F9</span>
        </div>
        <div className="player-card__photo">
          <img src={portrait} alt="Aniket Ghetla" />
        </div>
      </div>

      <h3 className="player-card__name">Aniket Ghetla</h3>
      <p className="player-card__tagline">
        <span>False 9</span>: between football and data
      </p>

      <ul className="player-card__stats">
        {ATTRIBUTES.map((a) => (
          <li key={a.label}>
            <span className="player-card__stat-label">{a.label}</span>
            <span className="player-card__stat-value">{a.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerCard;
