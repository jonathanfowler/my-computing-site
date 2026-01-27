// src/pages/ActivitiesIndex.jsx
import React from "react";
import { Link } from "react-router-dom";

function ActivitiesIndex() {
  const activities = [
    {
      id: "ai-literacy-basics",
      title: "AI Literacy Basics (KS3)",
      blurb: "Introductory activity on where AI appears in everyday life.",
      tags: ["KS3", "AI", "Digital Literacy"],
      path: "/activities/ai-literacy-basics",
    },
    {
      id: "binary-basics",
      title: "Binary Basics (KS3)",
      blurb: "Convert binary numbers using place values. Contains a short interactive test.",
      tags: ["KS3", "Binary", "Data"],
      path: "/activities/binary-basics",
    },

  ];

  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">Interactive Computing Activities</h1>
        <p className="bc-header__subtitle">
          KS3 & KS4-ready tasks focusing on digital skills, AI literacy and core
          Computing concepts. Each activity has an interactive version and can
          be printed or saved as a PDF.
        </p>
        <span className="bc-header__badge">Activities library</span>
      </header>

      <section className="bc-grid">
        {activities.map((activity) => (
          <Link
            key={activity.id}
            to={activity.path}
            className="bc-card-link"
          >
            <article className="bc-card">
              <h2 className="bc-card__title">{activity.title}</h2>
              <p>{activity.blurb}</p>
              <div className="bc-chips" style={{ marginTop: "0.6rem" }}>
                {activity.tags.map((tag) => (
                  <span key={tag} className="bc-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "0.8rem" }}>
                <span className="bc-button bc-button--small">
                  Open activity
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      <footer className="bc-footer">
        More activities will be added over time as the Computing curriculum
        develops.
      </footer>
    </main>
  );
}

export default ActivitiesIndex;
