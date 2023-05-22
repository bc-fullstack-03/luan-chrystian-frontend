import { Input } from "../components/Input"
import { Logo } from "../components/Logo"
import { Button } from "../components/Button"
import { Envelope } from 'phosphor-react'
import { Lock } from 'phosphor-react'
import { Link } from "react-router-dom";
import { useState } from "react"
import { useAuth } from "../hooks/contexts/authContext"

export const SignIn = function () {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { signIn }: any = useAuth()

    function handleSignIn(event: React.FormEvent) {
        event.preventDefault()
        signIn({ email, password })
    }

    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-center">

            <header>
                <Logo subtitle={'Faça o login e começe a usar'} />
            </header>

            <form className="flex flex-col items-stretch w-full max-w-sm mt-10 gap-2 notebook:mt-7">
                <Input
                    icon={Envelope}
                    title="Endereço de email"
                    placeholder="Digite seu email"
                    type="text"
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    icon={Lock}
                    title="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />

                <div className="mt-6 notebook:mt-3">

                    <Button title={'Entrar'} onClick={handleSignIn} />
                    
                </div>
            </form>

            <footer className=" mt-9 notebook:mt-3">

                <Link to="/signup" className="text-xs text-gray-300 underline">Não possui conta? Cria uma agora!</Link>
            </footer>

        </div>

    )
}