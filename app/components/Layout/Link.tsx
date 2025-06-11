import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NextLinkComposedProps {
  to: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
>(
  (
    { to, replace, scroll, prefetch, className, children, onClick, ...other },
    ref
  ) => {
    return (
      <Link
        href={to}
        replace={replace}
        scroll={scroll}
        prefetch={prefetch}
        ref={ref}
        className={cn("text-inherit no-underline", className)}
        onClick={onClick}
        {...other}>
        {children}
      </Link>
    );
  }
);

NextLinkComposed.displayName = "NextLinkComposed";
