import styles from './RateChart.module.css';

function RateChart({ data = [], from, to }) {
  // Simple mock visualization
  const maxRate = data.length ? Math.max(...data.map(d => d.rate)) : 1;
  const minRate = data.length ? Math.min(...data.map(d => d.rate)) : 0;
  
  return (
    <div className={styles.chart}>
      <div className={styles.header}>Evolução {from} → {to} ({data.length} pontos)</div>
      <div className={styles.svgContainer}>
        <svg viewBox="0 0 100 40" className={styles.svg}>
          {data.length > 1 && data.map((point, idx) => {
            if (idx === 0) return null;
            const prev = data[idx - 1];
            const x1 = ((idx - 1) / (data.length - 1)) * 100;
            const x2 = (idx / (data.length - 1)) * 100;
            const y1 = 40 - ((prev.rate - minRate) / (maxRate - minRate || 1)) * 35;
            const y2 = 40 - ((point.rate - minRate) / (maxRate - minRate || 1)) * 35;
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#2563EB"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>
      <div className={styles.labels}>
        {data.slice(0, 4).map((d, i) => (
          <span key={i}>{d.date}</span>
        ))}
      </div>
    </div>
  );
}

export default RateChart;
