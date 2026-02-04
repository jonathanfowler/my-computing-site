// src/pages/ActivitiesIndex.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import activitiesData from "../content/activities/activities.json";

function ActivitiesIndex() {
  const activities = activitiesData.map((activity) => ({
    ...activity,
    path: `/activities/${activity.slug}`,
  }));

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState("all");

  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setQuery(initialQuery);
  }, [searchParams]);

  const unitOptions = useMemo(() => {
    const unique = new Set(
      activities.map((activity) => activity.unit).filter(Boolean)
    );
    return ["all", ...Array.from(unique)];
  }, [activities]);

  const lessonOptions = useMemo(() => {
    const unique = new Set(
      activities.map((activity) => activity.lesson).filter(Boolean)
    );
    return ["all", ...Array.from(unique)];
  }, [activities]);

  const filteredActivities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          activity.title,
          activity.summary,
          activity.subTopic,
          activity.lesson,
          activity.unit,
          ...(activity.tags || []),
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedQuery));

      const matchesUnit =
        selectedUnit === "all" || activity.unit === selectedUnit;

      const matchesLesson =
        selectedLesson === "all" || activity.lesson === selectedLesson;

      return matchesQuery && matchesUnit && matchesLesson;
    });
  }, [activities, query, selectedUnit, selectedLesson]);

  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">Interactive Computing Activities</h1>
        <p className="bc-header__subtitle">
          KS1 to KS4-ready tasks focusing on digital skills, AI literacy and core
          Computing concepts. Each activity has an interactive version and can
          be printed or saved as a PDF.
        </p>
        <span className="bc-header__badge">Activities library</span>
      </header>

      <section className="bc-filters">
        <div className="bc-filter bc-filter--wide">
          <label className="bc-filter__label" htmlFor="activity-search">
            Search activities
          </label>
          <input
            id="activity-search"
            className="bc-input"
            type="search"
            placeholder="Search by unit, lesson, or keyword"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="bc-filter">
          <label className="bc-filter__label" htmlFor="unit-select">
            Unit
          </label>
          <select
            id="unit-select"
            className="bc-input bc-select"
            value={selectedUnit}
            onChange={(event) => setSelectedUnit(event.target.value)}
          >
            {unitOptions.map((unit) => (
              <option key={unit} value={unit}>
                {unit === "all" ? "All units" : unit}
              </option>
            ))}
          </select>
        </div>
        <div className="bc-filter">
          <label className="bc-filter__label" htmlFor="lesson-select">
            Lesson
          </label>
          <select
            id="lesson-select"
            className="bc-input bc-select"
            value={selectedLesson}
            onChange={(event) => setSelectedLesson(event.target.value)}
          >
            {lessonOptions.map((lesson) => (
              <option key={lesson} value={lesson}>
                {lesson === "all" ? "All lessons" : lesson}
              </option>
            ))}
          </select>
        </div>
      </section>

      <p className="bc-result">
        Showing {filteredActivities.length} of {activities.length} activities.
      </p>

      <section className="bc-grid">
        {filteredActivities.map((activity) => (
          <Link key={activity.slug} to={activity.path} className="bc-card-link">
            <article className="bc-card">
              <h2 className="bc-card__title">{activity.title}</h2>
              {activity.lessonCode && (
                <p className="bc-meta">Lesson code: {activity.lessonCode}</p>
              )}
              <p>{activity.summary}</p>
              <div className="bc-chips" style={{ marginTop: "0.6rem" }}>
                {activity.tags.map((tag) => (
                  <span key={tag} className="bc-chip">
                    {tag}
                  </span>
                ))}
                {activity.unit && <span className="bc-chip">{activity.unit}</span>}
                {activity.lesson && (
                  <span className="bc-chip">{activity.lesson}</span>
                )}
              </div>
              <div style={{ marginTop: "0.8rem" }}>
                <span className="bc-button bc-button--small">Open activity</span>
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
