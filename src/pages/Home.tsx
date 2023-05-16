import { Menu } from "../components/Menu"
import { PostFeed } from "../components/PostFeed"
import { Section } from "../components/Section"
import { User } from "../components/User"

export const Home = function () {

    const me = 'https://www.github.com/LuanC14.png'
    const photoUrl = 'https://www.github.com/rodrigorgtic.png'

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">

            <Menu />

            <Section>
                <div className="border-b border-gray-300  pl-5 pb-5">
                    <h2 className="font-bold text-lg text-white mb-4 mobile:text-center">Página Inicial</h2>
                    <User name="Luan Chrystian" photoUrl={me} />
                </div>

                <div className="overflow-x-auto h-[688px] notebook:max-h-[410px]">

                    <PostFeed
                        name="Rodrigo Gonçalves"
                        photoUrl={photoUrl}
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laborum voluptatibus maxime, sed sequi non natus iste numquam inventore quia libero et incidunt quam ipsa quasi cumque nostrum possimus suscipit."
                        likes={5}
                        comments={10} />

                    <PostFeed
                        name="Rodrigo Gonçalves"
                        photoUrl={photoUrl}
                        image={me}
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laborum voluptatibus maxime, sed sequi non natus iste numquam inventore quia libero et incidunt quam ipsa quasi cumque nostrum possimus suscipit."
                        likes={5}
                        comments={10} />

                    <PostFeed
                        name="Rodrigo Gonçalves"
                        photoUrl={photoUrl}
                        image={me}
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laborum voluptatibus maxime, sed sequi non natus iste numquam inventore quia libero et incidunt quam ipsa quasi cumque nostrum possimus suscipit."
                        likes={5}
                        comments={10} />
                </div>
            </Section>

        </div>
    )
}