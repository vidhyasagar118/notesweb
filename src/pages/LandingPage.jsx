import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Contact from "./Contact";
import  { useState } from "react";
import  { useEffect } from "react";
import API from "../api";
export default function LandingPage() {
  const [stats, setStats] = useState({
  totalStudents: 0,
  totalNotes: 0,
  subjects: 0
});
const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {

  if (menuOpen) {

    const timer = setTimeout(() => {
      setMenuOpen(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }

}, [menuOpen]);
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
  return (
    <div className="landing-page">

      {/* Navbar */}
<nav className="navbar">

  <div
    className="logo"
    onClick={() => scrollToSection("home")}
  >
    <div
    className="menu-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </div>
    📘 <span>NOTES.COM</span>
  </div>

  

  <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
<li onClick={() => {
  scrollToSection("home");
  setMenuOpen(false);
}}>Home</li>

   

    <li onClick={() => {
  scrollToSection("features");
  setMenuOpen(false);
}}>
  Features
</li>

  <li onClick={() => {
  scrollToSection("about");
  setMenuOpen(false);
}}>
  About Us
</li>

<li onClick={() => {
  scrollToSection("contact");
  setMenuOpen(false);
}}>
  Contact
</li>

  </ul>

  <button
    className="nav-btn"
    onClick={() => navigate("/login")}
  >
    Login / Get Started
  </button>

</nav>

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
            onClick={() => navigate("/login")}
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
  <h3>📄 PDF Support</h3>
  <p>Upload and download PDFs easily</p>
</div>

        </div>

      </section>

      {/* Features */}

      <section
        className="features-section"
        id="features"
      >

        <h2>
          Why Choose <span>Notes.com?</span>
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

        <h2>About Notes.com</h2>

        <p>
          Notes.com is a smart platform built for
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
            onClick={() => navigate("/login")}
          >
            Explore Notes.com →
          </button>

        </div>

      </section>

      {/* Footer */}

<section>
  <Contact />
</section>
      <footer
        className="footer"
        id="contact"
      >

        <div className="footer-logo">
          📘 NOTES.COM
        </div>

        <div className="footer-links">

          <span
            onClick={() => scrollToSection("home")}
          >
            Home
          </span>

          <span
            onClick={() => scrollToSection("features")}
          >
            Features
          </span>

          <span
            onClick={() => scrollToSection("about")}
          >
            About
          </span>

          <span
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </span>

        </div>

        <p>
          © 2026 Notes.com | All Rights Reserved
        </p>

      </footer>

    </div>
  );
}