// Reusable slide templates: each slide in src/slides/ is a small component passing its content to one of these.
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { BODY_START, fadeUp, itemStart, progress } from './animation';
import { Badge, type Status } from './Badge';
import { SlideLayout } from './SlideLayout';
import { fr } from './typography';

type Common = {
  kicker: string;
  title: string;
  status?: Status[];
  footer?: string;
};

// Every template numbers its body groups from 0 (see the click steps in animation.ts):
// item, row, step, card or term `i` is group `i`, and the footer is the group right after the last one.

// --- Bullets -----------------------------------------------------------------

type BulletsSlideProps = Common & {
  items: string[];
};

export const BulletsSlide: React.FC<BulletsSlideProps> = ({ items, ...common }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout {...common} footerDelay={itemStart(items.length)}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 30 }}>
        {items.map((item, index) => (
          <li
            key={item}
            style={{ display: 'flex', gap: 28, fontSize: 40, lineHeight: 1.3, ...fadeUp(frame, itemStart(index)) }}
          >
            <span style={{ flex: 'none', width: 14, height: 14, marginTop: 20, borderRadius: 3, backgroundColor: COLORS.accent }} />
            <span>{fr(item)}</span>
          </li>
        ))}
      </ul>
    </SlideLayout>
  );
};

// --- Table -------------------------------------------------------------------

export type Cell = string | { status: Status[] };

type TableSlideProps = Common & {
  columns: string[];
  /** CSS grid-template-columns value. */
  widths: string;
  rows: Cell[][];
  fontSize?: number;
  /** Index of a row to emphasize. */
  highlightRow?: number;
};

export const TableSlide: React.FC<TableSlideProps> = ({ columns, widths, rows, fontSize = 32, highlightRow, ...common }) => {
  const frame = useCurrentFrame();

  const renderCell = (cell: Cell) =>
    typeof cell === 'string' ? (
      fr(cell)
    ) : (
      <span style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {cell.status.map((item) => (
          <Badge key={item.label} kind={item.kind}>
            {fr(item.label)}
          </Badge>
        ))}
      </span>
    );

  return (
    <SlideLayout {...common} footerDelay={itemStart(rows.length)}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: widths,
          fontSize: 24,
          fontWeight: 600,
          color: COLORS.muted,
          textTransform: 'uppercase',
          letterSpacing: 2,
          borderBottom: `2px solid ${COLORS.border}`,
          ...fadeUp(frame, BODY_START - 4),
        }}
      >
        {columns.map((column, index) => (
          <div key={index} style={{ padding: '0 20px 14px' }}>
            {fr(column)}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'grid',
            gridTemplateColumns: widths,
            alignItems: 'center',
            borderBottom: `1px solid ${COLORS.border}`,
            backgroundColor: rowIndex === highlightRow ? COLORS.surface : undefined,
            ...fadeUp(frame, itemStart(rowIndex)),
          }}
        >
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              style={{ padding: '22px 20px', fontSize, lineHeight: 1.3, fontWeight: cellIndex === 0 ? 700 : 400 }}
            >
              {renderCell(cell)}
            </div>
          ))}
        </div>
      ))}
    </SlideLayout>
  );
};

// --- Steps -------------------------------------------------------------------

export type Step = { label: string; text?: string; sub?: string; highlight?: boolean };

type StepsSlideProps = Common & {
  steps: Step[];
  /** Show numbers in the markers (otherwise plain dots, e.g. for a timeline). */
  numbered?: boolean;
};

const STEP_GAP = 40;

