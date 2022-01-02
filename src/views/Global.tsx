import React, { useState, useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import PageFrame from "../components/PageFrame"
import { Button, Text } from "../components/StyledComponents"
import logo from "../assets/logo.png"

const SetLoadingContext = React.createContext<any>(null)
const SetMessageContext = React.createContext<any>(null)
const PageSettingsContext = React.createContext<any>(null)

export function AppFrame() {
    const [appLoading, setAppLoading] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>("Loading App...")
    const [pageSettings, setPageSettings] = useState()

    useEffect(() => {
        setAppLoading(false)
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
                            <PageSettingsContext.Provider value={setPageSettings}>
                                <PageFrame {...pageSettings}>
                                    <Outlet />
                                </PageFrame>
                            </PageSettingsContext.Provider>
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
    const navigate = useNavigate()

    useEffect(() => {
        // setLoading(true)
        setLoading(false)
        setMessage("Loading Home...")
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-row flex-1 w-full h-full justify-center">
            <div className="flex flex-col justify-center text-center">
                <img src={logo} className="w-48 h-48 mx-auto" alt="Logo"></img>
                <Text type="main primary" responsive="text-4xl">DocumentX 2.0</Text>
                <Text type="main secondary" responsive="text-3xl mt-2">Lots of new designs</Text>
                <Button onClick={() => {
                    navigate("/register")
                }}>Get Started</Button>
            </div>
            <div className="flex flex-col">
            </div>
        </div>
    )
}

export function Auth({ signIn = true }: { signIn: boolean }) {
    return (
        <div></div>
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