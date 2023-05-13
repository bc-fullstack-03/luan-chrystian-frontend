import { InputProps } from "../types/InputProps"

export function Input({ icon: Icon, ...rest }: InputProps) {
    return (
        <div className="flex items-center gap-3 h-12 py-3 px-4 rounded bg-gray-600 w-full">
            {<Icon className="text-gray-300" size={20} />}

            <input
                className="bg-transparent w-full text-gray-300 text-xs placeholder:text-gray-300 outline-none"
                autoComplete="none"
                {...rest}
            />
        </div>
    )
}