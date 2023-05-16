import { Route, Routes } from "react-router-dom";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Friends } from "../pages/Friends";
import { Profile } from "../pages/Profile";
import { Publication } from "../pages/Publication";

export function AppRoutes() {

    return (
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/publication" element={<Publication />} />
        </Routes>
    )
}