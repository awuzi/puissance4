import React from "react";

interface TitleProps {
    children: string | string[];
}

const Title = ({ children }: TitleProps) => {
    return (
        <>
            <h3 className="pt-4 pb-8 text-2xl text-center font-bold">
                {children}
            </h3>
        </>
    )
};

export default Title;