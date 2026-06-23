"use client";

import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react';

interface VariableProximityProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  label?: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label = "",
    fromFontVariationSettings = "'wght' 400, 'opsz' 9",
    toFontVariationSettings = "'wght' 1000, 'opsz' 40",
    containerRef,
    radius = 500,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const FONT = "var(--font-roboto-flex), 'Roboto Flex', sans-serif";
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const parsedSettings = useMemo(() => {
    const parseSettings = (str: string) =>
      new Map(
        str.split(',').map(s => {
          const parts = s.trim().split(/\s+/);
          return [parts[0].replace(/['"]/g, ''), parseFloat(parts[1])];
        })
      );
    const from = parseSettings(fromFontVariationSettings);
    const to = parseSettings(toFontVariationSettings);
    return Array.from(from.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: to.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const getFalloff = useCallback((distance: number) => {
    const norm = Math.max(0, Math.min(1, 1 - distance / radius));
    if (falloff === 'exponential') return norm ** 2;
    if (falloff === 'gaussian') return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
    return norm; // linear
  }, [radius, falloff]);

  // Track mouse relative to the container
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef?.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        mouseMoved.current = true;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  // containerRef is a stable ref object — it's safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mouseMoved = useRef(false);
  const lastTickRef = useRef(0);

  // Single rAF loop — only recalculates when mouse has moved, throttled to ~30fps
  useEffect(() => {
    const tick = (timestamp: number) => {
      // Throttle to ~30fps
      if (timestamp - lastTickRef.current < 33) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTickRef.current = timestamp;

      if (!mouseMoved.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      mouseMoved.current = false;

      const { x, y } = mousePos.current;
      const container = containerRef?.current;
      if (container) {
        const cRect = container.getBoundingClientRect();
        letterRefs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2 - cRect.left;
          const cy = r.top + r.height / 2 - cRect.top;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const t = getFalloff(dist);
          const settings = parsedSettings
            .map(({ axis, fromValue, toValue }) =>
              `'${axis}' ${fromValue + (toValue - fromValue) * t}`
            )
            .join(', ');
          el.style.fontVariationSettings = settings;
          el.style.fontFamily = FONT;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const words = label.split(' ');
  let idx = 0;

  return (
    <span
      ref={ref}
      className={className}
      onClick={onClick}
      style={{
        display: 'block',
        whiteSpace: 'nowrap',
        fontFamily: FONT,
        fontWeight: 'normal',
        ...style,
      }}
      {...restProps}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((letter) => {
            const i = idx++;
            return (
              <span
                key={i}
                ref={(el) => { letterRefs.current[i] = el; }}
                style={{
                  display: 'inline-block',
                  fontFamily: FONT,
                  fontVariationSettings: fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {letter}
              </span>
            );
          })}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {label}
      </span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
