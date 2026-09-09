import {
  Navigation,
  Hero,
  About,
  Toolkit,
  Experience,
  Education,
  Projects,
  Certifications,
  Awards,
  Hobbies,
  Contact,
  Footer,
} from "./components";
import PitchDivider from "./components/PitchDivider";
import "./index.scss";

function App() {
  return (
    <div className="main-container">
      <Navigation />
      <Hero />
      <About />
      <PitchDivider variant="arc" />
      <Toolkit />
      <PitchDivider variant="kickoff" />
      <Experience />
      <PitchDivider variant="arc" />
      <Education />
      <PitchDivider variant="kickoff" />
      <Projects />
      <PitchDivider variant="arc" />
      <Certifications />
      <PitchDivider variant="kickoff" />
      <Awards />
      <PitchDivider variant="arc" />
      <Hobbies />
      <PitchDivider variant="arc" />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
