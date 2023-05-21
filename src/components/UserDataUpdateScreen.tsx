import { useState } from "react"
import { Input } from "./Input"
import { FiMail } from "react-icons/fi"
import { Pencil, User } from 'phosphor-react'
import { api } from "../services/api"
import { useAuth } from "../hooks/auth"

export function UserDataUpdateScreen({ photoUrl, email, name, username }: UserDataUpdateProps) {
    const [newNickename, setNewNickame] = useState<string | undefined>()

    const { token }: any = useAuth()
    const emptyPhoto: string = '../src/assets/User.svg'

    async function handleNameOrUsernameChange() {
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

    return (
        <>
            <img className="w-[120px] h-[120px] rounded-[50%]" src={photoUrl ? photoUrl : emptyPhoto} alt="" />

            <div className="w-[515px] flex flex-col gap-3 ">

                <div className="flex items-center gap-3 ">
                    <Input value={email} title="Email" type="email" icon={FiMail} disabled />
                    <Input value={name} title="Nome completo" type="text" icon={User} disabled />
                </div>

                <div className="flex items-center gap-3 ">
                    <Input value={username} title="Nickname atual" type="text" icon={User} />

                    <Input
                        placeholder="Novo nickename"
                        onChange={(event: any) => { setNewNickame(event.target.value) }}
                        value={newNickename}
                        title="Atualizar nickename"
                        type="text" icon={User}
                    />
                    <Pencil className=" cursor-pointer mt-7 mr-3 absolute ml-[520px]" size={25} onClick={handleNameOrUsernameChange} />
                </div>

                <div className="flex items-center gap-3">
                    <Input title="Senha atual" placeholder="Digite sua senha atual" type="text" icon={User} />

                    <Input
                        title="Nova senha"
                        placeholder="Nova senha"
                        onChange={(event: any) => { setNewNickame(event.target.value) }}
                        value={newNickename}
                        type="text" icon={User}
                    />
                    <Pencil className=" cursor-pointer mt-7 mr-3 absolute ml-[520px]" size={25} onClick={handleNameOrUsernameChange} />
                </div>
            </div>
        </>
    )
}