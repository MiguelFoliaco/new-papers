import { getUserConfigByUsername } from "@/module/profile/actions/get-user-config";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const runtime = 'edge';
export const size = {
    width: 1200,
    height: 630
}

export const contentType = 'image/png';

type Props = {
    params: Promise<{ username: string }>
}

export default async function OpenGraphImage({ params }: Props) {

    const username = (await params).username
    const user = await getUserConfigByUsername(username)
    console.log('AQUI we')
    if (!user.data) return notFound()

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: '#000000',
                    backgroundImage: `url(${user.data.cover_image_url})`,
                    backgroundSize: 'cover',
                }}
            >
                <div
                    style={{
                        fontSize: 100,
                        color: 'white',
                        marginTop: 100,
                    }}
                >
                    {user.data.username}
                </div>
            </div>
        ),
        size
    )
}