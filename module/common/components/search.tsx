'use client'
import clsx from "clsx"
import { FormEvent, useState } from "react"
import { BiSearch, BiX } from "react-icons/bi"


export const SearchNews = () => {

    const [open, setOpen] = useState(false)


    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className="w-full lg:my-4 mt-3 lg:px-0 px-3 ">
            <form onSubmit={onSearch} className="w-full flex relative">
                <div className="join absolute right-0 z-0 transition-all w-full overflow-hidden" style={{ width: open ? '100%' : 0, right: 4 }} >
                    <button type={"button"} style={{ display: open ? 'block' : 'none' }} onClick={() => setOpen(false)} className={"flex mr-auto join-item btn shadow-md shadow-white/10"
                    }><BiX /></button>
                    <input type="search" className="pl-5 w-full  input focus:border-primary join-item" />
                </div>
                <button type={open ? "submit" : "button"} onClick={() => {
                    if (open) return
                    setOpen(true)
                }} className={
                    clsx(
                        "flex ml-auto btn  shadow-md shadow-white/10  relative z-10",
                        !open ? '' : 'btn-primary'
                    )
                }><BiSearch /></button>
            </form>
        </div>
    )
}
