import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import SignIn from "../pages/sign-in/SignIn";
import RequireAuth from "../require-auth/RequireAuth";

const Router = () => {
    // const basename = "/projects/BefaArt/";
    const basename = "";
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route path="/sign-in" element={<SignIn />} />
                <Route
                    path="*"
                    element={
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                            }}
                        >
                            Not Found
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
