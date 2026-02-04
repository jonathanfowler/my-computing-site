// src/pages/UnitsIndex.jsx
import React from "react";
import { Link } from "react-router-dom";
import unitsData from "../content/units/units.json";

function UnitsIndex() {
  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">Units</h1>
        <p className="bc-header__subtitle">
          Structured sequences of lessons designed to support medium-term planning
          and progression across the Computing curriculum.
        </p>
        <span className="bc-header__badge">Scheme of work view</span>
      </header>

      <section className="bc-grid">
        {unitsData.map((unit) => (
          <Link key={unit.slug} to={`/units/${unit.slug}`} className="bc-card-link">
            <article className="bc-card">
              <h2 className="bc-card__title">{unit.title}</h2>
              <p className="bc-meta">
                {unit.keyStage}
                {unit.yearRange ? ` (${unit.yearRange})` : ""} • {unit.lessonCount} lessons
                {unit.duration ? ` • ${unit.duration}` : ""}
              </p>
              <p>{unit.summary}</p>
              <div style={{ marginTop: "0.8rem" }}>
                <span className="bc-button bc-button--small">View unit</span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      <footer className="bc-footer">
        More units will be added as the curriculum expands.
      </footer>
    </main>
  );
}

export default UnitsIndex;
