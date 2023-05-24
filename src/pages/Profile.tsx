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
        setShowUserDataScreen(!showUserDataScreen)
        setShowBiographyScreen(false)
    }

    function toggleBiography() {
        setShowBiographyScreen(!showBiographyScreen)
        setShowUserDataScreen(false)
    }

    useEffect(() => {
        async function fetchUserData() {
            const email: string = authEmail.replace(/"/g, "")

            try {
                const response = await api.get(`/user/email?email=${email}`)
                setUserData(response.data)

            } catch (error) {
                console.log("Error on fetchUserData function on page Profile.tsx" + error)
            }
        }
        fetchUserData()
    }, [userData])

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">
            <Menu />

            <Section>
                <div className="flex gap-12 bg-black text-gray-300 items-center justify-center mx-auto px-32 py-3 rounded-xl">
                    <p className={`${showUserDataScreen == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={toggleUserData}>Dados pessoais</p>
                    <p className={`${showBiographyScreen == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={toggleBiography}>Biografia</p>
                    <p>Suas publicações</p>
                </div>

                <div className={`flex flex-col items-center gap-6 ${showUserDataScreen == false ? 'hidden' : ''}`}>
                    {userData &&
                        (
                            <UserDataScreen photoUrl={userData.avatarUri} email={userData.email} name={userData.name} username={userData.username} />
                        )
                    }
                </div>

                <div className="flex flex-col items-center gap-6 mt-20">
                    {showBiographyScreen &&
                        (
                            <Biography />
                        )
                    }
                </div>
            </Section>
        </div>
    )
}