// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const encodedQuery = query.trim();
    navigate(
      encodedQuery
        ? `/activities?query=${encodeURIComponent(encodedQuery)}`
        : "/activities"
    );
  };

  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">FutureSkills Computing</h1>
        <p className="bc-header__subtitle">
          Practical Computing resources for a changing UK curriculum
        </p>
        <p className="bc-header__subtitle">
          FutureSkills Computing provides clear, classroom-ready Computing
          activities for UK primary and secondary schools. The resources are
          designed to support KS1 to KS4 teaching, with a particular focus on
          KS3 and lower KS4, where Computing is increasingly expected to
          develop broad digital competence alongside traditional Computer
          Science.
        </p>
        <p className="bc-header__subtitle">
          As the subject evolves, schools are being asked to address areas such
          as digital literacy, data understanding, AI awareness and responsible
          technology use. FutureSkills Computing responds to this shift by
          offering focused learning activities that strengthen core Computing
          foundations while remaining accessible to all pupils.
        </p>
        <span className="bc-header__badge">
          KS1 to KS4 - Digital literacy - AI awareness
        </span>
      </header>

      <section className="bc-card">
        <h2 className="bc-card__title">Search the activities library</h2>
        <form onSubmit={handleSearchSubmit} className="bc-filters bc-filters--home">
          <div className="bc-filter bc-filter--full">
            <label className="bc-filter__label" htmlFor="home-search">
              Search activities
            </label>
            <input
              id="home-search"
              className="bc-input"
              type="search"
              placeholder="Search by sub-topic, lesson, or keyword"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
           <div className="bc-filter bc-filter--actions">
            <button className="bc-button" type="submit">
              Search
            </button>
            <Link
              to="/activities"
              className="bc-button bc-button--secondary bc-button--small"
            >
              Browse all activities
            </Link>
          </div> 
        </form>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">What you'll find here</h2>
        <ul className="bc-activity-list">
          <li>Interactive browser-based activities that require no logins</li>
          <li>Printable versions suitable for worksheets or homework</li>
          <li>Clear explanations designed to minimise cognitive load</li>
          <li>Resources that fit easily into existing schemes of work</li>
        </ul>
        <p>
          Activities can be used flexibly as starters, main tasks, retrieval
          practice or independent work.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Designed for real classrooms</h2>
        <p>These resources are built with everyday classroom constraints in mind:</p>
        <ul className="bc-activity-list">
          <li>Minimal setup</li>
          <li>Consistent structure across activities</li>
          <li>Suitable for whole-class teaching or individual use</li>
          <li>Adaptable for specialist and non-specialist teachers</li>
        </ul>
        <p>
          The emphasis throughout is on clarity, practicality and meaningful
          learning, rather than exam-specific training or abstract theory.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Curriculum focus</h2>
        <p>
          The activities support core areas likely to be emphasised in the
          refreshed Computing curriculum, including:
        </p>
        <ul className="bc-activity-list">
          <li>Digital literacy</li>
          <li>Data and information</li>
          <li>Programming fundamentals</li>
          <li>AI literacy</li>
          <li>Safe and responsible use of technology</li>
        </ul>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Getting started</h2>
        <p>
          Browse the Activities section to explore individual lessons, or visit
          For Teachers for guidance on classroom use.
        </p>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link to="/activities" className="bc-button">
            Browse activities
          </Link>
          <Link to="/for-teachers" className="bc-button bc-button--secondary bc-button--small">
            For teachers
          </Link>
        </div>
      </section>

{/*       <section className="bc-card">
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
      </section> */}

      <footer className="bc-footer">
        (c) {new Date().getFullYear()} FutureSkills Computing - KS1 to KS4
        resources.
      </footer>
    </main>
  );
}

export default Home;
