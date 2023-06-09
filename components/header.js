import { ImGithub, ImTwitter, ImYoutube } from "react-icons/im";
import Link from 'next/link'

export default function header() {
    return (
        <header className="bg-gray-50">
            <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
                <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
                    <div className="flex gap-6">
                        <Link href={"/"}>
                            <a className="uppercase text-1xl">Blog</a>
                        </Link>
                        <Link href={"/"}>
                            <a className="uppercase text-1xl">Temario</a>
                        </Link>
                    </div>
                </div>
                <div className="shrink w-180 sm:order-2">
                    <Link href={"/"}>
                        <a className="font-bold uppercase text-3xl">EAFITNanciera</a>
                    </Link>
                </div>
                <div className="w-96 order-3 flex justify-center">
                    <div className="flex gap-6">
                        <Link href={"https://github.com/MiniHackaton-Nodo-2023/EAFITnanciera"}><a><ImGithub color="#888888" /></a></Link>
                        <Link href={"https://twitter.com/jmyounghoyos"}><a><ImTwitter color="#888888" /></a></Link>
                        <Link href={"https://www.youtube.com/@juanmanuelyounghoyos7350"}><a><ImYoutube color="#888888" /></a></Link>
                    </div>
                </div>
            </div>
        </header >
    )
}
