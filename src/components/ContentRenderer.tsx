import { ContentSection } from "@/data/recursionContent";
import { CodeBlock } from "@/components/CodeBlock";
import { DiagramRenderer } from "@/components/DiagramRenderer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

function renderSuperscript(text: string): React.ReactNode {
  // Convert patterns like 2^n, n^2, 2^(n/2) into superscript
  const parts: React.ReactNode[] = [];
  const regex = /(\w+)\^(\([\w\/\+\-\*]+\)|\w+)/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    const sup = m[2].startsWith("(") ? m[2].slice(1, -1) : m[2];
    parts.push(<span key={k++}>{m[1]}<sup>{sup}</sup></span>);
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts.length > 1 ? parts : parts.length === 1 ? parts[0] : text;
}

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderSuperscript(text.slice(lastIndex, match.index)));
    }
    if (match[2]) {
      parts.push(
        <strong key={key++} className="cr-bold">{renderSuperscript(match[2])}</strong>
      );
    } else if (match[4]) {
      parts.push(
        <code key={key++} className="cr-code">{renderSuperscript(match[4])}</code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(renderSuperscript(text.slice(lastIndex)));
  }
  return parts.length > 0 ? parts : text;
}

const difficultyColor: Record<string, string> = {
  Easy: "hsl(var(--difficulty-easy))",
  Medium: "hsl(var(--difficulty-medium))",
  Hard: "hsl(var(--difficulty-hard))",
  Expert: "hsl(var(--difficulty-expert))",
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
      className="cr-section"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Title */}
      <h2 className="cr-title">{section.title}</h2>

      {/* Difficulty */}
      {section.difficulty && (
        <span
          className="cr-difficulty"
          style={{ color: difficultyColor[section.difficulty] }}
        >
          {section.difficulty}
        </span>
      )}

      {/* Complexity */}
      {(section.timeComplexity || section.spaceComplexity) && (
        <p className="cr-complexity">
          {section.timeComplexity && <>Time: {renderSuperscript(section.timeComplexity)}</>}
          {section.timeComplexity && section.spaceComplexity && <span className="cr-sep">·</span>}
          {section.spaceComplexity && <>Space: {renderSuperscript(section.spaceComplexity)}</>}
        </p>
      )}

      {/* Theory — bullet points */}
      <ul className="cr-list">
        {section.theory.map((para, i) => (
          <li key={i}>{renderMarkdown(para)}</li>
        ))}
      </ul>

      {/* Diagram */}
      {section.diagram && <DiagramRenderer diagram={section.diagram} />}

      {/* Key Points — simple bullet list */}
      {section.keyPoints && (
        <div className="cr-keypoints">
          <h3 className="cr-subtitle">Key Points:</h3>
          <ul className="cr-list">
            {section.keyPoints.map((point, i) => (
              <li key={i}>{renderMarkdown(point)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Note */}
      {section.note && (
        <div className="cr-keypoints">
          <h3 className="cr-subtitle">Note:</h3>
          <p className="cr-para">{renderMarkdown(section.note)}</p>
        </div>
      )}

      {/* Tip */}
      {section.tip && (
        <div className="cr-keypoints">
          <h3 className="cr-subtitle">Pro Tip:</h3>
          <p className="cr-para">{renderMarkdown(section.tip)}</p>
        </div>
      )}

      {/* Warning */}
      {section.warning && (
        <div className="cr-keypoints">
          <h3 className="cr-subtitle">⚠ Warning:</h3>
          <p className="cr-para">{renderMarkdown(section.warning)}</p>
        </div>
      )}

      {/* Table */}
      {section.table && (
        <div className="cr-table-wrap">
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
                    <td key={j}>{renderMarkdown(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Code Blocks */}
      {section.code?.map((block, i) => (
        <CodeBlock key={i} title={block.title} language={block.language} code={block.content} />
      ))}

      {/* Practice in Playground */}
      {isPractice && section.code && section.code.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openInPlayground}
          className="cr-playground-btn"
        >
          <Play size={15} />
          Practice in Playground
        </motion.button>
      )}

      <hr className="cr-divider" />
    </motion.div>
  );
}
