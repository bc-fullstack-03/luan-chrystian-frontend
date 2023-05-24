import { ReactNode } from "react"

export interface InputSelectProps {
    children: ReactNode
    selectId: string
    title: string
    onChange: (event: any) => void
    handle: () => void
}