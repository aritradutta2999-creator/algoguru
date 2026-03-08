import { ContentSection } from "@/data/recursionContent";
import { CodeBlock } from "@/components/CodeBlock";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Parses simple markdown: **bold**, `code`, and regular text
 * into styled React elements.
 */
function renderMarkdown(text: string) {
  // Split by **bold** and `code` patterns
  const parts: React.ReactNode[] = [];
  // Regex: match **bold** or `code`
  const regex = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold** match
      parts.push(
        <span
          key={key++}
          className="font-bold px-1 py-0.5 rounded"
          style={{
            color: "hsl(var(--foreground))",
            background: "hsl(var(--primary)/0.08)",
          }}
        >
          {match[2]}
        </span>
      );
    } else if (match[4]) {
      // `code` match
      parts.push(
        <code
          key={key++}
          className="text-[13px] font-mono px-1.5 py-0.5 rounded"
          style={{
            background: "hsl(var(--muted))",
            color: "hsl(var(--primary))",
          }}
        >
          {match[4]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
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
}

export function ContentRenderer({ section }: ContentRendererProps) {
  return (
    <motion.div
      id={section.id}
      className="mb-16 scroll-mt-24"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
          {section.title}
        </h2>
        {section.difficulty && (
          <span className={cn("section-badge", difficultyClass[section.difficulty])}>
            {section.difficulty}
          </span>
        )}
      </div>

      {/* Complexity badges */}
      {(section.timeComplexity || section.spaceComplexity) && (
        <div className="flex flex-wrap gap-2.5 mb-6">
          {section.timeComplexity && (
            <div className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl font-mono"
              style={{ background: "hsl(var(--primary)/0.06)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.12)" }}>
              <span className="font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Time</span>
              <span className="font-bold">{section.timeComplexity}</span>
            </div>
          )}
          {section.spaceComplexity && (
            <div className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl font-mono"
              style={{ background: "hsl(var(--accent)/0.06)", color: "hsl(var(--accent))", border: "1px solid hsl(var(--accent)/0.12)" }}>
              <span className="font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>Space</span>
              <span className="font-bold">{section.spaceComplexity}</span>
            </div>
          )}
        </div>
      )}

      {/* Theory bullet points */}
      <ul className="space-y-3 mb-7">
        {section.theory.map((para, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] leading-[1.9] font-normal" style={{ color: "hsl(var(--muted-foreground))" }}>
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary)/0.5)" }} />
            <span>{renderMarkdown(para)}</span>
          </li>
        ))}
      </ul>

      {/* Key points */}
      {section.keyPoints && (
        <div className="highlight-box mb-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3 font-mono flex items-center gap-2"
            style={{ color: "hsl(var(--primary))" }}>
            <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]" style={{ background: "hsl(var(--primary)/0.1)" }}>★</span>
            Key Points
          </div>
          <ul className="space-y-2">
            {section.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-7" style={{ color: "hsl(var(--foreground)/0.85)" }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))" }} />
                {renderMarkdown(point)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Note */}
      {section.note && (
        <div className="highlight-box mb-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2 font-mono flex items-center gap-2"
            style={{ color: "hsl(var(--primary))" }}>
            <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]" style={{ background: "hsl(var(--primary)/0.1)" }}>💡</span>
            Note
          </div>
          <p className="text-[15px] leading-7" style={{ color: "hsl(var(--foreground)/0.85)" }}>{renderMarkdown(section.note)}</p>
        </div>
      )}

      {/* Tip */}
      {section.tip && (
        <div className="tip-box mb-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2 font-mono flex items-center gap-2"
            style={{ color: "hsl(var(--success))" }}>
            <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]" style={{ background: "hsl(var(--success)/0.1)" }}>✓</span>
            Pro Tip
          </div>
          <p className="text-[15px] leading-7" style={{ color: "hsl(var(--foreground)/0.85)" }}>{renderMarkdown(section.tip)}</p>
        </div>
      )}

      {/* Warning */}
      {section.warning && (
        <div className="warning-box mb-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2 font-mono flex items-center gap-2"
            style={{ color: "hsl(var(--accent))" }}>
            <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px]" style={{ background: "hsl(var(--accent)/0.1)" }}>⚠</span>
            Warning
          </div>
          <p className="text-[15px] leading-7" style={{ color: "hsl(var(--foreground)/0.85)" }}>{renderMarkdown(section.warning)}</p>
        </div>
      )}

      {/* Complexity table */}
      {section.table && (
        <div className="mb-6 overflow-x-auto rounded-2xl" style={{ border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-card)" }}>
          <table className="table-dark">
            <thead>
              <tr>
                {section.table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className={j === 0 ? "font-semibold font-mono text-xs" : "font-mono text-xs"}
                      style={{ color: j === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Code blocks */}
      {section.code?.map((block, i) => (
        <CodeBlock key={i} title={block.title} language={block.language} code={block.content} />
      ))}

      {/* Section divider */}
      <div className="section-divider mt-12" />
    </motion.div>
  );
}
