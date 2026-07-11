import "./LegalPages.css";
function PrivacyPolicy() {
  return (
    <>
      <main className="legal-page">
        <article className="legal-container">
          <header className="legal-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: July 2026</p>
          </header>

          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to NotesWeb. We respect your privacy and are committed
              to protecting the information you provide while using our
              website.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we
              use it and how users can contact us regarding their data.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>

            <p>When you use NotesWeb, we may collect:</p>

            <ul>
              <li>Your name or username.</li>
              <li>Your encrypted account password.</li>
              <li>Your automatically generated group code.</li>
              <li>Semester and subject information.</li>
              <li>Notes, documents and files uploaded by you.</li>
              <li>
                Basic technical information such as browser type, device type
                and website usage data.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How We Use Your Information</h2>

            <ul>
              <li>To create and manage your NotesWeb account.</li>
              <li>To provide login and authentication features.</li>
              <li>To upload, organise, access and share educational notes.</li>
              <li>To protect the platform from misuse or unauthorized access.</li>
              <li>To improve website features and user experience.</li>
              <li>To respond to support or copyright-related requests.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Password Security</h2>
            <p>
              User passwords are not intended to be stored as plain text.
              Passwords are encrypted or hashed before being stored in the
              database.
            </p>
            <p>
              Users are responsible for keeping their account credentials
              private and secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Storage</h2>
            <p>
              Account-related information may be stored using MongoDB Atlas.
              Uploaded documents may be processed or stored using third-party
              cloud storage services.
            </p>
            <p>
              We take reasonable measures to protect user information, but no
              online platform or storage system can guarantee complete
              security.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Browser Storage and Cookies</h2>
            <p>
              NotesWeb may use browser storage, such as localStorage, to keep
              users logged in and maintain website functionality.
            </p>
            <p>
              Third-party services, including Google AdSense, may use cookies
              or similar technologies to display advertisements, measure ad
              performance and prevent fraudulent activity.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Google AdSense</h2>
            <p>
              NotesWeb may display advertisements provided by Google AdSense.
              Google and its advertising partners may use cookies to display
              ads based on a user's visit to this website or other websites.
            </p>
            <p>
              Users may manage advertisement personalization through their
              Google account advertisement settings.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Third-Party Services</h2>

            <p>NotesWeb may use services such as:</p>

            <ul>
              <li>MongoDB Atlas for database storage.</li>
              <li>Cloud storage services for uploaded files.</li>
              <li>Google AdSense for advertisements.</li>
              <li>Analytics services for website performance information.</li>
              <li>Artificial intelligence services for note-related assistance.</li>
            </ul>

            <p>
              These services may process limited information according to
              their own privacy policies.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Uploaded Content</h2>
            <p>
              Users are responsible for the files and information they upload.
              Users should not upload private, illegal or copyrighted content
              without permission.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. User Rights and Data Removal</h2>
            <p>
              Users may contact us to request correction or deletion of their
              account information or uploaded content.
            </p>
            <p>
              Some information may be retained when required for security,
              fraud prevention or legal compliance.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Children's Privacy</h2>
            <p>
              NotesWeb is an educational platform. Users below the legally
              permitted age should use the platform under the supervision of a
              parent, guardian or educational institution.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Policy Updates</h2>
            <p>
              We may update this Privacy Policy when our website, services or
              legal requirements change. The latest version will remain
              available on this page.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Contact Us</h2>
            <p>
              For privacy or data-related requests, please use our{" "}
              <a href="/contact">Contact page</a>.
            </p>

            <div className="legal-note">
              <p>
                Website:{" "}
                <a
                  href="https://thenotes.online"
                  target="_blank"
                  rel="noreferrer"
                >
                  thenotes.online
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>

    </>
  );
}

export default PrivacyPolicy;