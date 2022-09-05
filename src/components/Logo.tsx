import React from "react";

interface LogoProps {
    className?: string;
    style?: React.CSSProperties | undefined;
}

const Logo = ({className, style}: LogoProps) => {
    return (
        <img src="/logo.png" className={className} alt="Logo Puissance 4" style={style}/>
    )
};

export default Logo;