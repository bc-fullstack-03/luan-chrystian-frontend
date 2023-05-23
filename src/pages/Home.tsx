import { Menu } from "../components/Menu"
import { PostFeed } from "../components/PostFeed"
import { Section } from "../components/Section"
import { User } from "../components/User"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"
import { usePublicationManager } from "../hooks/contexts/publicationContext"
import { ExitButton } from "../components/ExitButton"
import { useDataUser } from "../hooks/contexts/UserContext"
import { UserProps } from "../components/types/UserProps"

export const Home = function () {
    const [myData, setMyData] = useState<User>()
    const [followingIds, setFollowingIds] = useState<any[]>([])
    const [publications, setPublications] = useState<PublicationProps[]>([]);

    const { authEmail, token }: any = useAuth()
    const { deletePost, likeManager }: any = usePublicationManager()
    // const { data }: any = useDataUser()

    function verifyAuthorIdPostToShowDeleteButton(authorPostId: string) { return myData?.id == authorPostId ? true : false }

    useEffect(() => {

        async function fetchMyData() {
            const email: string = authEmail.replace(/"/g, "")
            const response = await api.get(`/user/email?email=${email}`)
            setMyData(response.data)
        }

        fetchMyData()

        async function getIdUsersIFollow() {
            const email: string = authEmail.replace(/"/g, "");
            const response = await api.get(`/user/email?email=${email}`);
            console.log(response.data)
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

                    {myData &&
                        (
                            <User name={myData.username} photoUrl={myData.avatarUri} />
                        )
                    }


                    <ExitButton />

                </div>

                <div className="overflow-x-auto h-[688px] notebook:max-h-[410px]">

                    {publications &&

                        publications.map((data
                        ) => (
                            <PostFeed
                                key={data.postId}
                                postId={data.postId}
                                name={data.username}
                                photoProfileUrl={data.photoProfile}
                                text={data.contentText}
                                image={data.contentImage}
                                verifyIdAuthorPost={verifyAuthorIdPostToShowDeleteButton(data.authorId)}
                                comments={data.comments?.length}
                                likes={data.likes?.length}
                                handleLike={() => likeManager(publications, myData?.id, data.postId)}
                                deletePubli={() => deletePost(data.postId, token)}
                            />
                        ))
                    }
                </div>
            </Section>

        </div>
    )
}