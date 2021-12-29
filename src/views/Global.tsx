import { useEffect } from "react"
import { Outlet } from "react-router"
import PageFrame from "../components/PageFrame"

export function AppFrame() {
    return (
        <div className="w-full h-full min-w-screen min-h-screen flex flex-col">
            <Outlet />
        </div>
    )
}

export function Home() {
    useEffect(() => {
        // Init
    }, [])
    return (
        <PageFrame spacing={true}>
            <div className="flex flex-row flex-1 bg-red-100 w-full h-full justify-center">
                <div className="flex flex-col">
                    Left
                </div>
                <div className="flex flex-col">
                    Right
                </div>
            </div>
        </PageFrame>
    )
}