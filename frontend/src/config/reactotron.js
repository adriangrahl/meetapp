import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  // tried with .env but eslint makes it impossible //eslint-disable import/first
  const tron = Reactotron.configure({ host: '192.168.56.1' })
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect();

  tron.clear();

  console.tron = tron;
}
