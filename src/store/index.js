import { createStore, compose, applyMiddleware } from 'redux';

import reducers from './ducks';

const middlewares = [];

const composer = compose(applyMiddleware(...middlewares));

const store = createStore(reducers, composer);

export default store;
