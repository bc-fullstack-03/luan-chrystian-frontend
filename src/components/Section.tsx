import { SectionProps } from "../types/SectionProps";


export function Section({ children }: SectionProps) {

    return (
        <section className="pt-3 flex flex-col flex-1">
            {children}
        </section>
    )
}