// src/pages/ForTeachers.jsx
import React from "react";

function ForTeachers() {
  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">Using These Resources in Class</h1>
        <p className="bc-header__subtitle">
          A quick guide for Computing teachers on how to use the interactive
          activities and printable versions.
        </p>
        <span className="bc-header__badge">For teachers</span>
      </header>

      <section className="bc-card">
        <h2 className="bc-card__title">Interactive activities</h2>
        <ul className="bc-activity-list">
          <li>Open activities directly in a browser – no logins required.</li>
          <li>
            Use them on a projector / board for whole-class discussion, or let
            pupils work individually on devices.
          </li>
          <li>
            Most activities include self-checking questions so pupils get
            immediate feedback.
          </li>
        </ul>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Printable / PDF versions</h2>
        <ul className="bc-activity-list">
          <li>Each activity includes a “Print / Save as PDF” button.</li>
          <li>
            Use the browser&apos;s Print dialog to create a PDF or paper copies.
          </li>
          <li>
            Printed versions mirror the on-screen content so you can mix online
            and offline work.
          </li>
        </ul>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Curriculum alignment</h2>
        <p>
          The focus is on core skills likely to be emphasised in the refreshed
          Computing curriculum: AI literacy, data, programming fundamentals,
          digital literacy and safe technology use.
        </p>
        <p>
          You can use the activities as starters, main tasks, retrieval
          practice, or homework – whatever fits your scheme of work.
        </p>
      </section>

      <footer className="bc-footer">
        This is an evolving collection. Feedback from classroom use will shape
        future activities.
      </footer>
    </main>
  );
}

export default ForTeachers;
