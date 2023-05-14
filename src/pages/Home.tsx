import { Menu } from "../components/Menu"
import { Post } from "../components/Post"

export const Home = function () {

    const url = 'https://www.github.com/LuanC14.png'

    return (
        <div className="w-screen min-h-screen bg-gray-900 flex">

            <Menu />

            <div className="pt-3 flex flex-col flex-1">
                <h2 className="font-bold text-lg text-white pl-5 mb-4">Página Inicial</h2>

                <div className="flex items-center pl-5 mb-4">
                    <img className="  w-[50px] h-[50px] rounded-full mr-4" src={url} alt="" />
                    <p className="font-bold text-white text-lg">Luan Chrystian</p>
                </div>

                <div className="overflow-x-auto h-[600px] s:max-h-[410px]">

                    <Post
                        name="Luan Chrystian"
                        profile={url}
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laborum voluptatibus maxime, sed sequi non natus iste numquam inventore quia libero et incidunt quam ipsa quasi cumque nostrum possimus suscipit."
                        likes={5}
                        comments={10} />

                    <Post
                        name="Luan Chrystian"
                        profile={url}
                        image={url}
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laborum voluptatibus maxime, sed sequi non natus iste numquam inventore quia libero et incidunt quam ipsa quasi cumque nostrum possimus suscipit."
                        likes={5}
                        comments={10} />
                </div>

            </div>

        </div>
    )
}