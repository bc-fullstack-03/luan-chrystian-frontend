import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App.routes";
import { AuthRoutes } from "./Auth.routes";
import { useAuth } from "../hooks/auth";

export function Routes() {

    const { user }: any = useAuth()

    return (
        <BrowserRouter>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    )
}