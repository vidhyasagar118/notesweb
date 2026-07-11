import "./LegalPages.css";

function Terms() {
  return (
    <>
      <main className="legal-page">
        <article className="legal-container">
          <header className="legal-header">
            <h1>Terms and Conditions</h1>
            <p>Last updated: July 2026</p>
          </header>

          <section className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using NotesWeb, you agree to follow these Terms
              and Conditions. Please stop using the platform if you do not
              agree with these terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Purpose of NotesWeb</h2>
            <p>
              NotesWeb is an educational platform that allows users to upload,
              organise, access and share study notes and related educational
              materials.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. User Accounts</h2>

            <ul>
              <li>Users must provide accurate account information.</li>
              <li>Users are responsible for protecting their passwords.</li>
              <li>
                Users are responsible for activity performed through their
                accounts.
              </li>
              <li>
                Accounts must not be used to misuse, damage or interrupt the
                platform.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Uploading Content</h2>

            <p>By uploading a file to NotesWeb, you confirm that:</p>

            <ul>
              <li>You own the content or have permission to share it.</li>
              <li>The content is intended for educational use.</li>
              <li>The content does not violate copyright or privacy rights.</li>
              <li>The content is not illegal, harmful or misleading.</li>
              <li>The content does not contain malware or harmful code.</li>
            </ul>

            <div className="legal-note">
              <p>
                Uploading copyrighted books, paid course material or protected
                documents without permission is prohibited.
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2>5. Prohibited Activities</h2>

            <p>Users must not:</p>

            <ul>
              <li>Upload illegal or unauthorized copyrighted content.</li>
              <li>Attempt to access another user's account.</li>
              <li>Distribute malware, spam or harmful files.</li>
              <li>Use automated systems to overload the website.</li>
              <li>Attempt to manipulate advertisements or ad clicks.</li>
              <li>Use NotesWeb for fraudulent or unlawful activities.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Content Removal</h2>
            <p>
              NotesWeb may remove files, accounts or content that violate
              these terms, applicable laws or the rights of other users.
            </p>
            <p>
              We may also remove content following a valid copyright or
              privacy complaint.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Educational Content Accuracy</h2>
            <p>
              NotesWeb does not guarantee that uploaded notes, documents or
              other educational content are accurate, complete or suitable for
              every academic purpose.
            </p>
            <p>
              Users should verify important information using official course
              materials, teachers or trusted academic sources.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Artificial Intelligence Features</h2>
            <p>
              NotesWeb may provide AI-powered assistance. AI-generated answers
              may be incomplete or incorrect and should not be treated as an
              official academic source.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Advertisements</h2>
            <p>
              NotesWeb may display advertisements from Google AdSense or other
              advertising providers. Users must not intentionally click ads to
              create artificial revenue or encourage others to do so.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Service Availability</h2>
            <p>
              We may update, modify, suspend or discontinue parts of NotesWeb
              when required for maintenance, security or service improvement.
            </p>
            <p>
              Continuous and error-free availability is not guaranteed.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Limitation of Liability</h2>
            <p>
              NotesWeb is not responsible for academic loss, data loss,
              incorrect information or other damages arising from reliance on
              uploaded files or AI-generated answers.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Changes to These Terms</h2>
            <p>
              These Terms and Conditions may be updated when platform features
              or legal requirements change. Continued use of NotesWeb means you
              accept the updated terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Contact</h2>
            <p>
              For questions, content removal requests or copyright concerns,
              please use our <a href="/contact">Contact page</a>.
            </p>
          </section>
        </article>
      </main>

    </>
  );
}

export default Terms;