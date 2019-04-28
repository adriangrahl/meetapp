import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import sagas from './sagas';
import reducers from './ducks';
import history from '../routes/history';

const middlewares = [];

const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

const createApptopriateStore = process.env.NODE_ENV === 'development' ? console.tron.createStore : createStore;

const store = createApptopriateStore(
  connectRouter(history)(reducers),
  compose(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(sagas);

export default store;
