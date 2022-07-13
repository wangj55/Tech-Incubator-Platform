import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";


function App() {
    const ROUTES = {
        LOGIN: "/login",
        SIGNUP: "/signup"
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
                        element={<Login signupRoute={ROUTES.SIGNUP}/>}
                    />
                    <Route
                        exact path={ROUTES.SIGNUP}
                        element={<Signup loginRoute={ROUTES.LOGIN}/>}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
