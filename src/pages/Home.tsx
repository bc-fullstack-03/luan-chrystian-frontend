import { useEffect, useState } from 'react'

import { Menu } from "../components/Menu"
import { PostFeed } from "../components/PostFeed"
import { Section } from "../components/Section"
import { User } from "../components/User"

import { api } from "../services/api"
import { useAuth } from "../hooks/contexts/authContext"
import { usePublicationManager } from "../hooks/contexts/publicationContext"

export const Home = function () {
    const [myData, setMyData] = useState<User>()
    const [followingIds, setFollowingIds] = useState<string[]>([])
    const [publications, setPublications] = useState<PublicationProps[]>([]);

    const { authEmail, token }: any = useAuth()
    const { deletePost, likeManager }: any = usePublicationManager()

    function verifyAuthorIdPostToShowDeleteButton(authorPostId: string) { return myData?.id == authorPostId ? true : false }

    useEffect(() => {
        async function fetchMyData() {
            const email: string = authEmail.replace(/"/g, "")

            try {
                const response = await api.get(`/user/email?email=${email}`)
                setMyData(response.data)

            } catch (error) {
                console.log("Error in fetchMyData function on page Home.tsx" + error)
            }
        }
        fetchMyData()

        async function getIdOfUsersIfollow() {
            const email: string = authEmail.replace(/"/g, "");

            try {
                const response = await api.get(`/user/email?email=${email}`);
                const myId = response.data.id;
                const followings = response.data.following;

                if (followings != null) {
                    const ids = followings.map((user: Following) => user.id);
                    return setFollowingIds([myId, ...ids]); // I need my ID too because i want show my publications in feed

                } else {
                    setFollowingIds([myId]);
                }
            } catch (error) {
                console.log("Error in getIdOfUsersIfollow function on page Home.tsx")
            }
        }
        getIdOfUsersIfollow()
    }, [myData])

    useEffect(() => {
        async function getPublications() {
            const ids = followingIds

            try {
                if (ids.length != 0) {
                    let posts: PublicationProps[] = [];

                    for (const id of ids) {
                        const response = await api.get(`publications/all/${id}`)
                        posts = posts.concat(response.data);
                    }

                    const filteredPublications = posts.filter((post, index, self) => {
                        return Object.keys(post).length !== 0
                    })

                    setPublications(filteredPublications)
                }

            } catch (error) {
                console.log("Error in getPublications function on page home.tsx " + error)
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