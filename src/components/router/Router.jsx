import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import SignIn from "../pages/sign/SignIn";
import SignUp from "../pages/sign/SignUp";
import RequireAuth from "../require-auth/RequireAuth";
import NotificationAPI from "../notification/NotificationAPI";

const Router = () => {
    // const basename = "/projects/Reqres/";
    const basename = "";
    return (
        <BrowserRouter basename={basename}>
            <NotificationAPI />
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
                <Route path="/sign-up" element={<SignUp />} />
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
