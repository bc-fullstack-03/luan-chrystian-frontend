import { ReactNode } from 'react'
import { IconProps } from 'phosphor-react'

export interface InputUpdateProps {
    children: ReactNode
    onChange: (event: any) => void
    title: string
    type: string
    placeholder: string
    icon: React.ComponentType<IconProps>;
    handle: () => void
}