import Router from "./components/router/Router";
import { createStore } from "redux";
import { Provider } from "react-redux";

const defaultState = {
    token: "",
    username: "",
    notifications: [],
};
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "ADD_NOTICE":
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
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
