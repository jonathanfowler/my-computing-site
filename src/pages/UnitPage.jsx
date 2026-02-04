// src/pages/UnitPage.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import unitsData from "../content/units/units.json";
import activitiesData from "../content/activities/activities.json";

function UnitPage() {
  const { slug } = useParams();

  const unit = useMemo(
    () => unitsData.find((item) => item.slug === slug),
    [slug]
  );

  const activitiesBySlug = useMemo(() => {
    const map = new Map();
    activitiesData.forEach((activity) => {
      map.set(activity.slug, activity);
    });
    return map;
  }, []);

  if (!unit) {
    return (
      <main className="bc-page bc-page--narrow">
        <header className="bc-header">
          <h1 className="bc-header__title">Unit not found</h1>
          <p className="bc-header__subtitle">
            The unit you requested could not be found.
          </p>
        </header>
      </main>
    );
  }

  const lessons = unit.lessons || [];
  const availableLessons = lessons.filter(
    (lesson) => lesson.activitySlug && activitiesBySlug.has(lesson.activitySlug)
  );

  return (
    <main className="bc-page bc-page--narrow">
      <header className="bc-header">
        <h1 className="bc-header__title">{unit.title}</h1>
        <p className="bc-header__subtitle">{unit.summary}</p>
        <p className="bc-header__meta">
          {unit.keyStage}
          {unit.yearRange ? ` (${unit.yearRange})` : ""} • {unit.lessonCount} lessons
          {unit.duration ? ` • ${unit.duration}` : ""}
        </p>
        <span className="bc-header__badge">Unit overview</span>
      </header>

      {unit.overview?.length ? (
        <section className="bc-card">
          <h2 className="bc-card__title">Overview</h2>
          {unit.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ) : null}

      {unit.learningFocus?.length ? (
        <section className="bc-card">
          <h2 className="bc-card__title">Learning focus</h2>
          <ul className="bc-activity-list">
            {unit.learningFocus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="bc-card">
        <h2 className="bc-card__title">Lessons in this unit</h2>
        <p className="bc-meta">
          {availableLessons.length} of {lessons.length} lessons currently have published
          activities.
        </p>
        <div className="bc-list">
          {lessons.map((lesson) => {
            const activity = lesson.activitySlug
              ? activitiesBySlug.get(lesson.activitySlug)
              : null;
            return (
              <div key={`${lesson.order}-${lesson.title}`} className="bc-list__item">
                <div>
                  <strong>
                    {lesson.order}. {lesson.title}
                  </strong>
                  {lesson.summary && <p className="bc-meta">{lesson.summary}</p>}
                </div>
                {activity ? (
                  <Link
                    to={`/activities/${activity.slug}`}
                    className="bc-button bc-button--small"
                  >
                    Open activity
                  </Link>
                ) : (
                  <span className="bc-chip">Planned</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="bc-footer">
        Activities can still be accessed individually via the Activities library.
      </footer>
    </main>
  );
}

export default UnitPage;
