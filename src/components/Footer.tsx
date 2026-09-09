import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Aniket Ghetla</p>
      <p>Mannheim, Germany</p>
    </footer>
  );
};

export default Footer;
