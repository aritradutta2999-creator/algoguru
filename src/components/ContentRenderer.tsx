import { ContentSection } from "@/data/recursionContent";
import { CodeBlock } from "@/components/CodeBlock";
import { cn } from "@/lib/utils";

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
    <div id={section.id} className="mb-14 scroll-mt-20 animate-fade-in">
      {/* Section header */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
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
        <div className="flex flex-wrap gap-2 mb-5">
          {section.timeComplexity && (
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-mono"
              style={{ background: "hsl(var(--primary)/0.08)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary)/0.2)" }}>
              <span style={{ color: "hsl(var(--muted-foreground))" }}>Time:</span>
              <span className="font-semibold">{section.timeComplexity}</span>
            </div>
          )}
          {section.spaceComplexity && (
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-mono"
              style={{ background: "hsl(var(--accent)/0.08)", color: "hsl(var(--accent))", border: "1px solid hsl(var(--accent)/0.2)" }}>
              <span style={{ color: "hsl(var(--muted-foreground))" }}>Space:</span>
              <span className="font-semibold">{section.spaceComplexity}</span>
            </div>
          )}
        </div>
      )}

      {/* Theory paragraphs */}
      <div className="space-y-3 mb-5">
        {section.theory.map((para, i) => (
          <p key={i} className="text-sm leading-7" style={{ color: "hsl(var(--muted-foreground))" }}>
            {para}
          </p>
        ))}
      </div>

      {/* Key points */}
      {section.keyPoints && (
        <div className="highlight-box mb-5">
          <div className="text-xs font-bold uppercase tracking-wider mb-2 font-mono"
            style={{ color: "hsl(var(--primary))" }}>
            ★ Key Points
          </div>
          <ul className="space-y-1.5">
            {section.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--foreground)/0.85)" }}>
                <span className="mt-1 flex-shrink-0" style={{ color: "hsl(var(--primary))" }}>▸</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Note */}
      {section.note && (
        <div className="highlight-box mb-5">
          <div className="text-xs font-bold uppercase tracking-wider mb-1.5 font-mono"
            style={{ color: "hsl(var(--primary))" }}>
            💡 Note
          </div>
          <p className="text-sm leading-6" style={{ color: "hsl(var(--foreground)/0.85)" }}>{section.note}</p>
        </div>
      )}

      {/* Tip */}
      {section.tip && (
        <div className="tip-box mb-5">
          <div className="text-xs font-bold uppercase tracking-wider mb-1.5 font-mono"
            style={{ color: "hsl(var(--success))" }}>
            ✓ Pro Tip
          </div>
          <p className="text-sm leading-6" style={{ color: "hsl(var(--foreground)/0.85)" }}>{section.tip}</p>
        </div>
      )}

      {/* Warning */}
      {section.warning && (
        <div className="warning-box mb-5">
          <div className="text-xs font-bold uppercase tracking-wider mb-1.5 font-mono"
            style={{ color: "hsl(var(--accent))" }}>
            ⚠ Warning
          </div>
          <p className="text-sm leading-6" style={{ color: "hsl(var(--foreground)/0.85)" }}>{section.warning}</p>
        </div>
      )}

      {/* Complexity table */}
      {section.table && (
        <div className="mb-5 overflow-x-auto rounded-xl" style={{ border: "1px solid hsl(var(--border))" }}>
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
      <div className="section-divider mt-10" />
    </div>
  );
}
