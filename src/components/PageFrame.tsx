import React from "react";

import logo from "../assets/logo.png";
import { Text } from "../components/StyledComponents";
interface PageFrameProps {
    spacing?: boolean,
    navigation?: boolean,
    children: React.ReactNode
}

function NavBarItem({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) {
    return (
        <div className="flex flex-col justify-center px-5 cursor-pointer hover:bg-gray-100 select-none" onClick={() => {
            if (onClick) {
                onClick()
            }
        }}>
            {children}
        </div>
    )
}

export default function PageFrame({ spacing = true, children, navigation = true }: PageFrameProps) {
    return (
        <div className={`w-full h-full min-w-screen min-h-screen flex flex-col relative`}>
            {navigation && (
                <div className="absolute flex flex-row w-full h-full h-16 shadow-sm" style={{
                    backgroundColor: "rgba(255, 255, 255, 0.72)",
                    backdropFilter: "saturate(180%) blur(20px)",
                    zIndex: 99999
                }}>
                    <NavBarItem onClick={()=>{
                    }}>
                        <img className="h-14 w-14 object-contain" src={logo} alt="DocumentX Logo"></img>
                    </NavBarItem>
                    <NavBarItem>
                        <Text type="nav gray">Dashboard</Text>
                    </NavBarItem>
                </div>
            )}
            <div className={`flex-1 flex flex-col relative ${spacing && "p-10"}`}>
                {children}
            </div>
        </div>
    );
}