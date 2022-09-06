import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children: string;
    onClick?: any;
}

const Button = ({ type, children, onClick }: ButtonProps) => {
    return (
        <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type={type}>
            {children}
        </button>
    );
};

export default Button;