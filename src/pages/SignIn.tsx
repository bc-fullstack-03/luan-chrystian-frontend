import { Input } from "../components/Input"
import { Logo } from "../components/Logo"
import { Button } from "../components/Button"
import { Envelope } from 'phosphor-react'
import { Lock } from 'phosphor-react'

export const SignIn = function () {

    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center">

            <header>
                <Logo subtitle={'Faça o login e começe a usar'} />
            </header>

            <form className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10">
                <Input icon={Envelope} placeholder="Digite seu email" type="text" />
                <Input icon={Lock} placeholder="Digite sua senha" type="password" />
                <Button title={'Entrar'} />
            </form>

            <footer className=" mt-8">
                <a href="/signup" className="text-xs text-gray-300 underline">Não possui conta? Cria uma agora!</a>
            </footer>

        </div>

    )
}