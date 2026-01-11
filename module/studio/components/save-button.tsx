"use client"

import { useEditor } from "@craftjs/core"
import { useEffect, useState } from "react"
import type { saveNewsProps } from "../actions/save-news"
import { saveNews } from "../actions/save-news"
import { findImage, findText, findTitle } from "@/module/utils/findTitleAndImage"
import { IoClose, IoSaveOutline, IoImageOutline, IoLinkOutline, IoTextOutline, IoEyeOutline } from "react-icons/io5"
import { useToast } from "@/module/common/hook/useToast"

let render = false

const defaultModalForm: saveNewsProps = {
  content: "",
  title: "",
  author_id: "",
  cover_image_url: "",
  cover_text: "",
  slug: "",
  allow_updates: false,
}

export const SaveButton = () => {
  const { query, actions } = useEditor()
  const { openToast } = useToast()
  const [modalForm, setModalForm] = useState<saveNewsProps>(defaultModalForm)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("data")

    if (data && !render) {
      render = true
      const check = confirm("Hay contenido que no se ha guardado, desea sobreescribirlo?")
      if (check) {
        actions.deserialize(JSON.parse(data))
      }
    }
  }, [])

  const save = async () => {
    try {
      if (loading) return;
      const json = query.serialize()
      const title = findTitle(JSON.parse(json))
      const text = findText(JSON.parse(json))
      const image = findImage(JSON.parse(json))

      const input: saveNewsProps = {
        content: JSON.stringify(json),
        title,
        author_id: "",
        cover_image_url: image,
        cover_text: text,
        slug: title?.toLowerCase()?.replace(/[^a-z0-9]+/g, "-"),
        allow_updates: false,
      }
      setModalForm(input)
      setIsModalOpen(true)
      localStorage.setItem("data", JSON.stringify(json))
    }
    catch (err) {
      openToast("Error al subir la noticia", "error")
      console.log(err)
    }
  }

  const handleSave = async () => {
    try {

      if (loading) return;
      setLoading(true)
      const data = await saveNews(modalForm);
      setLoading(false)
      if (data.status === 'success') {
        openToast("La noticia se ha subido con exito\n Ve a la sección de publicaciones para gestionar su salida al aire", 'success')
        setIsModalOpen(false)
        localStorage.removeItem("data")
        return
      }
      openToast(data.msg, "error",)
    }
    catch (err) {
      openToast("Error al subir la noticia", "error")
      console.log(err)

    }
  }

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          {/* Backdrop con blur */}
          <div className="absolute inset-0 bg-base-300/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal container */}
          <div className="relative w-full max-w-4xl bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/10 bg-base-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <IoEyeOutline className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-base-content">Vista previa de publicación</h2>
                  <p className="text-sm text-base-content/60">Revisa cómo se verá tu artículo antes de publicar</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost btn-sm btn-circle">
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-base-content/10">
              {/* Form section */}
              <div className="p-6 space-y-5">
                <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider">
                  Detalles del artículo
                </h3>

                {/* Title field */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text flex items-center gap-2 text-base-content/80">
                      <IoTextOutline className="w-4 h-4" />
                      Título
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:bg-base-100 transition-all"
                    placeholder="Escribe el título del artículo"
                    value={modalForm?.title}
                    onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                  />
                </div>
                {/* Summary field */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text flex items-center gap-2 text-base-content/80">
                      <IoTextOutline className="w-4 h-4" />
                      Resumen
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    className="textarea resize-none w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:bg-base-100 transition-all"
                    placeholder="Escribe el título del artículo"
                    value={modalForm?.cover_text}
                    onChange={(e) => setModalForm({ ...modalForm, cover_text: e.target.value })}
                  ></textarea>
                </div>

                {/* Image URL field */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text flex items-center gap-2 text-base-content/80">
                      <IoImageOutline className="w-4 h-4" />
                      URL de imagen de portada
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:bg-base-100 transition-all"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={modalForm?.cover_image_url || ""}
                    onChange={(e) => setModalForm({ ...modalForm, cover_image_url: e.target.value })}
                  />
                </div>

                {/* Slug field */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text flex items-center gap-2 text-base-content/80">
                      <IoLinkOutline className="w-4 h-4" />
                      Slug (URL amigable)
                    </span>
                  </label>
                  <div className="join w-full">
                    <span className="join-item flex items-center px-3 bg-base-300 text-base-content/50 text-sm border border-base-content/10 border-r-0">
                      /new/
                    </span>
                    <input
                      type="text"
                      className="input input-bordered join-item w-full bg-base-200/50 border-base-content/10 focus:border-primary focus:bg-base-100 transition-all"
                      placeholder="mi-articulo"
                      value={modalForm?.slug || ""}
                      onChange={(e) => setModalForm({ ...modalForm, slug: e.target.value?.replaceAll(/[^a-zA-Z0-9]+/g, '-') })}
                    />
                  </div>
                </div>

                {/* Allow updates toggle */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3 py-3 px-4 rounded-lg bg-base-200/30 hover:bg-base-200/50 transition-colors">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary toggle-sm"
                      checked={modalForm?.allow_updates || false}
                      onChange={(e) => setModalForm({ ...modalForm, allow_updates: e.target.checked })}
                    />
                    <div>
                      <span className="label-text font-medium">Permitir actualizaciones</span>
                      <p className="text-xs text-base-content/50 mt-0.5">Los editores podrán modificar este artículo</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Preview section */}
              <div className="p-6 bg-base-200/30">
                <h3 className="text-sm font-medium text-base-content/70 uppercase tracking-wider mb-4">Vista previa</h3>

                {/* Card preview */}
                <div className="card bg-base-100 shadow-lg overflow-hidden border border-base-content/5 hover:shadow-xl transition-shadow duration-300">
                  {/* Image */}
                  <figure className="relative aspect-video bg-base-300">
                    {modalForm?.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={modalForm.cover_image_url || "/placeholder.svg"}
                        alt={modalForm.title || "Preview"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-base-content/30">
                        <IoImageOutline className="w-12 h-12 mb-2" />
                        <span className="text-sm">Sin imagen</span>
                      </div>
                    )}
                  </figure>

                  {/* Content */}
                  <div className="card-body p-4">
                    <h4 className="card-title text-base line-clamp-2">{modalForm?.title || "Sin título"}</h4>
                    <p className="text-xs text-base-content flex items-center gap-1 mt-1">
                      {(modalForm?.cover_text || "Sin resumen")?.substring(0, 100) + (modalForm?.cover_text?.length > 100 ? "..." : "")}
                    </p>
                    <p title={modalForm?.slug} className="text-xs text-base-content/50 flex items-center gap-1 mt-1">
                      <IoLinkOutline className="w-3 h-3" />
                      /new/{(modalForm?.slug || "sin-slug")?.substring(0, 40) + (modalForm?.slug?.length > 20 ? "..." : "")}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-base-content/40 mt-4 text-center">
                  Así se verá tu artículo en la página principal
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-base-content/10 bg-base-200/30">
              <button disabled={loading} onClick={() => setIsModalOpen(false)} className="btn btn-ghost">
                Cancelar
              </button>
              <button disabled={loading} onClick={handleSave} className="btn btn-primary gap-2">
                {
                  !loading ?
                    <IoSaveOutline className="w-4 h-4" />
                    :
                    <span className="loading loading-xs" />
                }
                Publicar artículo
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-primary btn-sm gap-2" onClick={save}>
        <IoSaveOutline className="w-4 h-4" />
        Guardar
      </button>
    </>
  )
}
