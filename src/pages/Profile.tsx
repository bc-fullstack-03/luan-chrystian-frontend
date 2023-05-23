import { Menu } from "../components/Menu"
import { Section } from "../components/Section"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"
import { UserDataScreen } from "../components/UserDataScreen"
import { Biography } from "../components/Biography"

export const Profile = function () {
    const [userData, setUserData] = useState<User>()
    const [showUserDataScreen, setShowUserDataScreen] = useState<boolean>(true)
    const [showBiographyScreen, setShowBiographyScreen] = useState<boolean>(false)

    const { authEmail }: any = useAuth()

    function toggleUserData() {
        if (showUserDataScreen == false) {
            setShowUserDataScreen(true)
            setShowBiographyScreen(false)
        } else {
            setShowUserDataScreen(false)
        }
    }

    function toggleBiography() {
        if (showBiographyScreen == false) {
            setShowBiographyScreen(true)
            setShowUserDataScreen(false)
        } else {
            setShowBiographyScreen(false)
        }

    }

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
                    <p onClick={toggleUserData}>Dados pessoais</p>
                    <p onClick={toggleBiography}>Biografia</p>
                    <p>Suas publicações</p>
                </div>

                <div>
                </div>

                <div className="mx-auto mt-10 text-cyan-300 font-bold text-md">
                    <div className={`flex flex-col items-center gap-6 ${showUserDataScreen == false ? 'hidden' : ''}`}>
                        {userData &&
                            (
                                <UserDataScreen photoUrl={userData.avatarUri} email={userData.email} name={userData.name} username={userData.username} />
                            )
                        }
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        {showBiographyScreen &&
                            (
                                <Biography />
                            )
                        }
                    </div>
                </div>

            </Section>

        </div>
    )
}