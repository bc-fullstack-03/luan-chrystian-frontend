import { Menu } from "../components/Menu"
import { PostFeed } from "../components/PostFeed"
import { Section } from "../components/Section"
import { User } from "../components/User"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { useAuth } from "../hooks/auth"
import { ExitButton } from "../components/ExitButton"

export const Home = function () {
    const [myData, setMyData] = useState<User>()
    const [followingIds, setFollowingIds] = useState<any[]>([])
    const [publications, setPublications] = useState<PublicationProps[]>([]);

    const { authEmail, token }: any = useAuth()

    function verifyAuthorIdPostToShowDeleteButton(authorPostId: string) {

        if (myData?.id !== authorPostId) {
            return false
        } else {
            return true
        }
    }

    async function handleDeletePost(id: string) {

        await api.delete(`/publications/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    useEffect(() => {

        async function fetchMyData() {
            const email: string = authEmail.replace(/"/g, "")
            const response = await api.get(`/user/email?email=${email}`)
            console.log(response)
            setMyData(response.data)
            console.log(myData)
        }

        fetchMyData()

        async function getIdUsersIFollow() {
            const email: string = authEmail.replace(/"/g, "");
            const response = await api.get(`/user/email?email=${email}`);
            const myId = response.data.id;
            const following = response.data.following;

            if (following != null) {
                const ids = following.map((user: any) => user.id);
                return setFollowingIds([myId, ...ids]);

            } else {
                setFollowingIds([myId]);
            }
        }

        getIdUsersIFollow()
    }, [])

    useEffect(() => {
        async function getPublications() {

            const ids = followingIds

            if (ids.length != 0) {
                let posts: PublicationProps[] = [];

                for (const id of ids) {
                    const response = await api.get(`publications/all/${String(id)}`)
                    const userPosts = response.data;
                    posts = posts.concat(userPosts);
                }

                const filteredPublications = posts.filter((post, index, self) => {
                    return Object.keys(post).length !== 0
                })

                setPublications(filteredPublications)
            }
        }

        getPublications()

    }, [publications, followingIds, myData])

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">
            <Menu />

            <Section>
                <div className="border-b border-gray-300  pl-5 pb-5">
                    <h2 className="font-bold text-lg text-white mb-4 mobile:text-center">Página Inicial</h2>
                    
                    <User name={myData?.username} photoUrl={myData?.avatarUri} />

                    <ExitButton />

                </div>

                <div className="overflow-x-auto h-[688px] notebook:max-h-[410px]">

                    {publications &&

                        publications.map((data
                        ) => (
                            <PostFeed
                                key={data.postId}
                                photoProfileUrl={data.photoProfile}
                                name={data.username}
                                text={data.contentText}
                                image={data.contentImage}
                                to={data.postId}
                                deletePubli={() => handleDeletePost(data.postId)}
                                verifyIdAuthorPost={verifyAuthorIdPostToShowDeleteButton(data.authorId)}
                            />
                        ))
                    }
                </div>
            </Section>

        </div>
    )
}