'use client'
import clsx from "clsx"
import { FormEvent, useState } from "react"
import { BiSearch } from "react-icons/bi"


export const SearchNews = () => {

    const [open, setOpen] = useState(false)


    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className="w-full my-4">
            <form onSubmit={onSearch} className="w-full flex relative">
                <input style={{ width: open ? '100%' : 0, right: 4 }} type="search" className="pl-5 transition-all w-full input absolute right-0 z-0 rounded-full focus:border-primary" />
                <button type={open ? "submit" : "button"} onClick={() => {
                    if (open) return
                    setOpen(true)
                }} className={
                    clsx(
                        "flex ml-auto btn btn-circle shadow-md shadow-white/10  relative z-10",
                        !open ? '' : 'btn-primary'
                    )
                }><BiSearch /></button>
            </form>
        </div>
    )
}
