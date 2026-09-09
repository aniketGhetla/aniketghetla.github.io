import "./Experience.scss";

type Role = {
  period: string;
  title: string;
  org: string;
  summary: string;
  tags: string[];
};

const ROLES: Role[] = [
  {
    period: "Jan 2026 – Jun 2026",
    title: "Data Analyst",
    org: "Freelance",
    summary:
      "Built an opponent tactical-analysis system for Premier League and 2. Bundesliga teams: ingesting Opta/TRACAB and Sportec tracking and event data into PostgreSQL, tagging and analysing 34 games of the 25/26 season to surface recurring problems, and delivering the findings to coaching staff through Power BI dashboards alongside the match analyst.",
    tags: ["Opta / TRACAB", "Sportec", "PostgreSQL", "Power BI"],
  },
  {
    period: "Apr 2024 – Sep 2024",
    title: "Satellite Power Prediction & Anomaly Detection",
    org: "Parametry.ai · case study, Frankfurt",
    summary:
      "A collaborative case study forecasting satellite power from telemetry. Built the preprocessing pipeline (synchronising and resampling 3 Martian years of data to 15-minute intervals), engineered the features (trigonometric angle encoding, energy calculations, consistent schemas) and trained Random Forest, XGBoost and CatBoost on 7-hour windows; Random Forest took the group's best RMSE of 0.0124. Documented the full lifecycle from ingestion to limitations.",
    tags: ["Random Forest", "XGBoost", "CatBoost", "Time-series"],
  },
  {
    period: "May 2019 – Jul 2022",
    title: "Assistant Manager (Data Analyst)",
    org: "Aditya Birla Sun Life AMC · Mumbai",
    summary:
      "Turned stakeholder requirements into interactive Power BI dashboards and reports on KPIs and sales metrics, wrote and optimised SQL across multiple source systems (the reporting solutions contributed to 20% growth in AUM), and segmented customers by monthly SIP behaviour to drive targeted campaigns.",
    tags: ["Power BI", "DAX", "SQL"],
  },
  {
    period: "Aug 2018 – Mar 2019",
    title: "Sports Analyst",
    org: "Hudl · Mumbai",
    summary:
      "Analysed match data across football, American football, basketball, volleyball and lacrosse, and event-tagged 40+ football matches in Wyscout.",
    tags: ["Wyscout", "Event tagging"],
  },
];

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="experience__inner">
        <h2 className="experience__heading">Experience</h2>

        <ol className="experience__list">
          {ROLES.map((role) => (
            <li className="experience__item" key={role.title}>
              <p className="experience__period">{role.period}</p>

              <div className="experience__body">
                <h3 className="experience__role">
                  {role.title}
                  <span className="experience__org">, {role.org}</span>
                </h3>

                <p className="experience__summary">{role.summary}</p>

                {role.tags.length > 0 && (
                  <p className="experience__tags">{role.tags.join(" · ")}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
