// components/Toolbox.js
import React from "react";

export const Toolbox = () => {
    return (
        <div className="p-2">
            <div className="grid gap-2 justify-items-center align-items-center grid-cols-2">
                <div className="w-full pb-2 border-b border-b-neutral/20 col-span-2" >
                    <p>Drag to add</p>
                </div>
            </div>
            <div>
                <button className="btn btn-primary">Container</button>
            </div>
            <div>
                <button className="btn btn-primary">Text</button>
            </div>
        </div>
    )
};