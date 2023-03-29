import Image from "next/image"
import Link from "next/link"
import Author from "./_child/author"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import fetcher from '../lib/fetcher'
import Spinner from "./_child/spinner"
import Error from "./_child/error"

import { useEffect, useState } from 'react';

function Quote({ data }) {
    const { id, title, subtitle, category, img, published, description, author } = data;

    return (
        <div className="grid md:grid-cols-2">
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    {/* <Link href={`/posts/${id}`}><a className="text-orange-600 hover:text-orange-800">{category || ""}</a></Link>
                    <Link href={`/posts/${id}`}><a className="text-gray-800 hover:text-gray-600">{published || "Unknown"}</a></Link> */}
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`}><a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">{title || "Unknown"}</a></Link>
                </div>
                <p className="text-gray-500 py-3">
                    {subtitle || ""}
                </p>
                <p className="text-gray-500 py-3">
                    {description || "description"}
                </p>
                {author ? <Author {...author}></Author> : <></>}
            </div>
            <div className="image">
                <Link href={`/posts/${id}`}>
                    <a>
                        <Image src={img || "/"} width={600} height={600} alt="Post images" />
                    </a>
                </Link>
            </div>
        </div>
    )
}


function Slide({ data }) {

    const { id, title, subtitle, category, img, published, description, author } = data;

    return (
        <div className="grid md:grid-cols-2">
            <div className="image">
                <Link href={`/posts/${id}`}>
                    <a>
                        <Image src={img || "/"} width={600} height={600} alt="Post images" />
                    </a>
                </Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    {/* <Link href={`/posts/${id}`}><a className="text-orange-600 hover:text-orange-800">{category || "Unknown"}</a></Link>
                    <Link href={`/posts/${id}`}><a className="text-gray-800 hover:text-gray-600">- {published || "Unknown"}</a></Link> */}
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`}><a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">{title || "Unknown"}</a></Link>
                </div>
                <p className="text-gray-500 py-3">
                    {subtitle || ""}
                </p>
                <p className="text-gray-500 py-3">
                    {description || "description"}
                </p>
                {author ? <Author {...author}></Author> : <></>}
            </div>
        </div>
    )
}

export default function Section1() {
    const [quotes, setQuotes] = useState([]);
    const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
    const [isErrorQuotes, setIsErrorQuotes] = useState(false);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    let myQuotes = []

    useEffect(() => {
        const fetchQuotes = async () => {
            setIsLoadingQuotes(true);
            setIsErrorQuotes(false);
            try {
                const response = await fetch('http://localhost:3000/api/quotes');
                const data = await response.json();
                setQuotes(data);
            } catch (error) {
                setIsErrorQuotes(true);
            }
            setIsLoadingQuotes(false);
        };

        const fetchData = async () => {
            setIsError(false);
            try {
                const response = await fetch('http://localhost:3000/api/trending');
                const data = await response.json();
                console.log(data)
                setData(data);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };

        fetchQuotes();
        fetchData();
    }, [isLoading]);

    if (isLoading) return <Spinner></Spinner>;
    if (isError) return <Error></Error>
    if (isLoadingQuotes) return <Spinner></Spinner>;
    if (isErrorQuotes) return <Error></Error>

    SwiperCore.use([Autoplay])

    const bg = {
        background: "url('/images/banner.png') no-repeat",
        backgroundPosition: "right"
    }

    return quotes && data ? (
        <section className="py-16" style={bg}>
            <div className="container mx-auto md:px-20">
                {quotes ? <Quote data={quotes[0]}></Quote> : <h1>No Hay datos</h1>}
            </div>
            <br />
            <br />
            <br />
            <div className="container mx-auto md:px-20">
                <h1 className="font-bold text-4xl pb-12 text-center">Dicho por los Titanes de las Finanzas</h1>

                <Swiper
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 3000
                    }}
                >
                    {
                        quotes.slice(1).map((value, index) => (
                            <SwiperSlide key={index}>
                                <Slide data={value}></Slide>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    ) : <p>Loading</p>
}
