import { IconProps} from 'phosphor-react'
import { InputHTMLAttributes } from 'react';


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: React.ComponentType<IconProps>;
    title:string;
    type: "text" | "password" | "email";
    }