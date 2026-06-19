import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api";

function ProtectedRoute({ children }) {

    const [isValid, setIsValid] = useState(null);

    useEffect(() => {

        const verify = async () => {

            const token =
                localStorage.getItem("token");

            if (!token) {
                setIsValid(false);
                return;
            }

            try {

                await API.get("/auth/verify");

                setIsValid(true);

            } catch {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setIsValid(false);
            }
        };

        verify();

    }, []);

    if (isValid === null) {
        return <h2>Loading...</h2>;
    }

    return isValid
        ? children
        : <Navigate to="/login" />;
}

export default ProtectedRoute;