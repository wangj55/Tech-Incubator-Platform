import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

function App() {
    const ROUTES = {
        LOGIN: "/login",
        SIGNUP: "/signup",
        DASHBOARD: "/dashboard",
        PROFILE: "/profile"
    };

    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route
                        exact path={"/"}
                        element={<Navigate to={ROUTES.LOGIN}/>}
                    />
                    <Route
                        exact path={ROUTES.LOGIN}
                        element={<Login ROUTES={ROUTES}/>}
                    />
                    <Route
                        exact path={ROUTES.SIGNUP}
                        element={<Signup ROUTES={ROUTES}/>}
                    />
                    <Route
                        exact path={ROUTES.DASHBOARD}
                        element={<Dashboard ROUTES={ROUTES}/>}
                    />
                    <Route
                        exact path={ROUTES.PROFILE}
                        element={<Profile ROUTES={ROUTES}/>}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
