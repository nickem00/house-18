import React from 'react';

// src/components/Admin/Statscard.jsx
export default function StatsCard({ title, value }) {
  return (
    <section className="stats-card">
      <article className="stats-value">{value}</article>
      <article className="stats-title">{title}</article>
    </section>
  );
}

