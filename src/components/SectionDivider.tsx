import React from "react";

/* ◆ Ornamental Section Divider — ——— ◆ ——— */
export function SectionDivider({ className = "" }: { className?: string }) {
    return (
        <div className={`section-divider my-4 ${className}`} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="0" width="8.49" height="8.49" rx="1" transform="rotate(45 6 0)" fill="#D4AF37" />
            </svg>
        </div>
    );
}

/* Gradient-faded subtle sub-divider */
export function SubDivider({ className = "" }: { className?: string }) {
    return <div className={`sub-divider my-4 ${className}`} aria-hidden="true" />;
}

/* 28px gold rule above section labels */
export function LabelAccent({ centered = true, className = "" }: { centered?: boolean; className?: string }) {
    return <span className={`${centered ? "label-accent" : "label-accent-left"} ${className}`} aria-hidden="true" />;
}

/* Utility: render text with cursive ampersands */
export function StylizedText({ text, className = "" }: { text: string; className?: string }) {
    const parts = text.split("&");
    if (parts.length === 1) return <span className={className}>{text}</span>;

    return (
        <span className={className}>
            {parts.map((part, i) => (
                <React.Fragment key={i}>
                    {part}
                    {i < parts.length - 1 && <span className="ampersand-cursive">&amp;</span>}
                </React.Fragment>
            ))}
        </span>
    );
}
