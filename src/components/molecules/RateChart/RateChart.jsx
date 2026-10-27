import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './RateChart.module.css';
import { formatRate, formatShortDate, formatDate } from '../../../utils/formatters';

const TABLET_QUERY = '(min-width: 768px)';
const DESKTOP_QUERY = '(min-width: 1024px)';

/*
 * O SVG usa 1 unidade = 1px (largura medida do container), então as
 * espessuras e os tamanhos de fonte do spec não são escalados.
 */
const LAYOUTS = {
  mobile: {
    height: 280,
    pad: { top: 20, right: 12, bottom: 44, left: 44 },
    labelCount: 3,
    tipWidth: 112,
    tipHeight: 50,
  },
  tablet: {
    height: 320,
    pad: { top: 24, right: 20, bottom: 48, left: 56 },
    labelCount: 4,
    tipWidth: 126,
    tipHeight: 52,
  },
  desktop: {
    height: 360,
    pad: { top: 24, right: 24, bottom: 48, left: 62 },
    labelCount: 5,
    tipWidth: 130,
    tipHeight: 52,
  },
};

function currentLayout() {
  if (typeof window === 'undefined') return 'desktop';
  if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop';
  if (window.matchMedia(TABLET_QUERY).matches) return 'tablet';
  return 'mobile';
}

function useChartLayout() {
  const [layout, setLayout] = useState(currentLayout);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const tablet = window.matchMedia(TABLET_QUERY);

    const update = () => {
      if (desktop.matches) setLayout('desktop');
      else if (tablet.matches) setLayout('tablet');
      else setLayout('mobile');
    };

    desktop.addEventListener('change', update);
    tablet.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);

  return LAYOUTS[layout];
}

function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const update = () => setWidth(element.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

function RateChart({ data = [], from, to, language = 'PT', labels }) {
  const { height, pad, labelCount, tipWidth, tipHeight } = useChartLayout();
  const [chartRef, width] = useContainerWidth();

  const points = useMemo(
    () =>
      [...data]
        .filter((point) => Number.isFinite(Number(point.rate)))
        .sort((a, b) => String(a.date).localeCompare(String(b.date))),
    [data],
  );

  const geometry = useMemo(() => {
    if (points.length === 0 || width < 160) return null;

    const values = points.map((point) => Number(point.rate));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || Math.abs(max) * 0.01 || 1;
    const low = min - span * 0.12;
    const high = max + span * 0.12;

    const plotWidth = width - pad.left - pad.right;
    const plotHeight = height - pad.top - pad.bottom;

    const xAt = (index) =>
      points.length === 1
        ? pad.left + plotWidth / 2
        : pad.left + (index / (points.length - 1)) * plotWidth;
    const yAt = (value) => pad.top + (1 - (value - low) / (high - low)) * plotHeight;

    const coords = points.map((point, index) => ({
      x: xAt(index),
      y: yAt(Number(point.rate)),
      date: point.date,
      rate: Number(point.rate),
    }));

    const baseY = pad.top + plotHeight;
    const line = coords.map((coord) => `${coord.x},${coord.y}`).join(' ');
    const area = `${coords[0].x},${baseY} ${line} ${coords[coords.length - 1].x},${baseY}`;

    const ticks = [0, 1, 2, 3].map((index) => {
      const value = high - (index / 3) * (high - low);
      return { y: yAt(value), label: formatRate(value, language, 2, 2) };
    });

    const indexes = [
      ...new Set(
        Array.from({ length: labelCount }, (_, index) =>
          Math.round((index * (points.length - 1)) / (labelCount - 1)),
        ),
      ),
    ];

    const xLabels = indexes.map((index) => ({
      x: xAt(index),
      label: formatShortDate(points[index].date, language),
      anchor: index === 0 ? 'start' : index === points.length - 1 ? 'end' : 'middle',
    }));

    return { coords, line, area, baseY, ticks, xLabels };
  }, [points, width, height, pad, labelCount, language]);

  const last = geometry?.coords[geometry.coords.length - 1];

  let tipX = 0;
  let tipY = 0;
  if (geometry && last) {
    tipX = last.x - tipWidth - 14;
    if (tipX < pad.left) tipX = last.x + 14;
    if (tipX + tipWidth > width - pad.right) tipX = width - pad.right - tipWidth;

    tipY = last.y - tipHeight - 18;
    if (tipY < pad.top) tipY = last.y + 18;
  }

  const firstRate = geometry ? formatRate(geometry.coords[0].rate, language) : '--';
  const lastRate = last ? formatRate(last.rate, language) : '--';
  const description = labels?.chartLabel
    ? labels.chartLabel(from, to, firstRate, lastRate)
    : `Gráfico de linha da cotação ${from} para ${to}, de ${firstRate} para ${lastRate}.`;

  return (
    <div ref={chartRef} className={styles.chart}>
      {geometry && last && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className={styles.svg}
          role="img"
          aria-label={description}
        >
          <g className={styles.gridLine}>
            {geometry.ticks.map((tick) => (
              <line
                key={`grid-${tick.label}`}
                x1={pad.left}
                y1={tick.y}
                x2={width - pad.right}
                y2={tick.y}
              />
            ))}
          </g>

          <g className={styles.axisText}>
            {geometry.ticks.map((tick) => (
              <text key={`y-${tick.label}`} x={pad.left - 10} y={tick.y + 5} textAnchor="end">
                {tick.label}
              </text>
            ))}
            {geometry.xLabels.map((label) => (
              <text
                key={`x-${label.label}`}
                x={label.x}
                y={height - pad.bottom + 24}
                textAnchor={label.anchor}
              >
                {label.label}
              </text>
            ))}
          </g>

          <polygon className={styles.area} points={geometry.area} />
          <polyline className={styles.line} points={geometry.line} />

          <line
            className={styles.markerLine}
            x1={last.x}
            y1={pad.top}
            x2={last.x}
            y2={geometry.baseY}
          />
          <circle className={styles.marker} cx={last.x} cy={last.y} r="6" />

          <g>
            <rect
              className={styles.tooltipBox}
              x={tipX}
              y={tipY}
              width={tipWidth}
              height={tipHeight}
              rx="10"
            />
            <text className={styles.tooltipDate} x={tipX + 12} y={tipY + 22}>
              {formatDate(last.date, language)}
            </text>
            <text className={styles.tooltipValue} x={tipX + 12} y={tipY + 42}>
              {formatRate(last.rate, language)}
            </text>
          </g>
        </svg>
      )}
    </div>
  );
}

export default RateChart;
