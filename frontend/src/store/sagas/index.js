import { all, takeLatest } from 'redux-saga/effects';

import { Types as AuthTypes } from '../ducks/auth';
import { signIn, signUp, updateProfile } from './auth';

import { Types as MeetupsTypes } from '../ducks/meetups';
import { subscribed, unsubscribed, recommended } from './meetups';

import { Types as MeetupDetailsTypes } from '../ducks/meetupDetails';
import { meetupDetails } from './meetupDetails';

import { Types as SubscriptionTypes } from '../ducks/subscription';
import { subscribe } from './subscription';

import { Types as NewMeetupTypes } from '../ducks/newMeetup';
import { newMeetup } from './newMeetup';

import { Types as UploadTypes } from '../ducks/upload';
import { upload, uploadDelete } from './upload';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGNIN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGNUP_REQUEST, signUp),
    takeLatest(AuthTypes.UPDATE_REQUEST, updateProfile),

    takeLatest(MeetupsTypes.SUBSCRIBED_REQUEST, subscribed),
    takeLatest(MeetupsTypes.UNSUBSCRIBED_REQUEST, unsubscribed),
    takeLatest(MeetupsTypes.RECOMMENDED_REQUEST, recommended),

    takeLatest(MeetupDetailsTypes.GET_REQUEST, meetupDetails),

    takeLatest(SubscriptionTypes.REQUEST, subscribe),

    takeLatest(NewMeetupTypes.REQUEST, newMeetup),

    takeLatest(UploadTypes.REQUEST, upload),
    takeLatest(UploadTypes.DELETE, uploadDelete),
  ]);
}
