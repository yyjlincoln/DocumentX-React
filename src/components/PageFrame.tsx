import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

import logo from "../assets/logoTextOnly.png";
import { UserContext } from "../common";
import { Styled, Text } from "../components/StyledComponents";

export interface PageFrameProps {
    spacing?: boolean,
    navigation?: boolean,
    children: React.ReactNode
}

function NavBarItem({ children, className, ...args }: { children?: React.ReactNode, [key: string]: any }) {
    return (
        <div className={`flex flex-col justify-center px-5 cursor-pointer hover:bg-gray-100 active:bg-gray-200 select-none ${className ?? ""}`} {...args}>
            {children}
        </div>
    )
}

export default function PageFrame({ spacing = true, children, navigation = true }: PageFrameProps) {
    const { userState } = useContext<any>(UserContext)
    const navigate = useNavigate()
    const [navigationMenu, setNavigationMenu] = useState(false)
    const Links = [
        (
            <NavBarItem key="dashboard" onClick={() => {
                setNavigationMenu(false)
                navigate("/dashboard")
            }}>
                <Text type="nav primary" className="py-3 sm:py-0 text-md">Dashboard</Text>
            </NavBarItem>
        ), (
            <NavBarItem key="library" onClick={() => {
                setNavigationMenu(false)
                navigate("/library")
            }}>
                <Text type="nav primary" className="py-3 sm:py-0 text-md">Library</Text>
            </NavBarItem>
        ), (
            <NavBarItem key="search" onClick={() => {
                setNavigationMenu(false)
                navigate("/search")
            }}>
                <Text type="nav primary" className="py-3 sm:py-0 text-md">Search</Text>
            </NavBarItem>
        ),
    ]
    return (
        <div className={`w-full h-full min-w-screen min-h-screen flex flex-col relative`} style={{
            backgroundColor: "#F4F9FD"
        }}>
            {navigation && (
                <Styled type="bg-blur" className="fixed flex flex-row w-full h-full h-16 shadow-md justify-between" style={{
                    zIndex: 999999
                }}>
                    <div className="flex flex-row">
                        {/* Left */}
                        <div className="flex flex-row shrink-0">
                            {/* Logo */}
                            <NavBarItem onClick={() => {
                                setNavigationMenu(false)
                                navigate("/")
                            }}>
                                <img className="h-14 w-14 object-contain" src={logo} alt="DocumentX Logo"></img>
                            </NavBarItem>
                        </div>
                        <div className="flex-row hidden sm:flex">
                            {/* Links - Computer etc */}
                            {Links}
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
                        <NavBarItem className="flex sm:hidden" onClick={() => {
                            setNavigationMenu(!navigationMenu)
                        }}>
                            <Text type="nav primary" className="h-full flex flex-col justify-center">
                                <i className={`bx text-2xl ${navigationMenu ? "bxs-up-arrow-circle" : "bx-menu"}`}></i>
                            </Text>
                        </NavBarItem>
                    </Styled>
                    {
                        navigationMenu && (
                            <Styled className="fixed flex-col sm:hidden mt-16 w-screen h-screen bg-white flex flex-col" style={{
                                zIndex: 99990
                            }}>
                                {
                                    Links
                                }
                                <NavBarItem className="mt-8" onClick={() => {
                                    if (userState !== null) {
                                        navigate("/account")
                                    } else {
                                        navigate("/signin")
                                    }
                                    setNavigationMenu(false)
                                }}>
                                    <Text type="nav primary" className="py-3 sm:py-0 text-md">{
                                        userState ? userState.name : "Sign in"
                                    }</Text>
                                </NavBarItem>
                            </Styled>
                        )
                    }


                </Styled>
            )}
            <div className={`flex-1 flex flex-col relative ${spacing && "p-10"} ${(spacing && navigation) && "pt-28"}`}>
                {children}
            </div>
        </div>
    );
}