import "./SubsBoard.scss";

type SubsBoardProps = {
  href: string;
  number?: number;
  label?: string;
  name?: string;
};

// The fourth official's electronic substitution board, repurposed as the
// primary contact CTA: green arrow up, player coming on.
const SubsBoard = ({
  href,
  number = 9,
  label = "Substitute in",
  name = "Contact me",
}: SubsBoardProps) => {
  return (
    <a className="subs-board" href={href}>
      <span className="subs-board__side subs-board__side--in">
        <span className="subs-board__arrow" aria-hidden="true">
          &#9650;
        </span>
        <span className="subs-board__num">{number}</span>
      </span>
      <span className="subs-board__text">
        <span className="subs-board__label">{label}</span>
        <span className="subs-board__name">{name}</span>
      </span>
    </a>
  );
};

export default SubsBoard;
