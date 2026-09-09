import "./About.scss";
import PlayerCard from "./PlayerCard";
import TrackingViz from "./TrackingViz";
import Stats from "./Stats";

const resumeUrl = `${process.env.PUBLIC_URL}/Aniket_Ghetla_CV.pdf`;

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about__grid">
        <div className="about__lead">
          <p className="about__intro">
            I break down opponents from tracking and event data, then hand
            coaches something they can actually use before matchday, not just
            another dashboard nobody opens.
          </p>

          <div className="about__cta">
            <a className="about__cta-btn" href="#projects">
              See the work
            </a>
            <a
              className="about__cta-btn about__cta-btn--ghost"
              href={resumeUrl}
              download
            >
              Download Resume
            </a>
          </div>
        </div>

        <Stats />

        <div className="about__left">
          <p className="about__kicker">About</p>
          <h2 className="about__heading">
            I've played the game for twenty years. I spend most of my week
            now inside its data.
          </h2>

          <PlayerCard />
        </div>

        <div className="about__right">
          <div className="about__viz">
            <TrackingViz />
          </div>

          <p className="about__body">
            I'm a data scientist/analyst working in football analytics.
            Recently I built an opponent-analysis system helping two clubs,
            one in the Premier League and one in the 2. Bundesliga. My work
            sits at the intersection of tracking/event data and tactical
            structure, turning frame-by-frame positional data into something a
            coaching staff can act on before a match.
          </p>
          <p className="about__body">
            That translation work is easier because I've stood on both sides
            of the game. I hold a Master's in Applied Data Science and
            Analytics from SRH Hochschule Heidelberg, and I'm currently an
            assistant coach at SpVgg Wallstadt 3 alongside my own playing
            career. I know what a coach needs to hear in a ten-minute team
            meeting, and what a model needs to say to earn a place in it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
