import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer"; // Import your root reducer
import rootSaga from "./sagas/rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store with middleware
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
