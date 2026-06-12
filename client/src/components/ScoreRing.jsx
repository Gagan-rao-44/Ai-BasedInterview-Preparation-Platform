function getGrade(score) {
  if (score >= 80) return { label: "Excellent", className: "grade-excellent" };
  if (score >= 60) return { label: "Good", className: "grade-good" };
  if (score >= 40) return { label: "Average", className: "grade-average" };
  return { label: "Needs Improvement", className: "grade-poor" };
}

function ScoreRing({ score = 0, size = 180 }) {
  const radius = 72;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const grade = getGrade(score);

  return (
    <div className="score-ring-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="score-ring-svg">
        <circle
          className="score-ring-bg"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`score-ring-fill ${grade.className}`}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="score-ring-content">
        <span className="score-ring-value">{score}%</span>
        <span className={`score-ring-grade ${grade.className}`}>{grade.label}</span>
      </div>
    </div>
  );
}

export default ScoreRing;
