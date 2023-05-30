import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../home/Home";
import SignIn from "../sign-in/SignIn";

const Router = () => {
    // const basename = "/projects/BefaArt/";
    const basename = "";
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route element={<Home />} exact path="/" />
                <Route element={<SignIn />} exact path="/sign-in" />
                <Route
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
                    path="*"
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
