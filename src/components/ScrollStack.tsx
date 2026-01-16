import React, { ReactNode } from "react";

export interface ScrollStackItemProps {
    children: ReactNode;
    delay?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    delay = 0,
}) => {
    return (
        <div
            className="bg-card p-6 rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 w-full"
        >
            {children}
        </div>
    );
};

export interface ScrollStackProps {
    children: React.ReactElement<ScrollStackItemProps>[] | React.ReactElement<ScrollStackItemProps>;
    columns?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    gap?: string;
    maxWidth?: string;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    columns = { mobile: 1, tablet: 2, desktop: 3 },
    gap = "gap-6",
    maxWidth = "max-w-5xl",
}) => {
    // Determine grid class based on column settings
    let gridColsClass = "grid-cols-1";
    if (columns.mobile === 2) gridColsClass = "grid-cols-2";
    if (columns.mobile === 3) gridColsClass = "grid-cols-3";

    let mdGridColsClass = "md:grid-cols-1";
    if (columns.tablet === 2) mdGridColsClass = "md:grid-cols-2";
    if (columns.tablet === 3) mdGridColsClass = "md:grid-cols-3";
    if (columns.tablet === 4) mdGridColsClass = "md:grid-cols-4";

    let lgGridColsClass = "lg:grid-cols-1";
    if (columns.desktop === 2) lgGridColsClass = "lg:grid-cols-2";
    if (columns.desktop === 3) lgGridColsClass = "lg:grid-cols-3";
    if (columns.desktop === 4) lgGridColsClass = "lg:grid-cols-4";

    const gridClass = `grid ${gridColsClass} ${mdGridColsClass} ${lgGridColsClass} ${gap} ${maxWidth} mx-auto`;

    // Generate inline styles for animation delays
    const childrenWithDelay = React.Children.map(children, (child, index) => {
        const delayValue = index * 0.1;
        return (
            <div style={{ animationDelay: `${delayValue}s` }} key={index}>
                {React.cloneElement(child as React.ReactElement<ScrollStackItemProps>, {
                    delay: index,
                } as any)}
            </div>
        );
    });

    return <div className={gridClass}>{childrenWithDelay}</div>;
};

export default ScrollStack;
