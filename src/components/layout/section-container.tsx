import * as React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Shared container with subtle edge padding (16px-24px) ensuring a small,
 * clean breathing space on both the left and right edges.
 */
export function SectionContainer({
  children,
  className = "",
  as: Component = "div",
  ...props
}: SectionContainerProps) {
  return (
    <Component
      className={`w-full px-4 sm:px-5 md:px-6 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