export const StepsSlide: React.FC<StepsSlideProps> = ({ steps, numbered = true, ...common }) => {
  const frame = useCurrentFrame();
  const marker = 56;

  return (
    <SlideLayout {...common} footerDelay={itemStart(steps.length)}>
      <div style={{ marginTop: 60 }}>
        <div style={{ display: 'flex', gap: STEP_GAP }}>
          {steps.map((step, index) => (
            <div key={step.label} style={{ position: 'relative', flex: 1, ...fadeUp(frame, itemStart(index)) }}>
              {index < steps.length - 1 && (
                // Connector from this marker to the next one, drawn while the next step enters
                <div
                  style={{
                    position: 'absolute',
                    top: marker / 2 - 2,
                    left: marker,
                    height: 4,
                    width: `calc((100% + ${STEP_GAP - marker}px) * ${progress(frame, itemStart(index + 1))})`,
                    backgroundColor: COLORS.border,
                  }}
                />
              )}
              <div
                style={{
                  position: 'relative',
                  width: marker,
                  height: marker,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 28,
                  fontWeight: 700,
                  backgroundColor: step.highlight ? COLORS.accent : COLORS.background,
                  color: step.highlight ? COLORS.background : COLORS.foreground,
                  border: `4px solid ${step.highlight ? COLORS.accent : COLORS.muted}`,
                }}
              >
                {numbered ? index + 1 : ''}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  marginTop: 28,
                  lineHeight: 1.2,
                  color: step.highlight ? COLORS.accent : COLORS.foreground,
                }}
              >
                {fr(step.label)}
              </div>
              {step.text && <div style={{ fontSize: 30, lineHeight: 1.35, marginTop: 14 }}>{fr(step.text)}</div>}
              {step.sub && <div style={{ fontSize: 26, marginTop: 12, color: COLORS.muted }}>{fr(step.sub)}</div>}
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
};

// --- Compare (cards side by side) ---------------------------------------------

export type Card = {
  title: string;
  /** Large figure shown under the title. */
  value?: string;
  /** Plain line under the value, without a bullet. */
  caption?: string;
  items?: string[];
  status?: Status[];
  highlight?: boolean;
};

type CompareSlideProps = Common & {
  cards: Card[];
};

export const CompareSlide: React.FC<CompareSlideProps> = ({ cards, ...common }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout {...common} footerDelay={itemStart(cards.length)}>
      <div style={{ display: 'flex', gap: 40, alignItems: 'stretch' }}>
        {cards.map((card, index) => (
          <div
            key={card.title}
            style={{
              flex: 1,
              padding: '36px 40px',
              borderRadius: 16,
              backgroundColor: COLORS.surface,
              border: `3px solid ${card.highlight ? COLORS.accent : 'transparent'}`,
              ...fadeUp(frame, itemStart(index)),
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: card.highlight ? COLORS.accent : COLORS.foreground }}>
                {fr(card.title)}
              </span>
              {card.status?.map((item) => (
                <Badge key={item.label} kind={item.kind}>
                  {fr(item.label)}
                </Badge>
              ))}
            </div>
            {card.value && <div style={{ fontSize: 72, fontWeight: 800, marginTop: 20 }}>{fr(card.value)}</div>}
            {card.caption && <div style={{ fontSize: 32, marginTop: 12, color: COLORS.muted }}>{fr(card.caption)}</div>}
            {card.items && (
              <ul style={{ margin: '24px 0 0', padding: '0 0 0 36px', fontSize: 32, lineHeight: 1.4 }}>
                {card.items.map((item) => (
                  <li key={item} style={{ marginBottom: 10 }}>
                    {fr(item)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </SlideLayout>
  );
};

// --- Key figure ----------------------------------------------------------------

type KeyFigureSlideProps = Common & {
  figure: string;
  caption: string;
};

export const KeyFigureSlide: React.FC<KeyFigureSlideProps> = ({ figure, caption, ...common }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout {...common} footerDelay={itemStart(1)}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            fontSize: 200,
            fontWeight: 800,
            color: COLORS.accent,
            lineHeight: 1,
            opacity: progress(frame, BODY_START, 20),
            scale: `${0.8 + 0.2 * progress(frame, BODY_START, 20)}`,
            transformOrigin: 'left center',
          }}
        >
          {fr(figure)}
        </div>
        <div style={{ fontSize: 44, marginTop: 32, lineHeight: 1.3, ...fadeUp(frame, BODY_START + 10) }}>{fr(caption)}</div>
      </div>
    </SlideLayout>
  );
};

// --- Goal, pitfall, lesson ---------------------------------------------------

type TrioSlideProps = {
  kicker: string;
  goal: string;
  pitfall: string;
  lesson: string;
};

export const TrioSlide: React.FC<TrioSlideProps> = ({ kicker, goal, pitfall, lesson }) => {
  const frame = useCurrentFrame();
  const parts = [
    { label: "Ce qu'on voulait faire", text: goal },
    { label: 'Le piège', text: pitfall },
    { label: "Ce qu'on en retient", text: lesson, highlight: true },
  ];

  return (
    <SlideLayout kicker={kicker} title="Objectif, piège, leçon">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {parts.map((part, index) => (
          <div
            key={part.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '420px 1fr',
              alignItems: 'center',
              gap: 40,
              padding: '28px 40px',
              borderRadius: 16,
              backgroundColor: part.highlight ? COLORS.accent : COLORS.surface,
              color: part.highlight ? COLORS.background : COLORS.foreground,
              ...fadeUp(frame, itemStart(index)),
            }}
          >
            <span style={{ fontSize: 30, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2 }}>{fr(part.label)}</span>
            <span style={{ fontSize: 38, lineHeight: 1.35, fontWeight: part.highlight ? 700 : 400 }}>{fr(part.text)}</span>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
};


// --- Statement (full-screen sentences) -------------------------------------------

type StatementSlideProps = {
  kicker?: string;
  lines: { text: string; emphasis?: boolean }[];
};

export const StatementSlide: React.FC<StatementSlideProps> = ({ kicker, lines }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.foreground,
        fontFamily: FONT_FAMILY,
        justifyContent: 'center',
        padding: 160,
      }}
    >
      {kicker && (
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: COLORS.accent,
            marginBottom: 48,
            ...fadeUp(frame, 0),
          }}
        >
          {fr(kicker)}
        </div>
      )}
      {lines.map((line, index) => (
        <p
          key={line.text}
          style={{
            fontSize: line.emphasis ? 76 : 60,
            fontWeight: line.emphasis ? 800 : 400,
            color: line.emphasis ? COLORS.accent : COLORS.foreground,
            lineHeight: 1.25,
            margin: index === 0 ? 0 : '40px 0 0',
            ...fadeUp(frame, itemStart(index)),
          }}
        >
          {fr(line.text)}
        </p>
      ))}
    </AbsoluteFill>
  );
};


// --- Glossary ------------------------------------------------------------------

type GlossarySlideProps = Common & {
  terms: { term: string; definition: string }[];
};

export const GlossarySlide: React.FC<GlossarySlideProps> = ({ terms, ...common }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout {...common}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: -16 }}>
        {terms.map((item, index) => (
          <div
            key={item.term}
            style={{
              display: 'grid',
              gridTemplateColumns: '440px 1fr',
              gap: 40,
              alignItems: 'baseline',
              paddingBottom: 18,
              borderBottom: `1px solid ${COLORS.border}`,
              ...fadeUp(frame, itemStart(index)),
            }}
          >
            <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.accent }}>{fr(item.term)}</span>
            <span style={{ fontSize: 32, lineHeight: 1.3 }}>{fr(item.definition)}</span>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
};
