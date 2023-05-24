import { MouseEventHandler } from "react";

export interface CommentComponentProps {
    author: string
    photoProfile: string
    authorCommentId: string
    comment: string
    deleteComment: MouseEventHandler<SVGSVGElement>
}