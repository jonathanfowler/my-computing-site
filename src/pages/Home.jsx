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
        <h1 className="bc-header__title">
          Computing Resources for the UK Curriculum (KS1 to KS4)

        </h1>
        <p className="bc-header__subtitle">
          Interactive and printable lesson resources covering the full Computing curriculum, designed to reflect current teaching practice and upcoming curriculum developments.
        </p>
        <span className="bc-header__badge">
          KS1 to KS4 - Digital Skills - AI Literacy
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
          <li>Interactive browser-based activities for Computing lessons.</li>
          <li>Matching printable/PDF worksheets via the browser print dialog.</li>
          <li>
            Content aligned with future UK Computing priorities (AI literacy,
            cybersecurity, data, digital skills).
          </li>
        </ul>
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
