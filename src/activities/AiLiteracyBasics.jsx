// src/activities/AiLiteracyBasics.jsx
import React, { useRef, useState } from "react";

function AiLiteracyBasics() {
  const chipsRef = useRef(null);
  const [result, setResult] = useState(null);

  const checkExamples = () => {
    if (!chipsRef.current) return;
    const checkboxes = chipsRef.current.querySelectorAll("input[type='checkbox']");

    let totalCorrect = 0;
    let score = 0;
    let anyChecked = false;

    checkboxes.forEach((box) => {
      const shouldBeChecked = box.dataset.correct === "true";
      if (shouldBeChecked) totalCorrect++;
      if (box.checked) {
        anyChecked = true;
        if (shouldBeChecked) score++;
        else score -= 0.5;
      }
    });

    if (!anyChecked) {
      setResult({ text: "Select the options you think use AI first.", ok: false });
      return;
    }

    const percent = Math.max(0, Math.round((score / totalCorrect) * 100));

    if (percent >= 80) {
      setResult({
        text: `Great! You picked the AI examples accurately. Score: ${percent}%.`,
        ok: true,
      });
    } else {
      setResult({
        text: `Some choices could be improved. Score: ${percent}%. Discuss as a class or try again.`,
        ok: false,
      });
    }
  };

  return (
    <main className="bc-page bc-page--narrow">
      <header className="bc-header">
        <h1 className="bc-header__title">AI Literacy Basics (KS3)</h1>
        <p className="bc-header__subtitle">
          A short interactive activity to help students notice where AI is used in
          everyday life.
        </p>
        <span className="bc-header__badge">Interactive activity</span>
      </header>

      <section className="bc-card">
        <h2 className="bc-card__title">What is AI?</h2>
        <p>
          <strong>Artificial Intelligence (AI)</strong> is when computers or
          machines do tasks that usually need human intelligence, such as
          recognising faces, understanding speech, spotting patterns or making
          predictions.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Activity: Does this use AI?</h2>
        <p>Tick all the things that you think use AI:</p>

        <div className="bc-chips" ref={chipsRef}>
          <label className="bc-chip">
            <input type="checkbox" data-correct="true" /> Netflix recommending shows
          </label>
          <label className="bc-chip">
            <input type="checkbox" data-correct="false" /> A pencil
          </label>
          <label className="bc-chip">
            <input type="checkbox" data-correct="true" /> TikTok “For You” page
          </label>
          <label className="bc-chip">
            <input type="checkbox" data-correct="true" /> Google Maps fastest route
          </label>
          <label className="bc-chip">
            <input type="checkbox" data-correct="false" /> A normal paper notebook
          </label>
          <label className="bc-chip">
            <input type="checkbox" data-correct="true" /> Spellcheck on your phone
          </label>
        </div>

        <button className="bc-button bc-button--small" onClick={checkExamples}>
          Check answers
        </button>

        {result && (
          <div
            className={
              "bc-result " + (result.ok ? "bc-result--ok" : "bc-result--bad")
            }
          >
            {result.text}
          </div>
        )}
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Print / Save as PDF</h2>
        <p>
          Teachers can use the browser&apos;s print function to create a PDF or
          paper copy of this page.
        </p>
        <button
          className="bc-button bc-button--secondary bc-button--small"
          onClick={() => window.print()}
        >
          Print worksheet / Save as PDF
        </button>
      </section>

      <footer className="bc-footer">
        AI Literacy Basics – KS3 • You may print or share this page with your
        class.
      </footer>
    </main>
  );
}

export default AiLiteracyBasics;
