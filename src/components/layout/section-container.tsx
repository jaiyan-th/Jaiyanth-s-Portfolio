import * as React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Shared container set to completely flush (0px side margins and 0px side padding)
 * ensuring content and borders touch the absolute browser window edges directly.
 */
export function SectionContainer({
  children,
  className = "",
  as: Component = "div",
  ...props
}: SectionContainerProps) {
  return (
    <Component
      className={`w-full px-0 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
