
/* eslint-disable @next/next/no-img-element */
import { getUserConfigByUsername } from "@/module/profile/actions/get-user-config"
import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = "image/png"

type Props = {
    params: Promise<{ username: string }>
}


export default async function OpenGraphImage({ params }: Props) {
    const username = (await params).username
    const user = await getUserConfigByUsername(username)
    if (!user.data) return new ImageResponse(<div>Not found</div>, { width: 1200, height: 630 })

    const avatar = user?.data?.avatar
    const cover = user?.data?.cover_image_url
    const colorBase = "#0f0f0f"
    const colorPrimary = "#58A740"
    const colorSecondary = "#3d8a2e"
    const displayName = username
    const role = "Developer"
    const bio = user?.data?.bio
    const stats = { posts: 47, followers: 1240, views: 15800 }

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                position: "relative",
                backgroundColor: colorBase,
            }}
        >
            {/* Background cover con overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                }}
            >
                <img
                    src={cover || "/placeholder.svg"}
                    alt="cover image"
                    width={size.width}
                    height={size.height}
                    style={{
                        objectFit: "cover",
                        opacity: 0.3,
                    }}
                />
            </div>

            {/* Gradient overlay */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    background: `linear-gradient(135deg, ${colorBase}ee 0%, ${colorBase}cc 50%, ${colorPrimary}44 100%)`,
                }}
            />

            {/* Decorative elements */}
            <div
                style={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colorPrimary}33 0%, ${colorSecondary}11 100%)`,
                    display: "flex",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: -150,
                    left: -150,
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colorSecondary}22 0%, ${colorPrimary}11 100%)`,
                    display: "flex",
                }}
            />

            {/* Main content */}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: "60px 80px",
                    position: "relative",
                }}
            >
                {/* Left side - Avatar */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: 60,
                    }}
                >
                    {/* Avatar container with border */}
                    <div
                        style={{
                            display: "flex",
                            padding: 6,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${colorPrimary} 0%, ${colorSecondary} 100%)`,
                        }}
                    >
                        <img
                            alt="avatar"
                            src={avatar || "/placeholder.svg"}
                            width={200}
                            height={200}
                            style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: `4px solid ${colorBase}`,

                            }}
                        />
                    </div>

                    {/* Username badge */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 20,
                            padding: "10px 24px",
                            borderRadius: 30,
                            backgroundColor: `${colorPrimary}22`,
                            border: `2px solid ${colorPrimary}66`,
                        }}
                    >
                        <span style={{ color: colorPrimary, fontSize: 24, fontWeight: 600 }}>@{username}</span>
                    </div>
                </div>

                {/* Right side - Info */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    {/* Display name */}
                    <div
                        style={{
                            display: "flex",
                            fontSize: 64,
                            fontWeight: 800,
                            color: "#ffffff",
                            marginBottom: 8,
                            lineHeight: 1.1,
                        }}
                    >
                        {displayName}
                    </div>

                    {/* Role */}
                    <div
                        style={{
                            display: "flex",
                            fontSize: 28,
                            fontWeight: 500,
                            color: colorPrimary,
                            marginBottom: 20,
                        }}
                    >
                        {role}
                    </div>

                    {/* Bio */}
                    <div
                        style={{
                            display: "flex",
                            fontSize: 22,
                            color: "#a0a0a0",
                            marginBottom: 36,
                            lineHeight: 1.4,
                            maxWidth: 550,
                        }}
                    >
                        {bio}
                    </div>

                    {/* Stats */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 40,
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <span style={{ fontSize: 36, fontWeight: 700, color: "#ffffff" }}>{stats.posts}</span>
                            <span style={{ fontSize: 16, color: "#808080", marginTop: 4 }}>Publicaciones</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <span style={{ fontSize: 36, fontWeight: 700, color: "#ffffff" }}>
                                {stats.followers >= 1000 ? `${(stats.followers / 1000).toFixed(1)}K` : stats.followers}
                            </span>
                            <span style={{ fontSize: 16, color: "#808080", marginTop: 4 }}>Seguidores</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <span style={{ fontSize: 36, fontWeight: 700, color: "#ffffff" }}>
                                {stats.views >= 1000 ? `${(stats.views / 1000).toFixed(1)}K` : stats.views}
                            </span>
                            <span style={{ fontSize: 16, color: "#808080", marginTop: 4 }}>Vistas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom branding bar */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 80px",
                    backgroundColor: `${colorBase}ee`,
                    borderTop: `1px solid ${colorPrimary}33`,
                }}
            >
                {/* Logo/Brand */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                        style={{
                            display: "flex",
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            backgroundColor: colorPrimary,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <span style={{ color: "#ffffff", fontSize: 20, fontWeight: 700 }}>N</span>
                    </div>
                    <span style={{ color: "#ffffff", fontSize: 20, fontWeight: 600 }}>NewPapers</span>
                </div>

                {/* CTA */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 24px",
                        borderRadius: 8,
                        backgroundColor: colorPrimary,
                    }}
                >
                    <span style={{ color: "#ffffff", fontSize: 18, fontWeight: 600 }}>Ver perfil completo</span>
                </div>
            </div>
        </div>,
        size,
    )
}
