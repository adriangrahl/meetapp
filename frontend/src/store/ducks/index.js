import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../../routes/history';
import auth from './auth';
import meetups from './meetups';
import meetupDetails from './meetupDetails';
import subscription from './subscription';
import newMeetup from './newMeetup';
import upload from './upload';
import error from './error';

export default combineReducers({
  example: () => [],
  router: connectRouter(history),
  auth,
  meetups,
  meetupDetails,
  subscription,
  newMeetup,
  upload,
  error,
});
