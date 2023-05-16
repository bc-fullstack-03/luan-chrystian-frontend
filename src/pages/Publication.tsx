import { Menu } from "../components/Menu";
import { Section } from "../components/Section";
import { User } from "../components/User";

export function Publication() {

    const photoUrl = 'https://github.com/rodrigorgtic.png'

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">
            <Menu />

            <Section>
                <h2 className="font-bold text-lg text-white pl-5 mb-4 mobile:text-center">Publicação</h2>

                {/* COMPONNENTE DE PUBLICAÇÃO TO-D-: 
                    <User />
                    CONTEÚDO
                    DATA DE CRIAÇÃO
                    NÚMEROS DE CURTIDAS E COMENTÁRIOS
                    INPUT DE COMENTAR NA PUBLICAÇÃO
                    COMENTÁRIOS
                */}

            </Section>
        </div>
    )
}