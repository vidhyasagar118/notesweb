import { Link } from "react-router-dom";
import PageSEO from "../components/PageSEO";
import "../styles/seoPages.css";

export default function AboutUs() {
  return (
    <main className="seo-page">
      <PageSEO
        title="About NotesWeb | AI-Powered Notes Sharing Platform"
        description="Learn how NotesWeb helps students organize semester notes, share study materials securely and ask questions from PDFs with AI assistance."
        path="/about"
        schemaType="AboutPage"
      />

      <section className="seo-hero">
        <div className="seo-shell">
          <span className="seo-eyebrow">ABOUT NOTESWEB</span>
          <h1>Study materials that are organized, shareable and easier to understand</h1>
          <p>
            NotesWeb is a student-focused learning platform where learners can
            upload notes, arrange them by semester and subject, share selected
            materials through a Group Code and ask questions from supported PDF files.
          </p>
          <div className="seo-actions">
            <Link className="seo-primary" to="/login">Start using NotesWeb</Link>
            <Link className="seo-secondary" to="/contact">Contact us</Link>
          </div>
        </div>
      </section>

      <section className="seo-shell seo-section">
        <div className="seo-heading">
          <span className="seo-eyebrow">WHY WE BUILT IT</span>
          <h2>One clear place for scattered college notes</h2>
        </div>
        <div className="seo-copy">
          <p>
            Students often keep PDFs, photographs, handwritten notes and videos
            across different chats, drives and devices. Finding the correct file
            during revision becomes harder than it should be. NotesWeb was created
            to reduce that confusion by giving every learner a personal, structured
            study space.
          </p>
          <p>
            The platform supports semester-wise and subject-wise organization.
            Students decide whether an uploaded item remains private or is available
            through sharing features. The aim is not merely to store files, but to
            help learners return to the right material quickly and revise with purpose.
          </p>
        </div>
      </section>

      <section className="seo-shell seo-section">
        <div className="seo-heading"><span className="seo-eyebrow">CORE FEATURES</span><h2>Built around practical student needs</h2></div>
        <div className="feature-grid">
          <article><h3>Organized library</h3><p>Arrange study material by semester and subject instead of searching through unstructured folders.</p></article>
          <article><h3>Controlled sharing</h3><p>Use a unique Group Code to share permitted resources while keeping private material protected.</p></article>
          <article><h3>AI-assisted learning</h3><p>Ask questions from compatible PDFs. When document context is unavailable, the assistant can provide general educational guidance.</p></article>
          <article><h3>Multiple formats</h3><p>Keep useful PDFs, images and supported video resources together in a responsive personal dashboard.</p></article>
        </div>
      </section>

      <section className="seo-shell seo-section seo-panel">
        <h2>Our learning philosophy</h2>
        <p>
          Good technology should support understanding, not replace it. NotesWeb
          encourages students to verify important answers with textbooks, teachers
          and official university material. AI responses can be helpful for revision
          and explanation, but they may contain errors and should not be treated as
          an unquestionable academic source.
        </p>
        <p>
          NotesWeb is designed for lawful educational use. Users should upload only
          content they own or are permitted to share, respect copyright and avoid
          exposing personal or confidential information.
        </p>
      </section>

      <section className="seo-shell seo-section seo-cta">
        <h2>Start with a better study system</h2>
        <p>Create your account to organize notes, control sharing and use AI-assisted PDF learning tools.</p>
        <Link className="seo-primary" to="/login">Get started</Link>
      </section>
    </main>
  );
}
