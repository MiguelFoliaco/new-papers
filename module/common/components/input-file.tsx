'use client';

import { ReactNode, useState } from "react";
import { UploadImageModal } from "./modal-upload-image";
import { getImageWebp, uploadOneImage } from "../actions/upload-images";
import { useToast } from "../hook/useToast";
import { useUser } from "@/module/auth/context/useUser";


type Props = {
    className?: string;
    children?: ReactNode;
    limit?: number
    onLoad: (url: string) => void
}

export const ButtonFile = ({ children, className, limit, onLoad }: Props) => {

    const { user } = useUser()
    const [open, setOpen] = useState(false)
    const { openToast } = useToast()

    const onUpload = async (files: File[]) => {
        if (files.length === 0) return openToast('No se ha seleccionado ninguna imagen', 'warning')
        if (!user) return openToast('No se ha iniciado sesión', 'warning')
        const response = await uploadOneImage(files[0], user.id)
        if (!response?.public_id) return openToast('Error al subir la imagen', 'error')
        const imageWebp = await getImageWebp(response.public_id)
        onLoad(imageWebp)
        setOpen(false)
    }


    return <>
        <button className={className}
            onClick={() => setOpen(true)}
        >
            {children}
        </button>

        <UploadImageModal
            isOpen={open}
            onClose={() => setOpen(false)}
            acceptedTypes={['image/jpg', 'image/jpeg', 'image/png', 'image/webp',]}
            maxFiles={limit ?? 1}
            onUpload={onUpload}
        />
    </>
}