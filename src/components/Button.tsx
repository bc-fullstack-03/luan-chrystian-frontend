import { ButtonProps } from "./types/ButtonProps"

export function Button({ title, type, onClick }: ButtonProps) {

    return (
        <button onClick={onClick} type={type} className="py-3 px-4 bg-cyan-500 rounded font-semibold text-gray-900 text-sm w-full transition-colors hover:bg-cyan-300">
            {title}
        </button>
    )
}