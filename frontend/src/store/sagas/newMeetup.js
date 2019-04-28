import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '../../services/api';
import { Creators as NewMeetupActions } from '../ducks/newMeetup';
import { Creators as UploadActions } from '../ducks/upload';

import { Creators as ErrorActions } from '../ducks/error';

export function* newMeetup(action) {
  try {
    const { data } = action.payload;

    const token = yield select(state => state.auth.token);

    yield call(api.post, '/meetups', data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(NewMeetupActions.newMeetupSuccess());
    yield put(UploadActions.uploadSuccess());
    yield put(push('/'));
  } catch (err) {
    yield put(NewMeetupActions.newMeetupFailure());

    const {
      response: { data },
    } = err;
    yield put(ErrorActions.setError('Não foi possível criar o meetup.', data));
  }
}
