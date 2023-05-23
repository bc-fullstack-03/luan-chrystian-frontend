import { useState } from "react"
import { Input } from "./Input"
import { FiMail } from "react-icons/fi"
import { User, Lock, Camera, Check } from 'phosphor-react'
import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"
import { InputUpdate } from "./InputUpdate"
import { ChangeEvent } from "react"

export function UserDataScreen({ photoUrl, email, name, username }: UserDataUpdateProps) {
    const [newNickename, setNewNickame] = useState<string | undefined>()
    const [password, setPassword] = useState<string>()
    const [avatarFile, setAvatarFile] = useState<any>()
    const [image, setImage] = useState<string>(photoUrl)
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

    async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
        const file: any = event.target.files?.[0]
        const imagePreview = URL.createObjectURL(file)
        setImage(imagePreview)
        setAvatarFile(file);

    }

    async function handlePhotoChange() {

        const formData = new FormData()

        formData.append('photo', avatarFile)

        const result = confirm("Confirmar nova foto")

        if (result) {

            await api.patch("user/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }).then(() => alert("Foto alterada com sucesso"))

            await api.patch("/publications/profile", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } else {
            return
        }
    }

    return (
        <>
            <div>
                <img
                    className="w-[120px] h-[120px] rounded-[50%]"
                    src={image ? image : emptyPhoto}
                    alt=""
                />

                <label className={`cursor-pointer absolute -mt-2 ${avatarFile ? 'hidden' : ''}`} htmlFor="avatar">
                    <Camera size={25} />
                </label>

                <button onClick={handlePhotoChange} className={`cursor-pointer absolute -mt-2 ${avatarFile ? '' : 'hidden'}`}><Check size={25} /></button>

                <input onChange={handleUpload} id="avatar" className="hidden" type="file" />
            </div>

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