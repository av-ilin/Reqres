import Router from "./components/router/Router";
import { createStore } from "redux";
import { Provider } from "react-redux";
import CookieAPI from "./api/CookieApi";

console.log(document.cookie);

const defaultState = {
    token: CookieAPI.getCookie("token"),
    username: CookieAPI.getCookie("username"),
    id_notice: 0,
    notifications: [],
};
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            CookieAPI.setCookie("token", action.payload, {
                secure: true,
                "max-age": 1800,
            });
            return { ...state, token: action.payload };
        case "SET_USERNAME":
            CookieAPI.setCookie("username", action.payload, {
                secure: true,
                "max-age": 1800,
            });
            return { ...state, username: action.payload };
        case "ADD_NOTICE":
            return {
                ...state,
                id_notice: state.id_notice + 1,
                notifications: [
                    ...state.notifications,
                    { id: state.id_notice, message: action.payload },
                ],
            };
        case "REMOVE_NOTICE":
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notice) => notice.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
const store = createStore(reducer);

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default App;
