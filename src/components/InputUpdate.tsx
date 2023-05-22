import { Pencil } from "phosphor-react"
import { Input } from "./Input"
import { ReactNode } from 'react'
import { IconProps } from 'phosphor-react'

interface InputUpdateProps {
    children: ReactNode
    onChange: (event: any) => void
    title: string
    type: string
    placeholder: string
    icon: React.ComponentType<IconProps>;
    handle: () => void
}

export function InputUpdate({ children, onChange, title, type, placeholder, icon, handle }: InputUpdateProps) {

    return (
        <div className="flex items-center gap-3">

           <div className="w-[250px]">
           {children}
           </div>

            <div className="w-[250px]">
                <Input
                    title={title}
                    placeholder={placeholder}
                    onChange={onChange}
                    icon={icon}
                    type={type}
                />
            </div>
            
            <Pencil className=" cursor-pointer mt-7 mr-3 absolute ml-[525px]" size={25} onClick={handle} />
        </div>
    )
}