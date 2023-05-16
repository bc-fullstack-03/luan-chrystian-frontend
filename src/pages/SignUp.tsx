import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Lock, Envelope, Person } from 'phosphor-react'
import { Link } from "react-router-dom"
import { useState } from "react"

export const SignUp = function () {
    const [password, setPassword] = useState<string>()
    const [repeatPassword, setRepeatPassword] = useState<string>()

    if (repeatPassword !== password) {
        // Validação será feita dentro do clique do botão
    }

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex flex-col items-center justify-center overflow">

            <header className="flex justify-center gap-2">
                <h1 className="text-lg font-bold text-cyan-500 text-center flex items-start">
                    <img className="w-9 h-9" src="../../src/assets/logo.svg" alt="" />
                    Preencha os dados para realizar o cadastro
                </h1>
            </header>

            <form className="flex flex-col gap-2 items-stretch w-full max-w-sm mt-8">

                <Input
                    icon={Person}
                    title="Seu nome completo"
                    placeholder="Digite seu nome completo"
                    type="text"
                />

                <Input
                    icon={Envelope}
                    title="Seu email" placeholder="Digite seu email"
                    type="text"
                />

                <Input
                    icon={Lock}
                    title="Sua senha"
                    placeholder="Digite sua senha"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Input
                    icon={Lock}
                    title="Repita sua senha"
                    placeholder="Digite sua senha novamente"
                    type="password"
                    onChange={(event) => setRepeatPassword(event.target.value)}
                />

                <div className="mt-4">
                    <Button title={'Cadastrar'} />
                </div>

            </form>

            <footer className=" mt-8">
                <Link to="/signin" className="text-xs text-gray-300 underline">Voltar para tela inicial</Link>
            </footer>

        </div>

    )
}