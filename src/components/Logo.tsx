import React from "react";

interface LogoProps {
    props?: any;
}

const Logo = ({props}: LogoProps) => {
    return (
        <img src="/logo.png" alt="Logo Puissance 4" {...props}/>
    )
};

export default Logo;