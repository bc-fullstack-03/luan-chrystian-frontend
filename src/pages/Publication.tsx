import { useEffect, useState } from "react";

import { Menu } from "../components/Menu";
import { Section } from "../components/Section";
import { User } from "../components/User";
import { TextArea } from "../components/TextArea";
import { Comment } from "../components/Comment";
import { Button } from "../components/Button";

import { api } from "../services/api";
import { usePublicationManager } from "../hooks/contexts/publicationContext";

export function Publication() {
    const [publiData, setPubliData] = useState<PublicationProps>()
    const [comment, setComment] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { createComment, deleteComment }: any = usePublicationManager()

    const params = new URLSearchParams(location.search);
    const publiParam = params.get('id')

    async function handleCreateComment() {
        setIsLoading(true)
        const response = await createComment(comment, publiParam)
        setIsLoading(response)
        setComment('')
    }

    async function handleDeleteComment(postId: string, commentId: string) { deleteComment(postId, commentId) }

    useEffect(() => {
        async function fetchPubli() {
            const response = await api.get(`/publications/${publiParam}`)
            setPubliData(response.data)
        }
        fetchPubli()
    }, [publiData])

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">
            <Menu />

            <Section>
                <h2 className="font-bold text-lg text-white pl-5 mb-4 mobile:text-center">Publicação</h2>

                <div className="overflow-x-auto h-[780px] notebook:h-[490px] border-t border-gray-300">

                    {publiData &&
                        (
                            <div className=" pt-10 text-white">

                                <div className="pl-5">
                                    <User name={publiData.nameAuthor} photoUrl={publiData.photoProfile} />
                                </div>

                                <div>
                                    <p className="text-md text-start pt-8 pl-5"> {publiData.contentText} </p>

                                    <img
                                        className={`bg-cover h-[320px] pl-5 rounded-lg mt-8 mb-8 ${publiData.contentImage ? '' : 'hidden'}`}
                                        src={publiData.contentImage}
                                        alt=""
                                    />
                                </div>
                                <p className="pl-5">{new Date(publiData.created_at).toLocaleString()}</p>
                            </div>
                        )
                    }

                    <div className=" flex flex-col mt-10 border-t pt-4 border-gray-300">

                        <div>
                            <h2 className="text-lg text-white mb-4 font-bold pl-5">Comentários</h2>
                        </div>

                        <div className="flex flex-col gap-2 ml-5 py-5 px-5 border-l-4 border-gray-300 w-[850px] rounded-xl ">
                            <p className={` text-white font-bold  ${publiData?.comments?.length == 0 ? '' : 'hidden'}`}>Seja o primeiro a comentar</p>

                            {
                                publiData?.comments &&

                                publiData.comments.map(comment => (
                                    <Comment
                                        author={comment.nameAuthor}
                                        photoProfile={comment.photoProfileUri}
                                        authorCommentId={comment.authorId}
                                        comment={comment.content}
                                        key={comment.id}
                                        deleteComment={() => { handleDeleteComment(comment.postId, comment.id) }}
                                    />
                                ))
                            }
                        </div>

                        <div className="pl-5 mt-8">
                            <TextArea value={comment} height="h-[145px]" title="Comentar" onChange={(event): any => setComment(event.target.value)} />
                        </div>

                        <div className="pl-5 pb-4 mt-1 max-w-[180px]" >
                            <Button disabled={isLoading} title={`${isLoading ? 'Carregando' : 'Comentar'}`} onClick={handleCreateComment} />
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    )
}