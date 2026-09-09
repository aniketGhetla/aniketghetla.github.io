import "./Education.scss";

type Degree = {
  period: string;
  degree: string;
  school: string;
};

const DEGREES: Degree[] = [
  {
    period: "Oct 2023 – Sep 2025",
    degree: "Master of Applied Data Science and Analytics",
    school: "SRH Hochschule, Heidelberg, Germany",
  },
  {
    period: "Jun 2015 – May 2018",
    degree: "Bachelor of Science, Information Technology",
    school: "University of Mumbai, Mumbai, India",
  },
];

const Education = () => {
  return (
    <section className="education" id="education">
      <div className="education__inner">
        <h2 className="education__heading">Education</h2>

        <ol className="education__list">
          {DEGREES.map((d) => (
            <li className="education__item" key={d.degree}>
              <p className="education__period">{d.period}</p>

              <div className="education__body">
                <h3 className="education__degree">{d.degree}</h3>
                <p className="education__school">{d.school}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;
