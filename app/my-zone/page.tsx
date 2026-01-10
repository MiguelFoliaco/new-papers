import { HomeUser } from "@/module/home-user"
import { ProfilePage } from "@/module/profile/components"
import { Studio } from "@/module/studio"
import { Menu } from "@/module/studio/components/menu"


type ServerProps = {
    searchParams: Promise<{ tab?: string }>
}

const queryByPage = {
    'home': HomeUser, // home
    'studio': Studio,
    'profile': ProfilePage
}

const PageProfile = async (props: ServerProps) => {
    const tab = (await props.searchParams)?.tab as keyof typeof queryByPage

    const El = queryByPage[tab || 'home']
    return (
        <div>
            {
                El &&
                <El
                    leftMenu={
                        <Menu
                            activeItem={tab}
                        />
                    }
                />
            }
        </div>
    )
}


export default PageProfile