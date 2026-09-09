import { useState } from "react";
import "./Certifications.scss";
import Lightbox from "./Lightbox";
import certFitness from "../assets/images/cert-fitness.jpg";
import certNvidia from "../assets/images/cert-nvidia.jpg";
import certSixSigma from "../assets/images/cert-sixsigma.jpg";

type Cert = {
  name: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  verifyHref?: string;
  pdfHref?: string;
  detail?: string;
  image?: string;
};

const CERTS: Cert[] = [
  {
    name: "Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    date: "Dec 2024",
    credentialId: "7W6KGUh-SFKUu_pucfsxgQ",
    verifyHref:
      "https://learn.nvidia.com/certificates?id=7W6KGUh-SFKUu_pucfsxgQ",
    image: certNvidia,
  },
  {
    name: "Lean Six Sigma Green Belt",
    issuer: "Benchmark Six Sigma · Exemplar Global",
    date: "Sep 2021",
    credentialId: "38009756",
    pdfHref: `${process.env.PUBLIC_URL}/lean-six-sigma-green-belt.pdf`,
    detail:
      "A process-and-data-quality credential that carries into how I QA a tracking-data pipeline before it reaches a coach.",
    image: certSixSigma,
  },
  {
    name: "Certified Body Weight Exercises & Functional Training Instructor",
    issuer: "Bombay Yoga & Fitness Academy",
    date: "May 2019",
    image: certFitness,
  },
];

const Certifications = () => {
  const [zoom, setZoom] = useState<Cert | null>(null);

  return (
    <section className="certifications" id="certifications">
      <div className="certifications__inner">
        <h2 className="certifications__heading">Certifications</h2>

        <ul className="certifications__list">
          {CERTS.map((cert) => (
            <li className="certifications__item" key={cert.name}>
              <div className="certifications__text">
                <h3>{cert.name}</h3>
                {(cert.issuer || cert.date) && (
                  <p className="certifications__meta">
                    {[cert.issuer, cert.date].filter(Boolean).join(" · ")}
                  </p>
                )}
                {cert.detail && (
                  <p className="certifications__detail">{cert.detail}</p>
                )}
                {(cert.credentialId || cert.verifyHref || cert.pdfHref) && (
                  <p className="certifications__cred">
                    {cert.credentialId && (
                      <>
                        Credential ID <span>{cert.credentialId}</span>
                      </>
                    )}
                    {cert.credentialId &&
                      (cert.verifyHref || cert.pdfHref) &&
                      " · "}
                    {cert.verifyHref && (
                      <a
                        href={cert.verifyHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Verify <span aria-hidden="true">&#8599;</span>
                      </a>
                    )}
                    {cert.verifyHref && cert.pdfHref && " · "}
                    {cert.pdfHref && (
                      <a href={cert.pdfHref} target="_blank" rel="noreferrer">
                        PDF <span aria-hidden="true">&#8599;</span>
                      </a>
                    )}
                  </p>
                )}
              </div>

              {cert.image && (
                <button
                  type="button"
                  className="certifications__shot"
                  onClick={() => setZoom(cert)}
                  aria-label={`View the ${cert.name} certificate`}
                >
                  <img
                    src={cert.image}
                    alt={`${cert.name} certificate`}
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
          caption={[zoom.name, zoom.issuer, zoom.date]
            .filter(Boolean)
            .join(" · ")}
          onClose={() => setZoom(null)}
        />
      )}
    </section>
  );
};

export default Certifications;
