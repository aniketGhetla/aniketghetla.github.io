import { useState } from "react";
import "./Projects.scss";
import Lightbox from "./Lightbox";
import Carousel from "./Carousel";
import dashboardThumb from "../assets/images/dashboard-spa-thumb.jpg";
import dashboardFull from "../assets/images/dashboard-spa.jpg";
import opp1 from "../assets/images/opp-analysis-1.jpg";
import opp2 from "../assets/images/opp-analysis-2.jpg";
import opp3 from "../assets/images/opp-analysis-3.jpg";
import opp4 from "../assets/images/opp-analysis-4.jpg";
import opp5 from "../assets/images/opp-analysis-5.jpg";
import thesis1 from "../assets/images/thesis-1.jpg";
import thesis2 from "../assets/images/thesis-2.jpg";
import thesis3 from "../assets/images/thesis-3.jpg";
import formationImg from "../assets/images/formation-detection.jpg";
import nightlifeImg from "../assets/images/nightlife-dashboard.jpg";
import leedsImg from "../assets/images/leeds-dashboard.jpg";

type Shot = { src: string; alt: string; full?: string };
type ProjectLink = { href: string; label: string };

type Project = {
  title: string;
  points: string[];
  tags: string[];
  link?: ProjectLink;
  shots?: Shot[];
  caption?: string;
};

