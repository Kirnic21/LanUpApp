import { createStore, compose, applyMiddleware } from "redux";

import Reactotron from '../../ReactotronConfig';

import reducers from "./ducks";

const middlewares = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares), Reactotron.createEnhancer())
);

export default store;
