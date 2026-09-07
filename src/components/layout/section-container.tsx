import * as React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Shared container with spacious max-width and comfortable edge padding (20px-48px)
 * ensuring a refined, balanced breathing space on both the left and right sides.
 */
export function SectionContainer({
  children,
  className = "",
  as: Component = "div",
  ...props
}: SectionContainerProps) {
  return (
    <Component
      className={`w-full max-w-[1380px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
