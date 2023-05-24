export function Logo({ subtitle }: { subtitle: string }) {

    return (
        <div className="flex flex-col items-center ">
            <img className=" h-48  notebook:h-40" src="../../src/assets/logo.svg" alt="" />
            <h1 className="text-xl font-bold text-white">Sysmap Parrot</h1>
            <p className="font-400 text-gray-300">{subtitle}</p>
        </div>
    )
}