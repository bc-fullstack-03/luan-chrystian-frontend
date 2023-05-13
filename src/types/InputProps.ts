// import { IconBaseProps } from "react-icons";
import { IconProps} from 'phosphor-react'

export interface InputProps {
    icon: React.ComponentType<IconProps>;
    placeholder: string;
    type: "text" | "password" | "email"
    }