import { Friend } from "../components/Friend"
import { Menu } from "../components/Menu"
import { Section } from "../components/Section"
import { useEffect, useState } from "react"
import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"

export const Friends = function () {
    const [followingUsernames, setFollowingUsernames] = useState<[]>([])
    const [users, setUsers] = useState<User[]>([])

    const { authEmail }: any = useAuth()

    useEffect(() => {
        async function fetchFollowingUsers() {
            const email: string = authEmail.replace(/"/g, "");

            const response = await api.get(`/user/email?email=${email}`);
            const data = response.data;


            const usernames = data.following.map((user: any) => user.username);
            setFollowingUsernames(usernames);
        }

        fetchFollowingUsers();
    }, [])

    useEffect(() => {
        async function fetchFollowingsUsersData() {
            if (followingUsernames.length > 0) {
                const allUsers: User[] = [];

                for (const username of followingUsernames) {
                    const response = await api.get(`/user/username?username=${username}`)
                    const data: User = response.data
                    allUsers.push(data)
                }
                setUsers(allUsers)
            }

        }

        fetchFollowingsUsersData()

    }, [followingUsernames])

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex ">

            <Menu />

            <Section>
                <h2 className="font-bold text-lg text-white pl-5 mb-4 mobile:text-center">Amigos</h2>

                <div className="overflow-x-auto h-[775px] notebook:max-h-[480px]">

                    {
                        users && users.length > 0 &&
                        users.map((data) => (
                            <Friend following={data.following} follows={data.followers} name={data.name} key={data.id} photoUrl={data.avatarUri} />
                        ))
                    }
                </div>
            </Section>
        </div>
    )
}