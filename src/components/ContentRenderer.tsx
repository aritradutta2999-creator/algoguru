import { ContentSection } from "@/data/recursionContent";
import { CodeBlock } from "@/components/CodeBlock";
import { DiagramRenderer } from "@/components/DiagramRenderer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Lightbulb, CheckCircle2, AlertTriangle, Clock, HardDrive, Sparkles } from "lucide-react";

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <span
          key={key++}
          className="inline-code-keyword"
        >
          {match[2]}
        </span>
      );
    } else if (match[4]) {
      parts.push(
        <code key={key++} className="inline-code-snippet">
          {match[4]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

const difficultyClass: Record<string, string> = {
  Easy: "difficulty-easy",
  Medium: "difficulty-medium",
  Hard: "difficulty-hard",
  Expert: "difficulty-expert",
};

interface ContentRendererProps {
  section: ContentSection;
  isPractice?: boolean;
}

export function ContentRenderer({ section, isPractice }: ContentRendererProps) {
  const navigate = useNavigate();

  const openInPlayground = () => {
    const problemData = {
      id: section.id,
      title: section.title,
      difficulty: section.difficulty,
      timeComplexity: section.timeComplexity,
      spaceComplexity: section.spaceComplexity,
      theory: section.theory,
      keyPoints: section.keyPoints,
      code: section.code,
    };
    localStorage.setItem("playground-practice-problem", JSON.stringify(problemData));
    navigate("/playground?practice=" + section.id);
  };

  return (
    <motion.div
      id={section.id}
      className="mb-20 scroll-mt-24"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Section Header ── */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <div className="flex items-center gap-3">
          <span className="section-title-bar" />
          <h2 className="section-title">{section.title}</h2>
        </div>
        {section.difficulty && (
          <span className={cn("section-badge", difficultyClass[section.difficulty])}>
            {section.difficulty}
          </span>
        )}
      </div>
      <div className="section-title-underline" />

      {/* ── Complexity Badges ── */}
      {(section.timeComplexity || section.spaceComplexity) && (
        <div className="flex flex-wrap gap-3 mb-8">
          {section.timeComplexity && (
            <div className="complexity-chip complexity-chip--time">
              <Clock size={13} strokeWidth={2.5} />
              <span className="complexity-chip-label">Time</span>
              <span className="complexity-chip-value">{section.timeComplexity}</span>
            </div>
          )}
          {section.spaceComplexity && (
            <div className="complexity-chip complexity-chip--space">
              <HardDrive size={13} strokeWidth={2.5} />
              <span className="complexity-chip-label">Space</span>
              <span className="complexity-chip-value">{section.spaceComplexity}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Theory ── */}
      <div className="theory-section">
        {section.theory.map((para, i) => (
          <p key={i} className="theory-paragraph">
            {renderMarkdown(para)}
          </p>
        ))}
      </div>

      {/* ── Diagram ── */}
      {section.diagram && <DiagramRenderer diagram={section.diagram} />}

      {/* ── Key Points ── */}
      {section.keyPoints && (
        <div className="keypoints-section">
          <div className="keypoints-section-header">
            <Sparkles size={14} />
            <span>Key Points</span>
            <div className="keypoints-section-line" />
          </div>
          <ul className="keypoints-list">
            {section.keyPoints.map((point, i) => (
              <li key={i} className="keypoints-list-item">
                <CheckCircle2
                  size={15}
                  className="flex-shrink-0 mt-[3px]"
                  style={{ color: "hsl(var(--primary))" }}
                />
                <span>{renderMarkdown(point)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Note ── */}
      {section.note && (
        <div className="callout-block callout-block--note">
          <div className="callout-block-bar callout-block-bar--note" />
          <div className="callout-block-inner">
            <div className="callout-block-head">
              <span className="callout-block-icon callout-block-icon--note">
                <Lightbulb size={14} />
              </span>
              <span className="callout-block-title" style={{ color: "hsl(var(--primary))" }}>Note</span>
            </div>
            <p className="callout-block-body">{renderMarkdown(section.note)}</p>
          </div>
        </div>
      )}

      {/* ── Tip ── */}
      {section.tip && (
        <div className="callout-block callout-block--tip">
          <div className="callout-block-bar callout-block-bar--tip" />
          <div className="callout-block-inner">
            <div className="callout-block-head">
              <span className="callout-block-icon callout-block-icon--tip">
                <CheckCircle2 size={14} />
              </span>
              <span className="callout-block-title" style={{ color: "hsl(var(--success))" }}>Pro Tip</span>
            </div>
            <p className="callout-block-body">{renderMarkdown(section.tip)}</p>
          </div>
        </div>
      )}

      {/* ── Warning ── */}
      {section.warning && (
        <div className="callout-block callout-block--warning">
          <div className="callout-block-bar callout-block-bar--warning" />
          <div className="callout-block-inner">
            <div className="callout-block-head">
              <span className="callout-block-icon callout-block-icon--warning">
                <AlertTriangle size={14} />
              </span>
              <span className="callout-block-title" style={{ color: "hsl(var(--accent))" }}>Warning</span>
            </div>
            <p className="callout-block-body">{renderMarkdown(section.warning)}</p>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      {section.table && (
        <div className="table-wrapper">
          <table className="table-premium">
            <thead>
              <tr>
                {section.table.headers.map((h) => (
                  <th key={h}>{renderMarkdown(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 ? "font-semibold" : ""}>
                      {renderMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Code Blocks ── */}
      {section.code?.map((block, i) => (
        <CodeBlock key={i} title={block.title} language={block.language} code={block.content} />
      ))}

      {/* ── Practice in Playground ── */}
      {isPractice && section.code && section.code.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openInPlayground}
          className="playground-btn"
        >
          <Play size={15} />
          Practice in Playground
        </motion.button>
      )}

      <div className="section-divider mt-14" />
    </motion.div>
  );
}
