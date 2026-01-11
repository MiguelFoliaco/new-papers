import { AuthorProfilePage } from '@/module/author'
import { getInfoUser } from '@/module/author/actions/get-info-user'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'


type Props = {
    params: Promise<{ username: string }>
}
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const username = (await params).username
    const dataUser = await getInfoUser(username)

    if (!dataUser.data) {
        console.log('No hay metadata :(')
        return {
            title: 'Autor no encontrado | New Papers',
            description: 'El autor que buscas no existe o no está disponible.',
            robots: {
                index: false,
                follow: false,
            },
        }
    }

    const { user, news } = dataUser.data

    const title = `${user.username} | Autor en New Papers`
    const description =
        user.bio ||
        `Perfil del autor ${user.username}. Artículos, publicaciones y actividad.`

    const profileUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/author/${user.username}`

    return {
        title,
        description: `${description} \n N° posts: ${news?.length}`,

        alternates: {
            canonical: profileUrl,
        },

        openGraph: {
            title,
            description,
            url: profileUrl,
            siteName: 'New Papers',
            type: 'profile',
            images: [
                {
                    url: user.avatar || '/og-default-author.png',
                    width: 1200,
                    height: 630,
                    alt: user.username,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [user.avatar || '/og-default-author.png'],
        },
    }
}


const PageAuthor = async ({ params }: Props) => {

    const username = (await params).username
    const dataUser = await getInfoUser(username)

    if (!dataUser.data) return notFound()

    return (
        <>
            <AuthorProfilePage
                info={dataUser.data}
            />
        </>
    )
}




export default PageAuthor