import "./Contact.scss";
import SubsBoard from "./SubsBoard";

const EMAIL = "aniketghetla@gmail.com";

const LINKS = [
  { label: "Email", href: `mailto:${EMAIL}` },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aniket-ghetla-575141187/",
  },
  { label: "GitHub", href: "https://github.com/aniketGhetla" },
];

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <p className="contact__kicker">Contact</p>
        <h2 className="contact__heading">
          Working on an opponent report, or hiring for one?
        </h2>
        <p className="contact__body">
          I'm open to football analytics and data roles, and happy to talk
          through what an opponent-analysis workflow could look like for
          your staff.
        </p>

        <SubsBoard href={`mailto:${EMAIL}`} />

        <p className="contact__email">{EMAIL}</p>

        <ul className="contact__links">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