const FEATURED: Project[] = [
  {
    title: "Opponent Tactical Analysis System",
    points: [
      "Built an opponent tactical-analysis system for Premier League & 2. Bundesliga teams, ingesting Opta/TRACAB and Sportec tracking & event data into PostgreSQL.",
      "Cleaned, standardised and synchronised tracking/event data from multiple providers, resolving data-quality issues before ingestion.",
      "Tracking-data defensive-shape detection: classifies opponent back-3/4/5 per match, reads block depth from backline height, and measures compactness (x/y-spread) by ball zone (central, half-space, wide), output as pitch visualisations for the coaching staff.",
    ],
    tags: ["Opta / TRACAB", "Sportec", "PostgreSQL", "Tracking data"],
    caption:
      "Defensive Trends Dashboard: backline usage, blocks & press, centre protection and defensive shape across a run of matches. Click any view to enlarge.",
    shots: [
      { src: opp1, alt: "Defensive Trends Dashboard: key indicators and backline usage per match" },
      { src: opp2, alt: "Blocks & press: low / mid / high block distribution per match" },
      { src: opp3, alt: "Block analysis: high, mid and low block pitch snapshots" },
      { src: opp4, alt: "Centre vs wide: centre protection and team spread by ball location" },
      { src: opp5, alt: "Average defensive formation and formation snapshot per third" },
    ],
  },
  {
    title: "Season Analysis 25/26",
    points: [
      "Tagged and analysed 34 games of the 25/26 season to surface the recurring problems, then built a Power BI dashboard on top for the coaching staff.",
    ],
    tags: ["Power BI", "Event tagging", "Season review"],
    link: {
      href: `${process.env.PUBLIC_URL}/season-analysis-25-26.pdf`,
      label: "Open the full PDF",
    },
    caption:
      "Season-review board: how goals were conceded, where possession and attacks break down, and the chances left on the table.",
    shots: [
      {
        src: dashboardThumb,
        full: dashboardFull,
        alt: "Season-problems analysis dashboard: defensive and offensive breakdowns across 34 matches",
      },
    ],
  },
  {
    title:
      "Master's Thesis - Formation Detection & GNN-driven Tactical Decision Support System",
    points: [
      "Deep-learning formation detection and a GNN-driven tactical decision-support system for football analytics.",
      "Integrated tracking and event data into PostgreSQL; a ResNet-18 model labels phases of play and formations from tracking data rendered as RGB images (5,000 hand-annotated samples, 94% accuracy).",
      "Formation-detection layer using Wasserstein distance and Hungarian assignment, with formation-vs-formation analysis over xG, xT, PPDA, possession % and recovery time.",
      "GNN-based tactical recommendation layer for counter-strategy, delivered through an interactive Flask dashboard for coaches and analysts.",
    ],
    tags: ["ResNet-18", "GNN", "Wasserstein", "Flask"],
    link: {
      href: "https://github.com/aniketGhetla/Master_Thesis_Football_Analytics",
      label: "GitHub",
    },
    caption:
      "The system end to end: pass maps and pass networks from event data, average team positions, and the GNN's tactical recommendation with its evidence. Click any view to enlarge.",
    shots: [
      {
        src: thesis1,
        alt: "FC St. Pauli pass map and pass network from a match",
      },
      {
        src: thesis2,
        alt: "Average team position: positional blob heatmap on the pitch",
      },
      {
        src: thesis3,
        alt: "GNN tactical recommendation: suggested formation with historical-counter and GNN-probability evidence",
      },
    ],
  },
  {
    title: "Football Formation Detection System",
    points: [
      "Computer-vision pipeline with YOLOv11, OpenCV and optical flow for real-time player/ball detection and tracking, with team segmentation via K-Means.",
      "Formation classification with ResNet-18 on player-position heatmaps, trained on hand-labelled match-footage frames.",
      "Perspective transformation to extract spatial metrics: speed, distance covered and possession %.",
    ],
    tags: ["YOLOv11", "OpenCV", "K-Means", "ResNet-18"],
    link: {
      href: "https://github.com/aniketGhetla/Football-AI-Analyser",
      label: "GitHub",
    },
    caption:
      "Real-time tracking from broadcast footage: team segmentation, per-player speed and distance, ball control, and the detected formation for both teams.",
    shots: [
      {
        src: formationImg,
        alt: "Formation-detection output on a Premier League frame: player tracking with per-player speed and distance, ball control 25 / 75, formations 4-4-2 vs 4-5-1",
      },
    ],
  },
  {
    title: "Student Nightlife - Tableau Dashboard",
    points: [
      "Interactive Tableau dashboard comparing student nightlife in Mannheim and Heidelberg.",
      "Geospatial mapping of nightlife hotspots and accessibility.",
      "Trend analysis of nightlife preferences: peak engagement times and entertainment choices; 55% of students rank music and entry fees as the top factors when choosing a club.",
    ],
    tags: ["Tableau", "Geospatial"],
    link: {
      href: "https://public.tableau.com/views/ExploringStudentNightlifeDashboard/Overview",
      label: "View dashboard",
    },
    caption:
      "Heidelberg vs. Mannheim: most-popular clubs, average cost and spend, a searchable map of every venue, and where the students come from. Click to enlarge.",
    shots: [
      {
        src: nightlifeImg,
        alt: "Exploring Student Nightlife, Heidelberg vs. Mannheim: KPI cards, a venue map and study-domain breakdown",
      },
    ],
  },
  {
    title: "Leeds Road Accident - Tableau Dashboard",
    points: [
      "Interactive Tableau dashboard analysing Leeds road-accident data with Sankey diagrams and LOD expressions to surface trends and contributing factors.",
      "Found 27.32% of accidents occur on wet/damp roads, and a correlation between traffic volume and accident frequency.",
    ],
    tags: ["Tableau", "Sankey", "LOD"],
    link: {
      href: "https://public.tableau.com/views/Group6-DataVIsualizationandstorytelling3/Dashboard1",
      label: "View dashboard",
    },
    caption:
      "Leeds City road accidents, 2019 vs 2018: totals and YoY, breakdowns by vehicle type, weather, road surface and lighting, plus an accidents-vs-traffic trend. Click to enlarge.",
    shots: [
      {
        src: leedsImg,
        alt: "Leeds City Road Accidents Analysis Dashboard: KPI, vehicle-type, weather, road-surface and lighting breakdowns",
      },
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Satellite Power Prediction & Anomaly Detection",
    points: [
      "Engineered a preprocessing pipeline to synchronise and resample 3 Martian years of telemetry into 15-minute intervals.",
      "Feature engineering with trigonometric angle encoding, energy calculations and consistent schemas across sources.",
      "Trained Random Forest, XGBoost and CatBoost on 7-hour windows; Random Forest predicted overall satellite power at an RMSE of 0.0124, the best in the group.",
      "Documented the full lifecycle: ingestion, preprocessing decisions, modelling approach, evaluation and limitations.",
    ],
    tags: ["Random Forest", "XGBoost", "CatBoost", "Time-series"],
  },
  {
    title: "Lyft Bikeshare - Streaming Pipeline",
    points: [
      "Big-data pipeline for streaming, processing and visualising bike-share data.",
      "Automated retrieval with Cloud Scheduler, Cloud Functions and Pub/Sub; stream processing and aggregation in Dataflow, stored in BigQuery.",
      "Looker Studio dashboards for real-time bike-station availability.",
    ],
    tags: ["GCP", "Dataflow", "BigQuery", "Looker Studio"],
  },
  {
    title: "Weather & Train-Delay - Data Pipeline",
    points: [
      "Automated Apache Airflow pipeline fetching real-time weather every 5 minutes and processing 1M+ rows of historical train-delay data.",
      "Cleaning and transformation in PySpark and dbt: dropping dead columns, parsing timestamps.",
    ],
    tags: ["Airflow", "PySpark", "dbt"],
  },
];

const ProjectFoot = ({ project }: { project: Project }) => (
  <div className="projects__foot">
    <ul className="projects__tags">
      {project.tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    {project.link && (
      <a
        className="projects__link"
        href={project.link.href}
        target="_blank"
        rel="noreferrer"
      >
        {project.link.label} <span aria-hidden="true">&#8599;</span>
      </a>
    )}
  </div>
);

type Lb = { src: string; alt: string; caption: string };

const Projects = () => {
  const [lightbox, setLightbox] = useState<Lb | null>(null);

  const openShot = (project: Project, i: number) => {
    const shot = project.shots?.[i];
    if (!shot) return;
    setLightbox({
      src: shot.full ?? shot.src,
      alt: shot.alt,
      caption: project.caption ?? "",
    });
  };

  return (
    <section className="projects" id="projects">
      <div className="projects__inner">
        <h2 className="projects__heading">Projects</h2>

        {FEATURED.map((project) => {
          const shots = project.shots ?? [];
          return (
            <article className="projects__featured" key={project.title}>
              <div className="projects__featured-media">
                {shots.length > 1 ? (
                  <Carousel
                    slides={shots.map((s) => ({ src: s.src, alt: s.alt }))}
                    onExpand={(i) => openShot(project, i)}
                  />
                ) : (
                  <button
                    type="button"
                    className="projects__shot"
                    onClick={() => openShot(project, 0)}
                    aria-label={`Open ${project.title} full size`}
                  >
                    <img src={shots[0].src} alt={shots[0].alt} loading="lazy" />
                    <span className="projects__shot-badge">
                      Proof of work &middot; click to zoom
                    </span>
                  </button>
                )}
              </div>

              <div className="projects__featured-body">
                <p className="projects__featured-label">Featured</p>
                <h3>{project.title}</h3>
                <ul className="projects__points">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ProjectFoot project={project} />
              </div>
            </article>
          );
        })}

        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <article className="projects__card" key={project.title}>
              <h3>{project.title}</h3>
              <ul className="projects__points">
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ProjectFoot project={project} />
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
};

export default Projects;
