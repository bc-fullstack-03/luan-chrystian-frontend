import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Social } from "../pages/Social";
import { Profile } from "../pages/Profile";
import { Publication } from "../pages/Publication";

export function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/social" element={<Social />} />
            <Route path="/publication" element={<Publication />} />
        </Routes>
    )
}