import React from 'react';

export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="stats-card">
      <div className="stats-value">{value}</div>
      <div className="stats-title">{title}</div>
      {subtitle && <div className="stats-subtitle">{subtitle}</div>}
    </div>
  );
}
