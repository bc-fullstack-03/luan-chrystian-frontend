import { useState } from "react"
import { Input } from "./Input"
import { FiMail } from "react-icons/fi"
import { User, Lock } from 'phosphor-react'
import { api } from "../services/api"
import { useAuth } from "../hooks/auth"
import { InputUpdate } from "./InputUpdate"

export function UserDataScreen({ photoUrl, email, name, username }: UserDataUpdateProps) {
    const [newNickename, setNewNickame] = useState<string | undefined>()
    const [password, setPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()

    const { token }: any = useAuth()
    const emptyPhoto: string = '../src/assets/User.svg'

    async function handleNameChange() {
        let bodyRequest = {
            username: newNickename
        }

        setNewNickame('')

        await api.put(`/user/rename`, bodyRequest, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(() => alert("Nome alterado com sucesso"))
    }

    async function handlePasswordChange() {
        const requestBody = {
            email: email,
            oldPassword: password,
            newPassword: newPassword
        }

        await api.patch("/user/newpassword", requestBody)
            .then(() => { alert("Senha alterada com sucesso") })
    }

    return (
        <>
            <img className="w-[120px] h-[120px] rounded-[50%]" src={photoUrl ? photoUrl : emptyPhoto} alt="" />

            <div className="w-[515px] flex flex-col gap-3 ">

                <div className="flex items-center gap-3 ">
                    <Input value={email} title="Email" type="email" icon={FiMail} disabled />
                    <Input value={name} title="Nome completo" type="text" icon={User} disabled />
                </div>

                <InputUpdate
                    title="Atualizar nickname"
                    placeholder="Novo nickname"
                    onChange={(event: any) => setNewNickame(event.target.value)}
                    handle={handleNameChange}
                    icon={User}
                    type="text"
                >

                    <Input readOnly value={username} title="Nickname atual" type="text" icon={User} />
                </InputUpdate>

                <InputUpdate
                    title="Nova senha"
                    placeholder="Digte sua nova senha"
                    onChange={(event: any) => setNewPassword(event.target.value)}
                    handle={handlePasswordChange}
                    icon={Lock}
                    type="password"
                >

                    <Input readOnly title="Senha atual" placeholder="Digite sua senha atual" onChange={(event: any) => setPassword(event.target.value)} type="text" icon={Lock} />
                </InputUpdate>
            </div>
        </>
    )
}