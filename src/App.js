import Router from "./components/router/Router";
import { createStore } from "redux";
import { Provider } from "react-redux";

const defaultState = {
    token: "",
};
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload };
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
