import { Trash } from "phosphor-react";
import { User } from "./User";
import { MouseEventHandler } from "react";

interface CommentProps {
    author: string
    photoProfile: string
    userId: string
    comment: string
    deleteComment: MouseEventHandler<SVGSVGElement>
}

export function Comment({ author, photoProfile, userId, comment, deleteComment }: CommentProps) {

    return (

        <div className="flex items-center gap-3">
            <div className="border border-b-8 rounded-full border-black px-4 py-4 bg-gray-900">
                <User name={author} photoUrl={photoProfile} key={userId} />
                <p className="ml-16 text-white">{comment}</p>
            </div>

            <Trash className="text-white" onClick={deleteComment} size={20} />
        </div>



    )
}