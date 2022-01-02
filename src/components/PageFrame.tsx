import React, { useContext } from "react";
import { useNavigate } from "react-router";

import logo from "../assets/logoTextOnly.png";
import { UserContext } from "../common";
import { Styled, Text } from "../components/StyledComponents";
interface PageFrameProps {
    spacing?: boolean,
    navigation?: boolean,
    children: React.ReactNode
}

function NavBarItem({ children, className, ...args }: { children?: React.ReactNode, [key: string]: any }) {
    return (
        <div className={`flex flex-col justify-center px-5 cursor-pointer hover:bg-gray-100 select-none ${className ?? ""}`} {...args}>
            {children}
        </div>
    )
}

export default function PageFrame({ spacing = true, children, navigation = true }: PageFrameProps) {
    const { userState } = useContext<any>(UserContext)
    const navigate = useNavigate()
    return (
        <div className={`w-full h-full min-w-screen min-h-screen flex flex-col relative`} style={{
            backgroundColor: "#F4F9FD"
        }}>
            {navigation && (
                <div className="absolute flex flex-row w-full h-full h-16 shadow-sm sm:px-4 justify-between" style={{
                    backgroundColor: "rgba(255, 255, 255, 0.72)",
                    backdropFilter: "saturate(180%) blur(20px)",
                    zIndex: 99999
                }}>
                    <div className="flex flex-row">
                        {/* Left */}
                        <div className="flex flex-row shrink-0">
                            {/* Logo */}
                            <NavBarItem onClick={() => {
                                navigate("/")
                            }}>
                                <img className="h-14 w-14 object-contain" src={logo} alt="DocumentX Logo"></img>
                            </NavBarItem>
                        </div>
                        <div className="flex-row hidden sm:flex">
                            {/* Links */}
                            <NavBarItem onClick={() => {
                                navigate("/dashboard")
                            }}>
                                <Text type="nav primary" className="text-md">Dashboard</Text>
                            </NavBarItem>
                            <NavBarItem onClick={() => {
                                navigate("/library")
                            }}>
                                <Text type="nav primary" className="text-md">My Library</Text>
                            </NavBarItem>
                        </div>
                    </div>

                    <Styled className="flex flex-row">
                        {/* Right */}
                        <NavBarItem className="hidden sm:flex" onClick={() => {
                            if (userState !== null) {
                                navigate("/account")
                            } else {
                                navigate("/signin")
                            }
                        }}>
                            <Text type="nav primary" className="text-md">{
                                userState ? userState.name : "Sign in"
                            }</Text>
                        </NavBarItem>
                    </Styled>

                </div>
            )}
            <div className={`flex-1 flex flex-col relative ${spacing && "p-10"}`}>
                {children}
            </div>
        </div>
    );
}