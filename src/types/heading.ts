import { type VariantProps } from "class-variance-authority";
import * as React from "react";
declare const headingVariants: (props?: ({
    level?: "h2" | "h3" | "h1" | null | undefined;
} & ({
    class: import("clsx").ClassValue;
    className?: undefined;
} | {
    class?: undefined;
    className: import("clsx").ClassValue;
} | {
    class?: undefined;
    className?: undefined;
})) | undefined) => string;
type HeadingProps = VariantProps<typeof headingVariants> & React.HTMLAttributes<HTMLHeadingElement>;
declare const Heading: ({ level, className, ...props }: HeadingProps) => React.JSX.Element;
export { Heading, headingVariants };
