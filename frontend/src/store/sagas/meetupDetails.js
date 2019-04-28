import { call, put, select } from 'redux-saga/effects';
import { Creators as MeetupDetailsActions } from '../ducks/meetupDetails';
import api from '../../services/api';
import { Creators as ErrorActions } from '../ducks/error';

export function* meetupDetails(action) {
  try {
    const { id } = action.payload;

    const token = yield select(state => state.auth.token);

    const { data } = yield call(api.get, `/meetups/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(MeetupDetailsActions.getMeetupDetailsSuccess(data));
  } catch (err) {
    yield put(MeetupDetailsActions.getMeetupDetailsFailure());
    yield put(ErrorActions.setError('Não foi possível os detalhes do meetup.'));
  }
}
