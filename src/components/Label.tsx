import React from "react";

interface LabelProps {
    htmlFor: string | undefined;
    children: string;
}

const Label = ({ htmlFor, children }: LabelProps) => {
    return (
        <>
        <label htmlFor={htmlFor} className="block mb-2 text-sm font-bold text-gray-700">
            {children}
        </label>
        </>
    )
};

export default Label;