import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { api } from "../../services/api";

interface PublicationProviderProps {
    children: ReactNode
}

export const PublicationContext = createContext({})


export function PublicationProvider({ children }: PublicationProviderProps) {

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

    return (
        <PublicationContext.Provider value={{ deletePost, likeManager }}>
            {children}
        </PublicationContext.Provider>
    )
}

export function usePublicationManager() {
    const context = useContext(PublicationContext)

    return context
}