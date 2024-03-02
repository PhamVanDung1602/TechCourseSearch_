import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    isAdmin: boolean;
    isStaff: boolean;
    isUser: boolean;
}

const RequireUser = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAdminCheck: React.FC<P> = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            const token = localStorage.getItem('token');

            // didn't login
            if (!token) {
                navigate("/");
                return;
            } else {
                // decode token
                const decodedToken = jwtDecode(token) as JwtPayload;
                // get info
                const isUser = decodedToken.isUser;

                // check if it is user
                if (!isUser) {
                    navigate("/");
                    return;
                }
            }
        }, [navigate]);
        return <WrappedComponent {...props} />
    }
    return WithAdminCheck;
}

export default RequireUser;