import Format from '../../layout/format'
import Author from '../../components/_child/author'
import Image from 'next/image'
import Ralated from '../../components/_child/ralated'
import getTopics from '../../lib/helper_2'
import fetcher from '../../lib/fetcher';
import Spinner from '../../components/_child/spinner'
import ErrorComponent from '../../components/_child/error'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'

export default function Page({ fallback }) {

    const router = useRouter()
    const { topicId } = router.query;
    const { data, isLoading, isError } = fetcher(`api/topics/${topicId}`)

    if (isLoading) return <Spinner></Spinner>
    if (isError) return <ErrorComponent></ErrorComponent>

    return (
        <SWRConfig value={{ fallback }}>
            <Article {...data}></Article>
        </SWRConfig>
    )

}

function Article({ title, img, requirements, subtitle, description, author }) {

    return (
        <Format>
            <section className='container mx-auto md:px-2 py-16 w-1/2'>
                <div className='flex justify-center'>
                    {author ? <Author {...author}></Author> : <></>}
                </div>

                <div className="post py-10">
                    <h1 className='font-bold text-4xl text-center pb-5'>{title || "No Title"}</h1>

                    <p className='text-gray-500 text-xl text-center'>{subtitle || "No Title"}</p>

                    <div className="py-10">
                        <Image src={img || "/"} width={900} height={600} alt="Card Image"></Image>
                    </div>
                    <h1 className='font-bold text-4xl text-center pb-5'>Requerimientos:</h1>
                    {
                        requirements.map(item => <li key={item}>{item}</li>)
                    }

                    <h1 className='font-bold text-4xl text-center pb-5'>Descripción</h1>
                    <div className="content text-gray-600 text-lg flex flex-col gap-4">
                        {description || "No Description"}
                    </div>

                </div>

                <Ralated></Ralated>
            </section>
        </Format>
    )
}


export async function getStaticProps({ params }) {
    const topics = await getTopics(params.topicId)

    return {
        props: {
            fallback: {
                '/api/topics': topics
            }
        }
    }
}

export async function getStaticPaths() {
    const topics = await getTopics();
    const paths = topics.map(value => {
        return {
            params: {
                topicId: value.id.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }

}