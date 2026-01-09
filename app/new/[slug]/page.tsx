import { NewsPage } from '@/module/news'
import { getNewsBySlug } from '@/module/news/actions/get-new-by-slug';
import { Metadata } from 'next';


type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const slug = (await params).slug
    const news = await getNewsBySlug(slug)

    if (!news.data) {
        return {
            title: 'Noticia no encontrada',
            description: 'La noticia que buscas no existe o fue eliminada'
        }
    }

    return {
        title: news.data.title,
        description: news.data.cover_text ?? 'Noticias globales en New Papers',
        openGraph: {
            title: news.data.title,
            description: news.data.cover_text ?? '',
            images: [
                {
                    url: news.data.cover_image_url!,
                    width: 1200,
                    height: 630
                }
            ],
            type: 'article'
        },
        twitter: {
            card: 'summary_large_image',
            title: news.data.title,
            description: news.data.cover_text ?? '',
            images: [news.data.cover_image_url!]
        }
    }
}


const NewPage = async ({ params }: Props) => {

    const slug = (await params).slug
    const news = await getNewsBySlug(slug);

    return <div className='lg:mx-auto lg:w-[80%] '>
        {
            news.data &&
            <NewsPage news={news.data} />
        }
    </div>
}


export default NewPage