// src/pages/About.jsx
import React from "react";

function About() {
  return (
    <main className="bc-page">
      <header className="bc-header">
        <h1 className="bc-header__title">About FutureSkills Computing</h1>
        <p className="bc-header__subtitle">
          A small, independent project focused on practical, classroom-ready
          Computing resources for UK schools.
        </p>
        <span className="bc-header__badge">About this site</span>
      </header>

      <section className="bc-card">
        <h2 className="bc-card__title">What this site is</h2>
        <p>
          FutureSkills Computing is a work-in-progress collection of interactive
          activities and printable resources for KS3 & KS4 Computing and
          digital literacy. The emphasis is on clarity, low cognitive load and
          skills that prepare students for the next phase of Computing
          education.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">Why it exists</h2>
        <p>
          There is a growing need for resources that reflect how Computing is
          changing: AI literacy, safe and ethical use of technology, data
          literacy and practical digital skills alongside traditional topics
          like programming and binary.
        </p>
        <p>
          The aim is to create resources that slot easily into real schemes of
          work without adding unnecessary complexity for teachers.
        </p>
      </section>

      <section className="bc-card">
        <h2 className="bc-card__title">What&apos;s next</h2>
        <p>
          New activities will be added gradually, starting with AI literacy and
          binary, then expanding into topics such as cybersecurity, logic,
          Python basics and digital citizenship.
        </p>
        <p>
          Over time, the goal is to offer a coherent set of units that can
          support the evolving Computing curriculum in the UK.
        </p>
      </section>

      <footer className="bc-footer">
        This site is in an early prototype phase. Content and structure may
        evolve as more feedback and curriculum guidance becomes available.
      </footer>
    </main>
  );
}

export default About;
