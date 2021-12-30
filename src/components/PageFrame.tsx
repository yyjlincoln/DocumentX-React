import React from "react";

interface PageFrameProps {
    spacing?: boolean,
    navigation?: boolean,
    children: React.ReactNode
}

export default function PageFrame({ spacing = true, children, navigation = true }: PageFrameProps) {
    return (
        <div className={`w-full h-full min-w-screen min-h-screen flex flex-col relative`}>
            {navigation && (
                <div className="absolute flex flex-row w-full">
                    <div>[TODO]</div>
                    <div>Navigation Bar</div>
                </div>
            )}
            <div className={`flex-1 flex flex-col relative ${spacing && "p-10"}`}>
                {children}
            </div>
        </div>
    );
}