// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">
          Computing Resources for the Future Curriculum
        </h1>
        <p className="bc-header__subtitle">
          Interactive and printable resources for KS3 & KS4 Computing in UK
          schools. Designed to support upcoming changes in Computing and digital
          literacy.
        </p>
        <span className="bc-header__badge">
          KS3 • KS4 • Digital Skills • AI Literacy
        </span>
      </header>

      <section className="bc-card">
        <h2 className="bc-card__title">What you’ll find here</h2>
        <ul className="bc-activity-list">
          <li>Interactive browser-based activities for Computing lessons.</li>
          <li>Matching printable/PDF worksheets via the browser print dialog.</li>
          <li>
            Content aligned with future UK Computing priorities (AI literacy,
            cybersecurity, data, digital skills).
          </li>
        </ul>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Get started</h2>
        <p>Try the first prototype activity, or browse the full list.</p>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link to="/activities/ai-literacy-basics" className="bc-button">
            AI Literacy Basics (KS3)
          </Link>
          <Link
            to="/activities"
            className="bc-button bc-button--secondary bc-button--small"
          >
            Browse all activities
          </Link>
        </div>
      </section>

      <footer className="bc-footer">
        © {new Date().getFullYear()} FutureSkills Computing — KS3 & KS4
        resources.
      </footer>
    </main>
  );
}

export default Home;
