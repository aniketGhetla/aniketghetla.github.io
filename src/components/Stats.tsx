import "./Stats.scss";

// [value, label]. A value longer than a plain number renders smaller.
const STATS: [string, string][] = [
  ["4+", "Years of experience"],
  ["10+", "Projects delivered"],
  ["100+", "Matches analysed"],
  ["p < 0.05", "Still chasing"],
];

const Stats = () => (
  <ul className="stats" aria-label="By the numbers">
    {STATS.map(([value, label]) => (
      <li className="stats__item" key={label}>
        <span
          className={`stats__value ${
            value.length > 4 ? "stats__value--sm" : ""
          }`}
        >
          {value}
        </span>
        <span className="stats__label">{label}</span>
      </li>
    ))}
  </ul>
);

export default Stats;
