import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { api } from "../../services/api";
import { useAuth } from "./authContext";

export const PublicationContext = createContext({})

export function PublicationProvider({ children }: { children: ReactNode }) {

    const { token }: any = useAuth()

    async function deletePost(id: string, token: string) {
        await api.delete(`/publications/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async function likeManager(publications: PublicationProps[], authUserId: string, postId: string) {

        const publication = publications.find((publi) => publi.postId === postId);

        if (!publication) {
            console.log('Publicação não encontrada');
            return;
        }

        const likedByCurrentUser = publication.likes?.some((like) => like.userId === authUserId);

        try {
            if (likedByCurrentUser) {
                await api.delete(`/like/${authUserId}/${postId}`)
                    .then(() => console.log("Like removido"))

            } else {
                await api.post(`/like/${authUserId}/${postId}`)
                    .then(() => console.log("Curtido com sucesso"))
            }

        } catch (error) {

            console.log('Erro inesperado:', error);
        }
    }

    async function createComment(comment: string, postId: string) {
        const commentRequestBody = {
            content: comment
        }

        await api.post(`/publications/comment/${postId}`, commentRequestBody, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => console.log("Comentário criado"))

        return false // Return to set isLoading how false
    }

    async function deleteComment(postId: string, commentId: string) {
        const result = confirm("Confirma para deletar o comentário")

        if (result) {
            await api.delete(`/publications/comment/${postId}/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => console.log("Deletado"))
        } else {
            console.log("Não deletado")
        }
    }

    return (
        <PublicationContext.Provider value={{ deletePost, likeManager, createComment, deleteComment }}>
            {children}
        </PublicationContext.Provider>
    )
}

export function usePublicationManager() {
    const context = useContext(PublicationContext)

    return context
}