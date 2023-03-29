import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import Image from "next/image"
import Author from "./_child/author"
import fetcher from '../lib/fetcher'
import Spinner from "./_child/spinner"
import Error from "./_child/error"

import { useEffect, useState } from 'react';


export default function Section3() {
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
                const response = await fetch('http://localhost:3000/api/popular');
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

    // const { data, isLoading, isError } = fetcher('api/popular')

    // if (isLoading) return <Spinner></Spinner>;
    // if (isError) return <Error></Error>

    return (
        <section className="container mx-auto md:px-20 py-16">
            <h1 className="font-bold text-4xl py-12 text-center">Nuestros Temarios</h1>

            {/* swiper */}
            <Swiper
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    }
                }}
            >
                {
                    data.map((value, index) => (
                        <SwiperSlide key={index}><Post data={value}></Post></SwiperSlide>
                    ))
                }
            </Swiper>

        </section>
    )
}


function Post({ data }) {

    const { id, title, category, img, description, published, author } = data;

    return (
        <div className="grid">
            <div className="images">
                <Link href={`/posts/${id}`}>
                    <a>
                        <Image src={img || ""} width={600} height={400} alt="Post image" />
                    </a>
                </Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link href={`/posts/${id}`}><a className="text-orange-600 hover:text-orange-800">{category || "No Category"}</a></Link>
                    <Link href={`/posts/${id}`}><a className="text-gray-800 hover:text-gray-600">- {published || ""}</a></Link>
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`}><a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">{title || "No Title"}</a></Link>
                </div>
                <p className="text-gray-500 py-3">
                    {description || "No Description"}
                </p>
                {author ? <Author {...author}></Author> : <></>}
            </div>
        </div>
    )
}