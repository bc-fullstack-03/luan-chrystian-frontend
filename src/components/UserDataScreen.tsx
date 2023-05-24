import { useState } from "react"
import { Input } from "./Input"
import { FiMail } from "react-icons/fi"
import { User, Lock, Camera, Check } from 'phosphor-react'
import { FiCamera } from "react-icons/fi"
import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"
import { InputUpdate } from "./InputUpdate"
import { ChangeEvent } from "react"
import { Loading } from "./Loading"

export function UserDataScreen({ photoUrl, email, name, username }: UserDataUpdateProps) {
    const [newNickename, setNewNickame] = useState<string | undefined>()
    const [password, setPassword] = useState<string>()
    const [avatarFile, setAvatarFile] = useState<any>()
    const [image, setImage] = useState<string>(photoUrl)
    const [newPassword, setNewPassword] = useState<string>()
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [iconCheck, setIconCheck] = useState<boolean>(false)

    const { token }: any = useAuth()
    const emptyPhoto: string = '../src/assets/User.svg'

    async function handleNameChange() {
        setisLoading(true)
        let bodyRequest = {
            username: newNickename
        }

        try {
            await api.put(`/user/rename`, bodyRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                setisLoading(false)
            })

        } catch(error) {
            setisLoading(false)
            alert("Nome indisponível")
            console.log("Error in handleNameChange function in component UserDataScreen.tsx on page Profile.tsx" + error)
        }
    }

    async function handlePasswordChange() {
        const requestBody = {
            email: email,
            oldPassword: password,
            newPassword: newPassword
        }

        try {
            await api.patch("/user/newpassword", requestBody)
            .then(() => { setisLoading(false) })

        } catch(error) {
            setisLoading(false)
            alert("Invalid password")
            console.log("Error in handlePasswordChange function in component UserDataScreen.tsx on page Profile.tsx" + error)
        }
    }

    async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
        setisLoading(true)
        const file: any = event.target.files?.[0]
        const imagePreview = URL.createObjectURL(file)
        setImage(imagePreview)
        setAvatarFile(file);
        setIconCheck(true)
        setisLoading(false)
    }

    async function handlePhotoChange() {
        const formData = new FormData()

        formData.append('photo', avatarFile)

        const result = confirm("Confirmar nova foto")

        if (result) {
            setisLoading(true)

            await api.patch("user/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                alert("Foto alterada com sucesso")
                setisLoading(false)
                setIconCheck(false)
            })

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
        <div className="mx-auto mt-4 text-cyan-300 font-bold text-md">
            <Loading isLoading={isLoading} />

            <div className="mx-auto mt-8 smallScreen:mt-0 ">
                <img
                    className="w-[120px] h-[120px] rounded-[50%] mx-auto "
                    src={image ? image : emptyPhoto}
                    alt=""
                />

                <label className={`cursor-pointer flex items-center mr-24 -mt-4 justify-center  ${iconCheck ? 'hidden' : ''}`} htmlFor="avatar">
                    <Camera size={20} />
                </label>

                <span onClick={handlePhotoChange} className={`cursor-pointer flex items-center mr-24 -mt-4 justify-center   ${iconCheck ? '' : 'hidden'}`}>
                    <Check size={20} />
                </span>

                <input onChange={handleUpload} id="avatar" className="hidden" type="file" />
            </div>

            <div className="w-[515px] flex flex-col gap-3 mt-4">

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
        </div>
    )
}