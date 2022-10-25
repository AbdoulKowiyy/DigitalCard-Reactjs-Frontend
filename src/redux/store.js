import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";


//import the file created from the specific folders
import userReducers from "./reducers/userReducers";
import uiReducers from "./reducers/uiReducers";
import dataReducers from "./reducers/dataReducers";


const initialState = {};
const middleware = [thunk]

const reducers = combineReducers({
    user: userReducers,
    data: dataReducers,
    UI: uiReducers
})

// const store = createStore(
//     reducers,
//     initialState,
//     compose(
//         applyMiddleware(...middleware),
//         // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// )

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
    compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store