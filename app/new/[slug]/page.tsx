import { NewsPage } from '@/module/news'
import { getNewsBySlug } from '@/module/news/actions/get-new-by-slug';

const NewPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const slug = (await params).slug
    const news = await getNewsBySlug(slug);

    return <div className='mx-auto w-[80%] '>
        {
            news.data &&
            <NewsPage news={news.data} />
        }
    </div>
}


export default NewPage