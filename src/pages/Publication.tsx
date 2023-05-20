import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Section } from "../components/Section";
import { api } from "../services/api";

import { User } from "../components/User";

export function Publication() {
    const [publiData, setPubliData] = useState<PublicationProps>()

    const params = new URLSearchParams(location.search);


    useEffect(() => {
        async function fetchPubli() {
            const publiParam = params.get('id')

            const response = await api.get(`/publications/${publiParam}`)
            setPubliData(response.data)
        }

        fetchPubli()
    }, [])

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">
            <Menu />

            <Section>
                <h2 className="font-bold text-lg text-white pl-5 mb-4 mobile:text-center">Publicação</h2>


                <div className="overflow-x-auto h-[700px]  notebook:h-[490px] border-t border-gray-300">
                    {publiData &&
                        (
                            <div className="pl-8 pt-10 text-white">
                                <User name={publiData.nameAuthor} photoUrl={publiData.photoProfile} />

                                <div className="">
                                    <p className="text-md text-start pt-8 pb-8">
                                        {publiData.contentText}
                                    </p>

                                    <img className="bg-cover h-auto rounded-lg mb-8" src={publiData.contentImage} alt="" />
                                </div>
                                <p>{new Date(publiData.created_at).toLocaleString()}</p>
                            </div>
                        )

                    }
                </div>



            </Section>
        </div>
    )
}