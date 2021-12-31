import React, { useState, useContext, useEffect } from "react"
import { Outlet } from "react-router"
import PageFrame from "../components/PageFrame"
import { Text } from "../components/StyledComponents"
import logo from "../assets/logo.png"

const SetLoadingContext = React.createContext<any>(null)
const SetMessageContext = React.createContext<any>(null)

export function AppFrame() {
    const [appLoading, setAppLoading] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<string | null>("Loading App...")

    useEffect(() => {
        setTimeout(() => {
            
            setAppLoading(false)
        }, 1000)
    }, [])

    return (
        <div>
            {(loading || appLoading) && (
                <div className="fixed w-screen h-screen bg-white select-none" style={{
                    zIndex: 10000000,
                }}>
                    <LoadingPage message={message} />
                </div>
            )}
            {!appLoading && (
                <div className="w-full h-full min-w-screen min-h-screen flex flex-col">
                    <SetLoadingContext.Provider value={setLoading}>
                        <SetMessageContext.Provider value={setMessage}>
                            <Outlet />
                        </SetMessageContext.Provider>
                    </SetLoadingContext.Provider>
                </div>
            )}
        </div>
    )
}

export function Home() {
    const setLoading = useContext(SetLoadingContext)
    const setMessage = useContext(SetMessageContext)

    useEffect(() => {
        setLoading(true)
        setMessage("Loading Home...")
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PageFrame spacing={true}>
            <div className="flex flex-row flex-1 w-full h-full justify-center">
                <div className="flex flex-col justify-center">
                    <Text type="main primary title">Home</Text>
                </div>
                <div className="flex flex-col">
                </div>
            </div>
        </PageFrame>
    )
}

interface LoadingPageProps {
    message?: string | null
}

export function LoadingPage({ message }: LoadingPageProps) {
    return (
        <PageFrame navigation={false}>
            <div className="flex flex-row flex-1 w-full h-full justify-center select-none">
                <div className="flex flex-col justify-center">
                    <img src={logo} className="w-64 mx-auto content-fit" alt="DocumentX Logo" />
                </div>
            </div>
            <div>
                {message && (
                    <Text type="normal" className="mx-auto text-center">{message}</Text>
                )}
            </div>
        </PageFrame>
    )
}