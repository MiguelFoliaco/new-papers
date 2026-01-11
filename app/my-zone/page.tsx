import { HomeUser } from "@/module/home-user"
import { getUserConfig } from "@/module/profile/actions/get-user-config"
import { ProfilePage } from "@/module/profile/components"
import { RequestEditor } from "@/module/request-editor"
import { Studio } from "@/module/studio"
import { Menu } from "@/module/studio/components/menu"


type ServerProps = {
    searchParams: Promise<{ tab?: string }>
}

const queryByPage = {
    'home': HomeUser, // home
    'studio': Studio,
    'profile': ProfilePage,
    'make-an-request-editor': RequestEditor
}

const PageProfile = async (props: ServerProps) => {
    let tab = (await props.searchParams)?.tab as keyof typeof queryByPage
    const userConfig = await getUserConfig()
    if (userConfig.data == null) {
        tab = 'profile'
    }
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