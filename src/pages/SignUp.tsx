import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { Lock, Envelope, Person } from 'phosphor-react'

export const SignUp = function () {

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex flex-col items-center justify-center overflow">

            <header className="flex justify-center gap-2">
                <h1 className="text-lg font-bold text-cyan-500">Preencha os seu dados para realizar o cadastro</h1>
            </header>

            <form className="flex flex-col gap-4 items-stretch w-full max-w-sm mt-10">
                <Input icon={Person} placeholder="Digite seu nome completo" type="text" />
                <Input icon={Envelope} placeholder="Digite seu email" type="text" />
                <Input icon={Lock} placeholder="Digite sua senha" type="password" />
                <Button title={'Cadastrar'} />
            </form>

            <footer className=" mt-8">
                <a href="/signin" className="text-xs text-gray-300 underline">Voltar para tela inicial</a>
            </footer>

        </div>

    )
}