// src/pages/ActivityPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ActivityBlock from "../components/ActivityBlocks.jsx";
import activitiesData from "../content/activities/activities.json";
import { recordAttempt } from "../utils/progressRecorder";

const introModules = import.meta.glob("../content/activities/*/intro.md", {
  query: "?raw",
  import: "default",
});

const teacherNotesModules = import.meta.glob(
  "../content/activities/*/teacher-notes.md",
  {
    query: "?raw",
    import: "default",
  }
);

const blockModules = import.meta.glob("../content/activities/*/blocks.json", {
  import: "default",
});

function ActivityPage() {
  const { slug } = useParams();
  const activity = useMemo(
    () => activitiesData.find((item) => item.slug === slug),
    [slug]
  );

  const [intro, setIntro] = useState("");
  const [teacherNotes, setTeacherNotes] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [printMode, setPrintMode] = useState(false);
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const sessionStartRef = useRef(Date.now());

  const activityId = activity?.id || activity?.slug;

  const handleAttempt = (attempt) => {
    if (!activityId) return;
    const timeSpent = Math.max(
      0,
      Math.round((Date.now() - sessionStartRef.current) / 1000)
    );
    recordAttempt({
      activityId,
      timeSpent,
      ...attempt,
    });
  };

  useEffect(() => {
    let active = true;
    sessionStartRef.current = Date.now();

    const loadActivity = async () => {
      if (!slug) return;
      const introKey = `../content/activities/${slug}/intro.md`;
      const teacherNotesKey = `../content/activities/${slug}/teacher-notes.md`;
      const blocksKey = `../content/activities/${slug}/blocks.json`;
      const loadIntro = introModules[introKey];
      const loadTeacherNotes = teacherNotesModules[teacherNotesKey];
      const loadBlocks = blockModules[blocksKey];

      if (!loadIntro || !loadBlocks) {
        setStatus("missing");
        return;
      }

      try {
        setStatus("loading");
        const [introContent, blockContent] = await Promise.all([
          loadIntro(),
          loadBlocks(),
        ]);
        if (!active) return;
        setIntro(introContent || "");
        if (loadTeacherNotes) {
          const notesContent = await loadTeacherNotes();
          if (!active) return;
          setTeacherNotes(notesContent || "");
        } else {
          setTeacherNotes("");
        }
        setBlocks(blockContent?.blocks || []);
        setStatus("ready");
      } catch (error) {
        if (!active) return;
        setStatus("error");
      }
    };

    loadActivity();

    return () => {
      active = false;
    };
  }, [slug]);

  if (!activity) {
    return (
      <main className="bc-page bc-page--narrow">
        <header className="bc-header">
          <h1 className="bc-header__title">Activity not found</h1>
          <p className="bc-header__subtitle">
            The activity you requested could not be found.
          </p>
        </header>
      </main>
    );
  }

  return (
    <main className={`bc-page bc-page--narrow ${printMode ? "bc-printmode" : ""}`}>
      <header className="bc-header">
        <h1 className="bc-header__title">{activity.title}</h1>
        {activity.summary && (
          <p className="bc-header__subtitle">{activity.summary}</p>
        )}
        {activity.lessonCode && (
          <p className="bc-header__meta">Lesson code: {activity.lessonCode}</p>
        )}
        <span className="bc-header__badge">Interactive activity</span>
      </header>

      <section className="bc-card bc-print-controls">
        <h2 className="bc-card__title">Print options</h2>
        <div className="bc-print-actions">
          <label className="bc-chip bc-chip--toggle">
            <input
              type="checkbox"
              checked={printMode}
              onChange={(event) => setPrintMode(event.target.checked)}
            />
            Print mode
          </label>
          <label className={`bc-chip bc-chip--toggle ${printMode ? "" : "bc-chip--disabled"}`}>
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(event) => setIncludeAnswers(event.target.checked)}
              disabled={!printMode}
            />
            Include answers
          </label>
          <button
            className="bc-button bc-button--secondary bc-button--small"
            type="button"
            onClick={() => window.print()}
          >
            Print worksheet / Save as PDF
          </button>
        </div>
      </section>

      {status === "loading" && (
        <section className="bc-card">
          <p>Loading activity...</p>
        </section>
      )}

      {status === "missing" && (
        <section className="bc-card">
          <p>This activity is missing its content files.</p>
        </section>
      )}

      {status === "error" && (
        <section className="bc-card">
          <p>Something went wrong while loading this activity.</p>
        </section>
      )}

      {status === "ready" && (
        <>
          {teacherNotes && (
            <section className="bc-card bc-print-hide">
              <details className="bc-teacher-notes">
                <summary>Teacher notes (click to view)</summary>
                <ReactMarkdown>{teacherNotes}</ReactMarkdown>
              </details>
            </section>
          )}
          {intro && (
            <section className="bc-card">
              <ReactMarkdown>{intro}</ReactMarkdown>
            </section>
          )}
          {blocks.map((block) => (
            <ActivityBlock
              key={block.id || block.type}
              block={block}
              includeAnswers={includeAnswers}
              onAttempt={handleAttempt}
            />
          ))}
        </>
      )}

      <footer className="bc-footer">
        You may print or share this activity with your class.
      </footer>
    </main>
  );
}

export default ActivityPage;
