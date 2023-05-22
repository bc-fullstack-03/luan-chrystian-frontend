import { InputProps } from "./types/InputProps";

export function Input({ icon: Icon, title, value, ...rest }: InputProps) {
    return (
        <div>
            <label htmlFor={title} className="text-white font-semibold text-xs">{title}</label>

            <div
                className="flex items-center h-12 py-3 px-4 rounded bg-gray-600 w-full focus-within:ring-2 ring-cyan-300 blur-none mt-1" >

                {<Icon className="text-gray-300 mr-3" size={20} />}

                <input
                    className="bg-transparent w-full text-gray-300 text-xs placeholder:text-gray-300 outline-none shadow-none"
                    autoComplete="none"
                    id={title}
                    value={value}
                    {...rest}
                />
            </div>
        </div>
    )
}