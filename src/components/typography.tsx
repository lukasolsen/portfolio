import React, { type FC } from "react";
import clsx from "clsx";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Header1: FC<TypographyProps> = ({ children, className }) => (
  <h1
    className={clsx(
      "text-4xl md:text-5xl font-semibold tracking-tight leading-tight",
      className
    )}
  >
    {children}
  </h1>
);

export const Header2: FC<TypographyProps> = ({ children, className }) => (
  <h2
    className={clsx(
      "text-3xl md:text-4xl font-semibold tracking-tight leading-snug",
      className
    )}
  >
    {children}
  </h2>
);

export const Header3: FC<TypographyProps> = ({ children, className }) => (
  <h3
    className={clsx(
      "text-2xl md:text-3xl font-medium tracking-tight leading-snug",
      className
    )}
  >
    {children}
  </h3>
);

export const Header4: FC<TypographyProps> = ({ children, className }) => (
  <h4
    className={clsx(
      "text-xl md:text-2xl font-medium tracking-tight leading-snug",
      className
    )}
  >
    {children}
  </h4>
);

export const Header5: FC<TypographyProps> = ({ children, className }) => (
  <h5
    className={clsx(
      "text-lg md:text-xl font-medium tracking-tight leading-snug",
      className
    )}
  >
    {children}
  </h5>
);

export const Header6: FC<TypographyProps> = ({ children, className }) => (
  <h6
    className={clsx(
      "text-base md:text-lg font-medium tracking-tight leading-snug",
      className
    )}
  >
    {children}
  </h6>
);

export const Paragraph: FC<TypographyProps> = ({ children, className }) => (
  <p
    className={clsx(
      "text-muted-foreground leading-relaxed max-w-3xl",
      className
    )}
  >
    {children}
  </p>
);

export const LeadText: FC<TypographyProps> = ({ children, className }) => (
  <p
    className={clsx(
      "text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed",
      className
    )}
  >
    {children}
  </p>
);

export const Title: FC<TypographyProps> = ({ children, className }) => (
  <h1
    className={clsx(
      "text-4xl md:text-5xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h1>
);

export const SmallText: FC<TypographyProps> = ({ children, className }) => (
  <p className={clsx("text-sm text-muted-foreground", className)}>{children}</p>
);

export const ListItem: FC<TypographyProps> = ({ children, className }) => (
  <li className={clsx("list-disc list-inside", className)}>{children}</li>
);
