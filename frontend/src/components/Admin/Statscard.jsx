import React from 'react';

// src/components/Admin/Statscard.jsx
export default function StatsCard({ title, value }) {
  return (
    <div className="stats-card">
      <div className="stats-value">{value}</div>
      <div className="stats-title">{title}</div>
    </div>
  );
}

