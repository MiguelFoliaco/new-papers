"use client"

import Link from "next/link"
import { IoHomeOutline, IoArrowBackOutline, IoSearchOutline, IoNewspaperOutline } from "react-icons/io5"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="w-[50vw] text-center flex flex-col">
                {/* Ilustración 404 */}
                <div className="relative mb-8">
                    <div className="mt-2 text-[12rem] sm:text-[16rem] font-black text-base-300 select-none leading-none">404</div>
                    <div className=" flex items-center justify-center">
                        <div className="bg-primary/10 p-4  rounded-full">
                            <IoNewspaperOutline fontSize={40} className=" text-primary" />
                        </div>
                    </div>
                </div>

                {/* Mensaje */}
                <div className="space-y-4 mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Página no encontrada</h1>
                    <p className="text-base-content/60 max-w-md mx-auto">
                        Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación. Verifica la URL o navega
                        usando las opciones de abajo.
                    </p>
                </div>

                {/* Buscador rápido */}
                <div className="mb-8 mt-4">
                    <div className="join w-full max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Buscar noticias, papers..."
                            className="input  join-item flex-1 bg-base-100 focus:outline-none focus:border-primary"
                        />
                        <button className="btn btn-primary join-item">
                            <IoSearchOutline className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col mt-4 items-center justify-center gap-3">
                    <button onClick={() => window.history.back()} className="btn btn-outline btn-primary gap-2 w-full sm:w-auto">
                        <IoArrowBackOutline className="w-4 h-4" />
                        Volver atrás
                    </button>
                    <Link href="/" className="btn btn-primary gap-2 w-full sm:w-auto">
                        <IoHomeOutline className="w-4 h-4" />
                        Ir al inicio
                    </Link>
                </div>

                {/* Links útiles */}
                <div className="mt-12  border-t border-base-300">
                    <p className="text-sm text-base-content/50 mb-4 mt-2">Enlaces que podrían interesarte</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        <Link href="/" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
                            Home
                        </Link>
                        <span className="text-base-content/30">•</span>
                        <Link href="/my-news" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
                            Mis noticias
                        </Link>
                        <span className="text-base-content/30">•</span>
                        <Link
                            href="/newspapers"
                            className="link link-hover text-base-content/70 hover:text-primary transition-colors"
                        >
                            Papers
                        </Link>
                        <span className="text-base-content/30">•</span>
                        <Link href="/help" className="link link-hover text-base-content/70 hover:text-primary transition-colors">
                            Ayuda
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
