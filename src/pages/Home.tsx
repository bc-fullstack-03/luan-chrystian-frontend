import { Menu } from "../components/Menu"
import { PostFeed } from "../components/PostFeed"
import { Section } from "../components/Section"
import { User } from "../components/User"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { useAuth } from "../hooks/auth"

export const Home = function () {
    const [myData, setMyData] = useState<User>()
    const [followingIds, setFollowingIds] = useState<[]>([])
    const [publications, setPublications] = useState<PublicationProps[]>([]);

    const { authEmail }: any = useAuth()

    useEffect(() => {

        async function fetchMyData() {
            const email: string = authEmail.replace(/"/g, "")

            const response = await api.get(`/user/email?email=${email}`)

            setMyData(response.data)
        }

        fetchMyData()

        async function getIdUsersIFollow() {
            const email: string = authEmail.replace(/"/g, "")

            await api.get(`/user/email?email=${email}`)
                .then(res => res.data.following)
                .then(data => {
                    const ids = data.map((user: any) => user.id)
                    setFollowingIds(ids)
                })
        }
        getIdUsersIFollow()
    }, [])

    useEffect(() => {
        async function getPublications() {

            const ids = followingIds

            if (ids.length != 0) {
                let posts: PublicationProps[] = [];


                for (const id of ids) {
                    posts = await api.get(`publications/all/${String(id)}`)
                        .then(res => res.data)
                }

                const filteredPublications = posts.filter((post, index, self) => {
                    return Object.keys(post).length !== 0
                })

                setPublications(filteredPublications)
            }
        }

        getPublications()

    }, [followingIds])

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">

            <Menu />

            <Section>
                <div className="border-b border-gray-300  pl-5 pb-5">
                    <h2 className="font-bold text-lg text-white mb-4 mobile:text-center">Página Inicial</h2>
                    <User name={myData?.name} photoUrl={myData?.avatarUri} />
                </div>

                <div className="overflow-x-auto h-[688px] notebook:max-h-[410px]">

                    {publications &&

                        publications.map((data
                        ) => (
                            <PostFeed
                                photoUrl={data.photoProfileAuthor}
                                name={data.nameAuthor}
                                text={data.contentText}
                                image={data.contentImage}
                                key={data.postId}
                            />
                        ))
                    }
                </div>
            </Section>

        </div>
    )
}