// src/activities/BinaryBasics.jsx
import React, { useState } from "react";

function BinaryBasics() {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const checkAnswer = () => {
    // correct answer for 101101 in binary = 45 in denary
    const correct = "45";
    const cleaned = answer.trim();

    if (!cleaned) {
      setResult({ ok: false, text: "Type a number first." });
      return;
    }

    if (cleaned === correct) {
      setResult({
        ok: true,
        text: "Correct! 101101₂ = 45₁₀.",
      });
    } else {
      setResult({
        ok: false,
        text: `Not quite. Try again! (Hint: place values are 32, 16, 8, 4, 2, 1)`,
      });
    }
  };

  return (
    <main className="bc-page bc-page--narrow">
      <header className="bc-header">
        <h1 className="bc-header__title">Binary Basics (KS3)</h1>
        <p className="bc-header__subtitle">
          A quick activity introducing binary place value and converting binary
          numbers into denary (base-10).
        </p>
        <span className="bc-header__badge">Interactive activity</span>
      </header>

      <section className="bc-card">
        <h2 className="bc-card__title">Understanding Binary</h2>
        <p>
          Computers use <strong>binary</strong> (base-2) because each switch can be
          <strong> on (1)</strong> or <strong>off (0)</strong>.  
        </p>
        <p>Binary place values double each time from right to left:</p>

        <ul className="bc-activity-list">
          <li>1</li>
          <li>2</li>
          <li>4</li>
          <li>8</li>
          <li>16</li>
          <li>32</li>
        </ul>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Activity: Convert to Denary</h2>

        <p>Convert this binary number into denary:</p>
        <p>
          <strong style={{ fontSize: "1.4rem" }}>101101₂</strong>
        </p>

        <input
          className="bc-input"
          placeholder="Enter the denary value"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button className="bc-button bc-button--small" onClick={checkAnswer}>
          Check answer
        </button>

        {result && (
          <p
            className={
              "bc-result " + (result.ok ? "bc-result--ok" : "bc-result--bad")
            }
          >
            {result.text}
          </p>
        )}
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Print / Save as PDF</h2>
        <p>Use the button below to print this activity or save as a PDF.</p>
        <button
          className="bc-button bc-button--secondary bc-button--small"
          onClick={() => window.print()}
        >
          Print worksheet / Save as PDF
        </button>
      </section>

      <footer className="bc-footer">
        Binary Basics – KS3 • You may print or use this page with your class.
      </footer>
    </main>
  );
}

export default BinaryBasics;
