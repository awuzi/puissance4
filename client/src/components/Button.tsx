import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    label: string
    onClick?: any;
}

const Button = ({ type, label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type={type}>
            {label}
        </button>
    );
};

export default Button;