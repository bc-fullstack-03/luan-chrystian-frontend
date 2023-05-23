import { useEffect, useState } from "react"

import { Friend } from "../components/Friend"
import { Section } from "../components/Section"
import { Menu } from "../components/Menu"
import { Input } from "../components/Input"
import { MagnifyingGlassPlus } from "phosphor-react"

import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"

export const Social = function () {
    const [inputSearchValue, setInputSearchValue] = useState<string>('*')
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [following, setFollowing] = useState<User[]>([])
    const [followers, setFollowers] = useState<User[]>([])
    const [showSearch, setShowSearch] = useState<boolean>(true)
    const [showFollowers, setShowFollowers] = useState<boolean>(false)
    const [showFollowings, setShowFollowings] = useState<boolean>(false)

    const { token, user, authEmail }: any = useAuth()

    function handleToggleFollowings() {
        setShowFollowings(!showFollowings)
        setShowFollowers(false)
        setShowSearch(false)
    }

    function handleToggleFollowers() {
        setShowFollowers(!showFollowers)
        setShowFollowings(false)
        setShowSearch(false)
    }

    function handleToggleSearch() {
        setShowSearch(!showSearch)
        setShowFollowers(false)
        setShowFollowings(false)
    }

    async function handleFollows(followerId: string) {
        const alreadyFollowing = following?.find(data => data.id === followerId)

        if (followerId == user) { alert("Você não pode se seguir") }

        if (alreadyFollowing) {

            await api.delete(`/follows/${followerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then(() => console.log("Usuário removido"))

        } else {
            await api.post(`/follows/${followerId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then(() => console.log("Usuário seguido"))
        }
    }

    useEffect(() => {
        function showSearchScreenIfothersAreHidden() {
            if (!showFollowers && !showFollowings && !showSearch) {
                setShowSearch(true)
            }
        }
        showSearchScreenIfothersAreHidden()
    }, [showFollowers, showFollowings, showSearch])

    useEffect(() => {
        async function fetchFollowsAndFollowings() {
            const email = authEmail.replace(/"/g, "");

            try {
                const data = await api.get(`/user/email?email=${email}`)
                    .then((res) => res.data)

                const followingUsernames = data.following?.map((user: User) => user.username) ?? [];
                const followersUsernames = data.followers?.map((user: User) => user.username) ?? [];

                if (followingUsernames.length > 0) {
                    const allFollowings = [];

                    for (const username of followingUsernames) {
                        const response = await api.get(`/user/username?username=${username}`);
                        const data = response.data;
                        allFollowings.push(data);
                    }
                    allFollowings ? setFollowing(allFollowings) : 'wait'
                }

                if (followersUsernames.length > 0) {
                    const allFollowers = [];

                    for (const username of followersUsernames) {
                        const response = await api.get(`/user/username?username=${username}`);
                        const data = response.data;
                        allFollowers.push(data);
                    }
                    setFollowers(allFollowers);
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchFollowsAndFollowings();

    }, [followers, following])

    useEffect(() => {
        async function testAllFetchUser() {
            inputSearchValue.length <= 0 ? setInputSearchValue('*') : ''

            try {
                await api.get(`/user/all/${inputSearchValue}`)
                    .then((res) => setAllUsers(res.data))

            } catch (error) {
                console.log(error)
            }
        }
        testAllFetchUser()
    }, [inputSearchValue])

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex ">
            <Menu />

            <Section>
                <div className="flex gap-12 bg-black text-gray-300 items-center justify-center mx-auto px-32 py-3 rounded-xl">
                    <p className={`${showSearch == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={handleToggleSearch}>Buscar</p>
                    <p className={`${showFollowers == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={handleToggleFollowers} >Seguidores</p>
                    <p className={`${showFollowings == true ? 'text-cyan-500' : 'text-gray-300'}`} onClick={handleToggleFollowings}>Seguindo</p>
                </div>

                <div className={`overflow-x-auto h-[775px] notebook:max-h-[480px] ${showFollowings ? '' : 'hidden'} `}>
                    {
                        following &&
                        following.map((data) => (
                            <Friend
                                name={data.name} key={data.id}
                                handle={() => handleFollows(data.id)}
                                following={data.following}
                                follows={data.followers}
                                photoUrl={data.avatarUri}
                            />
                        ))
                    }
                    <p className={`text-center mt-[150px] text-white font-bold ${following ? 'hidden' : ''}`}>Você não está seguindo ninguém</p>
                </div>

                <div className={`overflow-x-auto h-[775px] notebook:max-h-[480px] ${showFollowers ? '' : 'hidden'}`}>
                    {
                        followers && followers.length > 0 &&
                        followers.map((data) => (
                            <Friend
                                following={data.following}
                                follows={data.followers}
                                name={data.name}
                                handle={() => handleFollows(data.id)}
                                key={data.id}
                                photoUrl={data.avatarUri} />
                        ))
                    }
                    <p className={`text-center mt-[150px] text-white font-bold ${followers.length <= 0 ? '' : 'hidden'}`}>Você ainda não possui seguidores</p>
                </div>

                <div className={`overflow-x-auto h-[775px] notebook:max-h-[480px] ${showSearch ? '' : 'hidden'}`}>

                    <div className="w-[600px] mx-auto pt-8">
                        <Input
                            placeholder="Digite o nome do usuário"
                            onChange={(event: any) => setInputSearchValue(event.target.value)}
                            title="Procurar usuários"
                            icon={MagnifyingGlassPlus}
                        />

                    </div>
                    {
                        allUsers && allUsers.length > 0 &&

                        allUsers.map((data) => (
                            <Friend
                                handle={() => handleFollows(data.id)}
                                following={data.following} follows={data.followers}
                                name={data.name}
                                key={data.id}
                                photoUrl={data.avatarUri} />
                        ))
                    }
                </div>
            </Section>
        </div>
    )
}