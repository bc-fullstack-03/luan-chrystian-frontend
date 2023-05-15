import { Input } from "../components/Input"
import { Logo } from "../components/Logo"
import { Button } from "../components/Button"
import { Envelope } from 'phosphor-react'
import { Lock } from 'phosphor-react'
import { Link } from "react-router-dom";

export const SignIn = function () {

    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center">

            <header>
                <Logo subtitle={'Faça o login e começe a usar'} />
            </header>

            <form className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-2 notebook:mt-7">
                <Input icon={Envelope} title="Endereço de email" placeholder="Digite seu email" type="text" />
                <Input icon={Lock} title="Senha" placeholder="Digite sua senha" type="password" />

                <div className="mt-6 notebook:mt-3">
                    <Button title={'Entrar'} />
                </div>
            </form>

            <footer className=" mt-9 notebook:mt-3">

                <Link to="/signup" className="text-xs text-gray-300 underline">Não possui conta? Cria uma agora!</Link>
            </footer>

        </div>

    )
}