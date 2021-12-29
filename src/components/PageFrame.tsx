import React from "react";

interface PageFrameProps {
    spacing?: boolean,
    children: React.ReactNode
}

export default function PageFrame({ spacing, children }: PageFrameProps) {
    return (
        <div className={`w-full h-full min-w-screen min-h-screen flex flex-col relative ${spacing && "p-10"}`}>
            {children}
        </div>
    );
}