import { IconProps} from 'phosphor-react'
import { ChangeEvent } from 'react';

export interface InputProps {
    icon: React.ComponentType<IconProps>;
    title:string;
    placeholder: string;
    type: "text" | "password" | "email";
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    }