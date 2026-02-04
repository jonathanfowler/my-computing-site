// src/pages/ForTeachers.jsx
import React from "react";

function ForTeachers() {
  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">Using These Resources in Class</h1>
        <p className="bc-header__subtitle">
          <strong>
            A practical guide for Computing teachers working with a changing
            curriculum.
          </strong>
        </p>
        <p className="bc-header__subtitle">
          UK Computing education is entering a period of transition. Alongside
          traditional Computer Science topics, there is increasing emphasis on
          digital literacy, data understanding, AI awareness and safe, ethical
          use of technology. These resources are designed to support that shift
          by providing clear, classroom-ready activities that strengthen core
          Computing foundations without adding unnecessary complexity for
          teachers.
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
          <li>
            Each activity includes a <strong>Print / Save as PDF</strong>{" "}
            option.
          </li>
          <li>
            Use the browser&apos;s print dialog to create PDFs or paper copies.
          </li>
          <li>
            Printed versions mirror the on-screen content, allowing you to mix
            online and offline work within the same lesson.
          </li>
        </ul>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Curriculum alignment</h2>
        <p>
          The activities focus on core areas likely to be emphasised in the
          refreshed Computing curriculum, including:
        </p>
        <ul className="bc-activity-list">
          <li>AI literacy</li>
          <li>Data and information</li>
          <li>Programming fundamentals</li>
          <li>Digital literacy</li>
          <li>Safe and responsible technology use</li>
        </ul>
        <p>
          Activities are designed to slot easily into existing schemes of work
          and can be used as starters, main tasks, retrieval practice or
          homework, depending on lesson structure and pupil needs.
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

