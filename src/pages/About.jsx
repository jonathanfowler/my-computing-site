// src/pages/About.jsx
import React from "react";

function About() {
  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">About FutureSkills Computing</h1>
        <p className="bc-header__subtitle">
          FutureSkills Computing is an independent collection of Computing
          learning resources designed for UK primary and secondary classrooms,
          with a particular focus on KS3 and lower KS4.
        </p>
        <span className="bc-header__badge">About this site</span>
      </header>

      <section className="bc-card">
        <h2 className="bc-card__title">Why this project exists</h2>
        <p>
          The project was created in response to ongoing changes in the
          direction of Computing education. While Computer Science remains an
          important part of the subject, schools are increasingly expected to
          develop pupils’ broader digital skills — including digital literacy,
          data understanding, AI awareness, and safe, responsible use of
          technology. These resources are designed to support that broader
          interpretation of Computing in a practical, classroom-friendly way.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">What this site provides</h2>
        <p>FutureSkills Computing offers:</p>
        <ul className="bc-activity-list">
          <li>Short, focused learning activities that can be used flexibly in lessons</li>
          <li>Interactive browser-based tasks with optional printable versions</li>
          <li>Clear explanations designed to minimise cognitive load</li>
          <li>
            Activities suitable for whole-class teaching, independent work, or
            retrieval practice
          </li>
        </ul>
        <p>
          The emphasis throughout is on clarity, accessibility, and real
          classroom use, rather than abstract theory or exam-specific training.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Who these resources are for</h2>
        <p>These resources are intended for:</p>
        <ul className="bc-activity-list">
          <li>Computing teachers working at KS1–KS4</li>
          <li>Non-specialist teachers delivering Computing at KS3</li>
          <li>
            Schools adapting schemes of work to reflect broader curriculum
            priorities
          </li>
        </ul>
        <p>
          They are particularly suited to classes where pupils may not all be
          following a traditional GCSE Computer Science pathway but still need
          a strong foundation in modern Computing concepts.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Design approach</h2>
        <p>All activities are designed with classroom constraints in mind:</p>
        <ul className="bc-activity-list">
          <li>No logins or accounts required</li>
          <li>Minimal setup</li>
          <li>Consistent structure across activities</li>
          <li>Printable versions that mirror on-screen content</li>
        </ul>
        <p>
          The aim is to reduce planning overhead for teachers while maintaining
          high-quality learning experiences for pupils.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">About the author</h2>
        <p>
          FutureSkills Computing is developed by an experienced UK secondary
          Computing educator with a background in curriculum design and
          classroom practice. The project draws on first-hand experience of
          teaching Computing in schools, as well as an awareness of current
          curriculum priorities and anticipated reforms within the subject.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Ongoing development</h2>
        <p>
          This is an evolving collection. Activities and units will continue to
          be refined and expanded based on classroom use, curriculum
          developments, and feedback from teachers.
        </p>
      </section>

      <footer className="bc-footer">
        Feedback from classroom use will shape future activities.
      </footer>
    </main>
  );
}

export default About;
