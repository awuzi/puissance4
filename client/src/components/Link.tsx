import { Link as ReactLink } from "react-router-dom";

interface LinkProps {
    route: string;
    children: JSX.Element;
}

const Link = ({ route, children }: LinkProps) => {
    return (
        <ReactLink to={route} style={{ textDecoration: "none", color: "inherit" }}>
            {children}
        </ReactLink>
    );
};

export default Link;
