import { Trash } from "phosphor-react";
import { User } from "./User";
import { useAuth } from "../hooks/contexts/authContext";
import { CommentComponentProps } from "../types/components/CommentProps";

export function Comment({ author, photoProfile, authorCommentId, comment, deleteComment }: CommentComponentProps) {

    const { user }: any = useAuth()

    return (

        <div className="flex items-center gap-3">
            <div className="border border-b-8 rounded-full border-black px-6 py-4 bg-gray-900">
                <User name={author} photoUrl={photoProfile} key={authorCommentId} />
                <p className="ml-16 text-white pr-8">{comment}</p>
            </div>

            <Trash className={`text-white cursor-pointer ${ authorCommentId != user ? 'hidden' : ''}`} onClick={deleteComment} size={20} />
        </div>



    )
}