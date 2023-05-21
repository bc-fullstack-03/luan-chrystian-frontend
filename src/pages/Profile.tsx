import { Menu } from "../components/Menu"
import { Section } from "../components/Section"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { useAuth } from "../hooks/auth"
import { UserDataUpdateScreen } from "../components/UserDataUpdateScreen"

export const Profile = function () {
    const [userData, setUserData] = useState<User | undefined>()


    const { authEmail }: any = useAuth()

    useEffect(() => {
        async function fetchUserData() {
            const email: string = authEmail.replace(/"/g, "")

            const response = await api.get(`/user/email?email=${email}`)

            const data = response.data
            setUserData(data)
        }

        fetchUserData()

    }, [userData])

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">

            <Menu />

            <Section>

                <div className="flex gap-12 bg-black text-gray-300 items-center justify-center mx-auto px-32 py-3 rounded-xl">
                    <p>Dados pessoais</p>
                    <p>BIografia</p>
                    <p>Seguidores e Seguindo</p>
                </div>

                <div className="mx-auto mt-10 flex flex-col items-center gap-3 text-cyan-300 font-bold text-md">
                    {userData &&
                        (
                            <UserDataUpdateScreen photoUrl={userData.avatarUri} email={userData.email} name={userData.name} username={userData.username} />

                        )
                    }

                </div>

            </Section>


        </div>
    )
}