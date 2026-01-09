import * as React from "react";

interface ProseBlockProps {
  children: React.ReactNode;
}

/**
 * Container for instructional prose text
 * Applies consistent typography and spacing
 */
export function ProseBlock({ children }: ProseBlockProps) {
  return (
    <div className="prose prose-slate max-w-none">
      <div className="text-foreground leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
}

/**
 * Guidance callout for instructional tips
 */
interface GuidanceProps {
  children: React.ReactNode;
}

export function Guidance({ children }: GuidanceProps) {
  return (
    <div className="rounded-md border-l-4 border-primary bg-primary/5 p-4 my-4">
      <p className="text-sm text-foreground">{children}</p>
    </div>
  );
}

