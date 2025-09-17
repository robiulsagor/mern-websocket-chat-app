import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/" replace />;
    }
    return (
        <div>{children}</div>
    )
}

export default PublicRoute