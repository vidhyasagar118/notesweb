import "./LegalPages.css";

function Disclaimer() {
  return (
    <>
      <main className="legal-page">
        <article className="legal-container">
          <header className="legal-header">
            <h1>Disclaimer</h1>
            <p>Last updated: July 2026</p>
          </header>

          <section className="legal-section">
            <h2>1. General Disclaimer</h2>
            <p>
              NotesWeb is an educational notes-sharing platform. The
              information and materials available on this website are provided
              for general educational and informational purposes only.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. User-Uploaded Content</h2>
            <p>
              Notes, PDFs, videos and other materials may be uploaded by
              registered users. NotesWeb does not create, verify or approve
              every uploaded file before it becomes available.
            </p>
            <p>
              The person uploading content is responsible for ensuring that
              they have the right or permission to share it.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. No Guarantee of Accuracy</h2>
            <p>
              We do not guarantee that uploaded notes or other educational
              materials are accurate, complete, current or free from errors.
            </p>
            <p>
              Students should verify important information using teachers,
              official syllabi, textbooks and trusted academic sources.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Artificial Intelligence Disclaimer</h2>
            <p>
              NotesWeb may provide AI-generated responses based on uploaded
              documents or general questions.
            </p>
            <p>
              AI-generated answers may contain mistakes, missing information
              or incorrect interpretations. Users should verify all important
              answers before using them in assignments, examinations or
              academic work.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Copyright Disclaimer</h2>
            <p>
              NotesWeb does not encourage users to upload copyrighted
              materials without authorization.
            </p>
            <p>
              If you believe that any material available on NotesWeb violates
              your copyright, please contact us with sufficient information so
              that we can review and remove the reported content where
              appropriate.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. External Services and Links</h2>
            <p>
              NotesWeb may use or link to third-party services. We do not
              control their availability, security, content or privacy
              practices.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Advertisement Disclaimer</h2>
            <p>
              Advertisements displayed on NotesWeb may be provided by Google
              AdSense or other third-party advertising services.
            </p>
            <p>
              The appearance of an advertisement does not mean that NotesWeb
              recommends or guarantees the advertised product or service.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Academic Responsibility</h2>
            <p>
              NotesWeb should be used as a supplementary learning resource.
              Users remain responsible for their own study decisions,
              assignments, examinations and academic results.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              NotesWeb will not be responsible for any direct or indirect loss
              resulting from the use of uploaded content, AI responses,
              third-party links or platform services.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Contact Us</h2>
            <p>
              To report inaccurate, inappropriate or copyrighted content,
              please use our <a href="/contact">Contact page</a>.
            </p>
          </section>
        </article>
      </main>

    </>
  );
}

export default Disclaimer;