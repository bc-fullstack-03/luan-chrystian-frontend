import { Loading } from "./Loading"
import { ButtonProps } from "../types/components/ButtonProps"

export function Button({ title, type, width, isLoading, onClick }: ButtonProps) {

    return (

        <>
            <button
                onClick={onClick}
                type={type}
                className={`py-3 px-4 bg-cyan-500 rounded font-semibold text-gray-900 text-sm w-full transition-colors hover:bg-cyan-300 ${width}`}
                disabled={isLoading}
            >
                {title}
            </button>

            <Loading isLoading={isLoading} />
        </>
    )
}