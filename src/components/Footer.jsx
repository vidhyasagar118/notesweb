import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
           THENotes.<span>onlne</span>
          </Link>

          <p>
            A simple platform for students to upload, access and share
            educational notes.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} NotesWeb. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;