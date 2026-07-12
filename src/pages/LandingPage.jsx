import "./LandingPage.css";
import  { useState } from "react";
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
export default function LandingPage() {
  const [stats, setStats] = useState({
  totalStudents: 0,
  totalNotes: 0,
  subjects: 0
});
const navigate=useNavigate();
  
useEffect(() => {

  const fetchStats = async () => {
    try {
      const res = await API.get("/stats");

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchStats();

}, []);
const handleGetStarted = async () => {
  const token = localStorage.getItem("token");

  // Token hi nahi hai to login page
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    // Backend se token verify
    await API.get("/auth/verify");

    // Valid token hai
    navigate("/dashboard");
  } catch (error) {
    // Expired ya invalid token remove karo
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));

    navigate("/login");
  }
};
  return (
    <div className="landing-page">

      
      {/* Hero */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-left">

          <h1>
            Share Notes,
            <br />
            <span>Learn Together 🚀</span>
          </h1>

          <p>
            Upload, organize and share your study notes with
            your classmates. Keep all your semester notes in
            one place and access them anytime, anywhere.
          </p>

          <button
            className="hero-btn"
            onClick={handleGetStarted}
          >
            Get Started Now →
          </button>

          <div className="stats">

            <div className="stat-box">
<h2>{stats.totalNotes}+</h2>
<p>Notes Uploaded</p>
            </div>

            <div className="stat-box">
<h2>{stats.totalStudents}+</h2>
<p>Students Joined</p>
            </div>

            <div className="stat-box">
              <h2>{stats.subjects}+</h2>
<p>Subjects Covered</p>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <div className="preview-card">
  <h3>📚 Notes Management</h3>
  <p>Upload semester-wise study materials</p>
</div>

<div className="preview-card">
  <h3>👥 Group Sharing</h3>
  <p>Share notes using group codes</p>
</div>

<div className="preview-card">
  <h3>☁️ Cloud Storage</h3>
  <p>Access notes anytime anywhere</p>
</div>

<div className="preview-card">
  <h3>📄 PDF Support ,video,photos and other</h3>
  <p>Upload,  ,video,photos and other and download PDFs  and all easily</p>
</div>
<div className="preview-card">
  <h3>🤖 AI Assistant</h3>
  <p>Ask questions and get instant answers</p>
</div>

<div className="preview-card">
  <h3>⚡ Fast Response</h3>
  <p>Get quick and clear explanations</p>
</div>
        </div>
        

      </section>
      <section className="ai-section">

  <h2>
    🤖 Smart AI Assistant
  </h2>

  <p className="ai-subtitle">
    Experience next-level learning with our intelligent AI
  </p>

  <div className="ai-grid">

    <div className="ai-card">
      <h3>📄 Learn from Your Notes</h3>
      <p>
        Upload your PDFs   and photos and ask questions directly.
        AI reads your notes and gives accurate answers instantly.
      </p>
    </div>

    <div className="ai-card">
      <h3>🧠 Smart Answering</h3>
      <p>
        AI automatically decides whether to answer from your notes
        or from general knowledge — no manual selection needed.
      </p>
    </div>

    <div className="ai-card">
      <h3>⚡ Instant Responses</h3>
      <p>
        Get fast, clear, and well-structured answers like a personal teacher.
      </p>
    </div>

    <div className="ai-card">
      <h3>💡 Easy to Use</h3>
      <p>
        Just upload → ask → learn. No complicated steps, everything is simple.
      </p>
    </div>

  </div>

</section>

      {/* Features */}

      <section
        className="features-section"
        id="features"
      >

        <h2>
          Why Choose <span>thenotes.online?</span>
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <div className="icon">📄</div>

            <h3>Upload Notes</h3>

            <p>
              Store all your study materials securely
              in one place.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">👥</div>

            <h3>Group Sharing</h3>

            <p>
              Share notes with classmates
              instantly and easily.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">⚡</div>

            <h3>Quick Access</h3>

            <p>
              Access notes anytime,
              anywhere, on any device.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>

            <h3>Secure & Safe</h3>

            <p>
              Your notes remain secure
              and protected.
            </p>
          </div>

        </div>

      </section>
      

      {/* How It Works */}

      <section
        className="how-section"
        id="howitworks"
      >

        <h2>How It Works?</h2>

        <div className="steps">

          <div className="step">
            <div className="circle">1</div>

            <h4>Create Account</h4>

            <p>
              Sign up and create your account.
            </p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="circle">2</div>

            <h4>Login</h4>

            <p>
              Login and access dashboard.
            </p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="circle">3</div>

            <h4>Upload Notes</h4>

            <p>
              Upload your PDFs and notes.
            </p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="circle">4</div>

            <h4>Share Notes</h4>

            <p>
              Share notes with your friends.
            </p>
          </div>

          <div className="arrow">→</div>

          <div className="step">
            <div className="circle">5</div>

            <h4>Download</h4>

            <p>
              Download notes anytime.
            </p>
          </div>

        </div>

      </section>

      {/* About */}

      <section
        className="about-section"
        id="about"
      >

        <h2>About thenotes.online</h2>

        <p>
          Thenotes.online is a smart platform built for
          students. Upload semester-wise notes,
          organize study materials, share files
          with classmates and access everything
          from one dashboard.
        </p>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="cta-content">

          <h2>
            Start Your Learning Journey Today!
          </h2>

          <p>
            Join thousands of students already
            sharing notes and learning together.
          </p>

          <button
            className="cta-btn"
          onClick={handleGetStarted}
          >
            Explore thenotes.online→
          </button>

        </div>

      </section>




    </div>
  );
}