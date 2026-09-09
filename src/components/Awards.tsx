import { useState } from "react";
import "./Awards.scss";
import Lightbox from "./Lightbox";
import ceoAward from "../assets/images/award-ceo.jpg";

type Award = {
  name: string;
  issuer: string;
  date: string;
  detail?: string;
  pdfHref?: string;
  image?: string;
};

const AWARDS: Award[] = [
  {
    name: "CEO's Award",
    issuer: "Aditya Birla Sun Life AMC",
    date: "May 2022",
    detail:
      "Certificate of Appreciation for exemplary performance in H2 FY22, presented by the MD & CEO.",
    pdfHref: `${process.env.PUBLIC_URL}/ceo-award-h2-fy22.pdf`,
    image: ceoAward,
  },
];

const Awards = () => {
  const [zoom, setZoom] = useState<Award | null>(null);

  return (
    <section className="awards" id="awards">
      <div className="awards__inner">
        <h2 className="awards__heading">Awards &amp; Recognition</h2>

        <ul className="awards__list">
          {AWARDS.map((award) => (
            <li className="awards__item" key={award.name}>
              <div className="awards__text">
                <h3>{award.name}</h3>
                <p className="awards__meta">
                  {award.issuer} &middot; {award.date}
                </p>
                {award.detail && (
                  <p className="awards__detail">{award.detail}</p>
                )}
                {award.pdfHref && (
                  <p className="awards__cred">
                    <a href={award.pdfHref} target="_blank" rel="noreferrer">
                      PDF <span aria-hidden="true">&#8599;</span>
                    </a>
                  </p>
                )}
              </div>

              {award.image && (
                <button
                  type="button"
                  className="awards__shot"
                  onClick={() => setZoom(award)}
                  aria-label={`View the ${award.name} certificate`}
                >
                  <img
                    src={award.image}
                    alt={`${award.name} certificate`}
                    loading="lazy"
                  />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {zoom?.image && (
        <Lightbox
          src={zoom.image}
          alt={`${zoom.name} certificate`}
          caption={`${zoom.name} · ${zoom.issuer} · ${zoom.date}`}
          onClose={() => setZoom(null)}
        />
      )}
    </section>
  );
};

export default Awards;
