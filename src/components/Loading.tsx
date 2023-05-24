interface LoadingProps {
    isLoading?: boolean
}

export function Loading({ isLoading }: LoadingProps) {

    return (
        <div className={`absolute inset-0 bg-opacity-90 bg-black text-white ${isLoading ? '' : 'hidden'}`}>
            <p className="relative w-12 mx-auto top-1/2">Loading...</p>
        </div>
    )
}