import { ContentSection } from "@/data/recursionContent";
import { CodeBlock } from "@/components/CodeBlock";
import { DiagramRenderer } from "@/components/DiagramRenderer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, BookOpen, Star, Lightbulb, CheckCircle, AlertTriangle, Clock, HardDrive } from "lucide-react";

/**
 * Parses simple markdown: **bold**, `code`, and regular text
 * into styled React elements with premium readability.
 */
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
          className="font-semibold px-1.5 py-0.5 rounded-md mx-0.5 inline-block"
          style={{
            color: "hsl(var(--foreground))",
            background: "hsl(var(--primary)/0.1)",
            border: "1px solid hsl(var(--primary)/0.15)",
            lineHeight: "1.6",
          }}
        >
          {match[2]}
        </span>
      );
    } else if (match[4]) {
      parts.push(
        <code
          key={key++}
          className="text-[12.5px] font-mono font-medium px-1.5 py-[3px] rounded-md mx-0.5"
          style={{
            background: "hsl(var(--muted))",
            color: "hsl(var(--primary))",
            border: "1px solid hsl(var(--border))",
          }}
        >
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
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span
            className="w-1 h-7 rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
          <h2
            className="text-2xl md:text-[28px] font-extrabold tracking-tight leading-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {section.title}
          </h2>
        </div>
        {section.difficulty && (
          <span className={cn("section-badge difficulty-badge-glow", difficultyClass[section.difficulty])}>
            {section.difficulty}
          </span>
        )}
      </div>
      {/* Gradient underline */}
      <div
        className="h-[2px] rounded-full mb-7"
        style={{
          width: "80px",
          background: "var(--gradient-primary)",
          marginLeft: "16px",
          opacity: 0.6,
        }}
      />

      {/* ── Complexity Badges ── */}
      {(section.timeComplexity || section.spaceComplexity) && (
        <div className="flex flex-wrap gap-3 mb-7">
          {section.timeComplexity && (
            <div
              className="flex items-center gap-2.5 text-xs px-4 py-2.5 rounded-xl font-mono"
              style={{
                background: "hsl(var(--primary)/0.08)",
                color: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary)/0.15)",
                boxShadow: "0 2px 8px hsl(var(--primary)/0.06)",
              }}
            >
              <Clock size={13} strokeWidth={2.5} />
              <span className="font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Time</span>
              <span className="font-bold">{section.timeComplexity}</span>
            </div>
          )}
          {section.spaceComplexity && (
            <div
              className="flex items-center gap-2.5 text-xs px-4 py-2.5 rounded-xl font-mono"
              style={{
                background: "hsl(var(--accent)/0.08)",
                color: "hsl(var(--accent))",
                border: "1px solid hsl(var(--accent)/0.15)",
                boxShadow: "0 2px 8px hsl(var(--accent)/0.06)",
              }}
            >
              <HardDrive size={13} strokeWidth={2.5} />
              <span className="font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Space</span>
              <span className="font-bold">{section.spaceComplexity}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Theory Block ── */}
      <div className="theory-block mb-8">
        <div className="theory-block-header">
          <BookOpen size={15} />
          <span>Understanding the Concept</span>
        </div>
        <div className="space-y-1">
          {section.theory.map((para, i) => (
            <div key={i} className="theory-step">
              <span className="theory-step-number">{String(i + 1).padStart(2, "0")}</span>
              <span className="theory-step-text">{renderMarkdown(para)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Diagram ── */}
      {section.diagram && <DiagramRenderer diagram={section.diagram} />}

      {/* ── Key Points ── */}
      {section.keyPoints && (
        <div className="keypoints-block mb-7">
          <div className="keypoints-header">
            <Star size={14} />
            <span>Key Points</span>
            <div className="keypoints-header-line" />
          </div>
          <ul className="space-y-1.5">
            {section.keyPoints.map((point, i) => (
              <li
                key={i}
                className="keypoints-item"
                style={{
                  background: i % 2 === 0 ? "hsl(var(--primary)/0.03)" : "transparent",
                }}
              >
                <CheckCircle size={14} className="flex-shrink-0 mt-[3px]" style={{ color: "hsl(var(--primary))" }} />
                <span>{renderMarkdown(point)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Note ── */}
      {section.note && (
        <div className="info-block info-block--note mb-7">
          <div className="info-block-accent info-block-accent--note" />
          <div className="info-block-header">
            <span className="info-block-icon info-block-icon--note">
              <Lightbulb size={14} />
            </span>
            <span className="info-block-label" style={{ color: "hsl(var(--primary))" }}>Note</span>
          </div>
          <p className="info-block-text">{renderMarkdown(section.note)}</p>
        </div>
      )}

      {/* ── Tip ── */}
      {section.tip && (
        <div className="info-block info-block--tip mb-7">
          <div className="info-block-accent info-block-accent--tip" />
          <div className="info-block-header">
            <span className="info-block-icon info-block-icon--tip">
              <CheckCircle size={14} />
            </span>
            <span className="info-block-label" style={{ color: "hsl(var(--success))" }}>Pro Tip</span>
          </div>
          <p className="info-block-text">{renderMarkdown(section.tip)}</p>
        </div>
      )}

      {/* ── Warning ── */}
      {section.warning && (
        <div className="info-block info-block--warning mb-7">
          <div className="info-block-accent info-block-accent--warning" />
          <div className="info-block-header">
            <span className="info-block-icon info-block-icon--warning">
              <AlertTriangle size={14} />
            </span>
            <span className="info-block-label" style={{ color: "hsl(var(--accent))" }}>Warning</span>
          </div>
          <p className="info-block-text">{renderMarkdown(section.warning)}</p>
        </div>
      )}

      {/* ── Table ── */}
      {section.table && (
        <div
          className="mb-7 overflow-x-auto rounded-2xl"
          style={{
            border: "1px solid hsl(var(--border))",
            boxShadow: "var(--shadow-card)",
          }}
        >
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
                    <td
                      key={j}
                      className={j === 0 ? "font-semibold font-mono text-xs" : "font-mono text-xs"}
                      style={{
                        color: j === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                      }}
                    >
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
          className="flex items-center gap-2 mt-6 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200"
          style={{
            background: "hsl(var(--success)/0.1)",
            color: "hsl(var(--success))",
            border: "1px solid hsl(var(--success)/0.2)",
          }}
        >
          <Play size={15} />
          Practice in Playground
        </motion.button>
      )}

      {/* Section divider */}
      <div className="section-divider mt-14" />
    </motion.div>
  );
}
