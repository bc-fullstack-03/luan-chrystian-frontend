import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface MenuItemProps {
    children: ReactNode
    route: string
    onClick?: () => void;
}

export function MenuItem({children, route, onClick}: MenuItemProps) {

    return (
        <li>
            <Link onClick={onClick} className="flex gap-4 items-center text-lg font-bold text-white" to={route} >
                {children}
            </Link>
        </li>
    )
}