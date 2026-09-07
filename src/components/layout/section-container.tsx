import * as React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Shared container ensuring consistent left/right gutters and max-width across all sections.
 * Responsive padding scale:
 * - Mobile: px-4 (16px)
 * - Tablet: sm:px-6 (24px)
 * - Desktop: md:px-8 (32px)
 * Standard max-width: max-w-6xl (1152px)
 */
export function SectionContainer({
  children,
  className = "",
  as: Component = "div",
  ...props
}: SectionContainerProps) {
  return (
    <Component
      className={`w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
