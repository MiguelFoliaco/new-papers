"use client"

import { useState } from "react"
import { BiCamera, BiCheck, BiEdit, BiLink, BiNews, BiSave, BiShield, BiShieldX, BiUser, BiX } from "react-icons/bi"
import { MdEmail, MdNotifications } from "react-icons/md"
import { FiExternalLink } from "react-icons/fi"
import { User } from "@supabase/supabase-js"
import { useToast } from "@/module/common/hook/useToast"
import { Tables } from "@/supabase/database.types"
import { useTranslations } from "@/languages/context"
import { ButtonFile } from "@/module/common/components/input-file"
import { activeAccount, saveUserConfig, updateImagesUserConfig } from "../actions/save-user-config"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/module/auth/context/useUser"
import { DeactivateAccountModal } from "./modal-requests/disable"

type UserConfig = Tables<'user_config'>

type Props = {
    user: User | null
    userConfig: UserConfig | null
}



export const FormEditUser = ({ user }: Props) => {

    const { t } = useTranslations('profile')
    const router = useRouter()
    const { updateUserConfig, userConfig } = useUser()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [loadingSaveImage, setLoadingSaveImage] = useState(false)
    const [copied, setCopied] = useState(false)
    const { openToast } = useToast()
    const [loadingActiveAcount, setLoadingActiveAcount] = useState(false)

    const initialData = {
        username: userConfig?.username || "",
        bio: userConfig?.bio || "",
        website: userConfig?.website || "",
        accept_newletters_email: userConfig?.accept_newletters_email || false,
        avatar: userConfig?.avatar || "",
        cover_image_url: userConfig?.cover_image_url || "",
        rol: userConfig?.rol || "user",
        updated_at: userConfig?.updated_at || new Date().toISOString(),
        status: userConfig?.status ?? true,
        auth_id: userConfig?.auth_id || "",
        created_at: userConfig?.created_at || new Date().toISOString(),
        id: userConfig?.id || "",
        request_delete: userConfig?.request_delete || false,
        request_delete_text: userConfig?.request_delete_text || "",
    }

    const [formData, setFormData] = useState<UserConfig>(initialData)
    const [disableModalShow, setDisableModalShow] = useState(false)

    console.log(initialData, formData)


    const handleCopyLink = () => {
        if (formData.username === '') return openToast(t('alert-config-copy'), 'warning')
        navigator.clipboard.writeText(`${window.location.origin}/author/${formData.username}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSave = async () => {
        setIsSaving(true)
        // Simular guardado
        const response = await saveUserConfig(formData)

        if (response.data) {
            updateUserConfig(response.data)
        }
        setIsSaving(false)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setFormData(initialData)
        setIsEditing(false)
    }

    const changeImageAvatar = async (type: 'cover' | 'avatar', image: string) => {
        setLoadingSaveImage(true)

        const response = await updateImagesUserConfig(userConfig?.id || '',
            type === 'cover' ? image : formData.cover_image_url!,
            type === 'avatar' ? image : formData.avatar!,
        )
        console.log(response)
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', 'profile')

        router.replace(`${pathname}?${params.toString()}`, { scroll: false })

        if (response.data) {
            updateUserConfig(response.data)
            setFormData(response.data)
        }
        else if (response.status === 'error') {
            openToast(response.msg, 'error')
        }

        setLoadingSaveImage(false)
    }

    const activeUser = async () => {
        setLoadingActiveAcount(true)
        const response = await activeAccount()
        setLoadingActiveAcount(false)

        if (response.status === 'success') {
            if (response.data) {
                updateUserConfig(response.data)
            }
            openToast(response.msg, 'success')
        }
        else if (response.status === 'error') {
            openToast(response.msg, 'error')
        }
    }

    return (
        <>
            <DeactivateAccountModal
                isOpen={disableModalShow}
                onClose={() => setDisableModalShow(false)}
                username={formData.username}
            />
            <div className="p-4 md:p-6 w-full min-h-full flex items-start justify-center">
                <div className="w-full max-w-2xl">
                    {/* Header con cover y avatar */}
                    <div className="bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden shadow-sm">
                        {/* Cover Image */}
                        <div className="w-full h-32 md:h-40 relative bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20">
                            {
                                formData.cover_image_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={formData.cover_image_url || "/placeholder.svg"}
                                        alt="Cover"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    // <div className="absolute inset-0 bg-[url('/abstract-gradient-pattern.jpg')] bg-cover bg-center opacity-50" />
                                    <div className="w-full h-full bg-linear-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                                        <span className="text-6xl opacity-20">📰</span>
                                    </div>
                                )
                            }
                            <ButtonFile
                                onLoad={(image: string) => changeImageAvatar('cover', image)}
                                className="absolute top-3 right-3 btn btn-sm btn-ghost bg-base-100/80 backdrop-blur-sm gap-1 hover:bg-base-100">
                                <BiCamera className="w-4 h-4" />
                                <span className="hidden sm:inline">{t('change.image-cover')}</span>
                            </ButtonFile>
                        </div>

                        {/* Avatar y acciones */}
                        <div className="px-4 md:px-6 pb-4">
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 sm:-mt-12">
                                {/* Avatar */}
                                <div className="relative group">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-base-100 bg-base-200 overflow-hidden shadow-lg">
                                        {
                                            loadingSaveImage ? (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="loading loading-spinner text-primary" />
                                                </div>
                                            )
                                                :
                                                userConfig?.avatar ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={userConfig.avatar || "/placeholder.svg"}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                                        <BiUser className="w-10 h-10 text-primary/50" />
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <ButtonFile
                                        onLoad={(image: string) => changeImageAvatar('avatar', image)}
                                        className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <BiCamera className="w-4 h-4" />
                                    </ButtonFile>
                                </div>

                                {/* Acciones */}
                                <div className="flex items-center gap-2 pb-2">
                                    <button
                                        onClick={handleCopyLink}
                                        className={`btn btn-sm gap-2 ${copied ? "btn-success" : "btn-ghost border border-base-content/10"}`}
                                    >
                                        {copied ? <BiCheck className="w-4 h-4" /> : <BiLink className="w-4 h-4" />}
                                        {copied ? t('copied-linkme') : t('copy-linkme')}
                                    </button>
                                    {!isEditing ? (
                                        <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-primary gap-2">
                                            <BiEdit className="w-4 h-4" />
                                            {t('edit-profile')}
                                        </button>
                                    ) : (
                                        <>
                                            <button onClick={handleCancel} className="btn btn-sm btn-ghost gap-1">
                                                <BiX className="w-4 h-4" />
                                                {t('cancel')}
                                            </button>
                                            <button onClick={handleSave} disabled={isSaving} className="btn btn-sm btn-primary gap-2">
                                                {isSaving ? (
                                                    <span className="loading loading-spinner loading-xs" />
                                                ) : (
                                                    <BiSave className="w-4 h-4" />
                                                )}
                                                {t('accept')}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Información del usuario */}
                            <div className="mt-4">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="input input-bordered w-full max-w-xs text-xl font-bold bg-base-200/50"
                                        placeholder="Username"
                                    />
                                ) : (
                                    <h2
                                        title={
                                            userConfig?.status === false ?
                                                'El usuario esta deshabilitado' :
                                                undefined
                                        }
                                        className={
                                            `text-xl md:text-2xl font-bold text-base-content
                                         ${userConfig?.status === false ? "line-through text-warning" : ''}
                                        `
                                        }>
                                        {formData.username || `${t('without')} ${t('username')}`}
                                    </h2>
                                )}
                                <p
                                    title={
                                        userConfig?.status === false ?
                                            'El usuario esta deshabilitado' :
                                            undefined
                                    }
                                    className={
                                        `text-base-content/50 text-sm mt-1
                                     ${userConfig?.status === false ? "line-through" : ''}
                                    `
                                    }>@{formData.username || "username"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Secciones de información */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Información personal */}
                        <div className="bg-base-100 border border-base-content/10 rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-base-content flex items-center gap-2 mb-4">
                                <BiUser className="w-5 h-5 text-primary" />
                                {t('information')}
                            </h3>

                            <div className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="text-xs text-base-content/50 uppercase tracking-wide flex items-center gap-1">
                                        <MdEmail className="w-3 h-3" />
                                        {t('email')}
                                    </label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-sm text-base-content">{user?.email || `${t('without')} ${t('email')}`}</p>
                                        {
                                            user?.email_confirmed_at ?
                                                <span className="badge badge-success badge-xs gap-1">
                                                    <BiShield className="w-3 h-3" />
                                                    {t('verify')}
                                                </span>
                                                :
                                                <span className="badge badge-error badge-xs gap-1">
                                                    <BiShieldX className="w-3 h-3" />
                                                    {t('no-verify')}
                                                </span>
                                        }
                                    </div>
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="text-xs text-base-content/50 uppercase tracking-wide">{t('bio')}</label>
                                    {isEditing ? (
                                        <textarea
                                            value={formData.bio || ""}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            className="textarea textarea-bordered w-full mt-1 bg-base-200/50 text-sm resize-none"
                                            rows={3}
                                            placeholder={t('bio.placeholder')}
                                        />
                                    ) : (
                                        <p className="text-sm text-base-content mt-1">
                                            {formData.bio || <span className="text-base-content/40 italic">{t('without')} {t('bio')}</span>}
                                        </p>
                                    )}
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="text-xs text-base-content/50 uppercase tracking-wide">{t('website')}</label>
                                    {isEditing ? (
                                        <input
                                            type="url"
                                            value={formData.website || ""}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            className="input input-bordered input-sm w-full mt-1 bg-base-200/50"
                                            placeholder="https://tu-sitio.com"
                                        />
                                    ) : formData.website ? (
                                        <a
                                            href={formData.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                                        >
                                            {formData.website}
                                            <FiExternalLink className="w-3 h-3" />
                                        </a>
                                    ) : (
                                        <p className="text-sm text-base-content/40 italic mt-1">{t('without')} {t('website')}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Preferencias */}
                        <div className="bg-base-100 border border-base-content/10 rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-base-content flex items-center gap-2 mb-4">
                                <MdNotifications className="w-5 h-5 text-secondary" />
                                {t('preferences')}
                            </h3>

                            <div className="space-y-4">
                                {/* Newsletter toggle */}
                                <div className="flex items-start justify-between gap-4 p-3 bg-base-200/30 rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <BiNews className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-medium text-base-content">{t('newsletter')}</span>
                                        </div>
                                        <p className="text-xs text-base-content/50 mt-1">
                                            {t('newsletter.question?')}
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary toggle-sm"
                                        checked={formData.accept_newletters_email}
                                        onChange={(e) => setFormData({ ...formData, accept_newletters_email: e.target.checked })}
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Estadísticas // Posible feature a futuro */}
                                {/* <div className="pt-2">
                                <label className="text-xs text-base-content/50 uppercase tracking-wide">Estadísticas</label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="bg-base-200/30 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold text-primary">12</p>
                                        <p className="text-xs text-base-content/50">Papers</p>
                                    </div>
                                    <div className="bg-base-200/30 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold text-secondary">48</p>
                                        <p className="text-xs text-base-content/50">Seguidores</p>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Zona de peligro */}
                    <div className="bg-error/5 border border-error/20 rounded-xl p-4 mt-4">
                        <h3 className="font-semibold text-error flex items-center gap-2 mb-2">
                            <BiShield className="w-5 h-5" />
                            {t('danger-zone.title')}
                        </h3>
                        <p className="text-sm text-base-content/60 mb-3">
                            {t('danger-zone.text')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {
                                userConfig?.status === false ?
                                    <button disabled={loadingActiveAcount} onClick={activeUser} className="btn btn-outline btn-success hover:bg-emerald-400 hover:text-white  border-emerald-400 text-emerald-400 btn-sm">
                                        {t('danger-zone.active-account')}
                                        {
                                            loadingActiveAcount &&
                                            <span className="loading loading-spinner loading-sm ml-2"></span>
                                        }
                                    </button>
                                    :
                                    <button disabled={isSaving} onClick={() => setDisableModalShow(true)} className="btn btn-outline btn-error btn-sm">{t('danger-zone.disable-account')}</button>
                            }
                            <button className="btn btn-error btn-sm">{t('danger-zone.delete-account')}</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
