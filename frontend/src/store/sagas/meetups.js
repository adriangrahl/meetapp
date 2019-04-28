import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as MeetupsActions } from '../ducks/meetups';
import { Creators as ErrorActions } from '../ducks/error';

export function* subscribed(action) {
  try {
    const { title: search } = action.payload;

    const searchParam = search ? `title=${search}` : null;

    const token = yield select(state => state.auth.token);

    const { data } = yield call(api.get, `/meetups?list=subscribed&${searchParam}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(MeetupsActions.getSubscribedSuccess(data));
  } catch (err) {
    yield put(MeetupsActions.getSubscribedFailure());
    yield put(ErrorActions.setError('Não foi possível buscar os meetups.'));
  }
}

export function* unsubscribed(action) {
  try {
    const { title: search } = action.payload;

    const searchParam = search ? `title=${search}` : null;

    const token = yield select(state => state.auth.token);

    const { data } = yield call(api.get, `/meetups?list=unsubscribed&${searchParam}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(MeetupsActions.getUnsubscribedSuccess(data));
  } catch (err) {
    yield put(MeetupsActions.getUnsubscribedFailure());
    yield put(ErrorActions.setError('Não foi possível buscar os meetups.'));
  }
}

export function* recommended(action) {
  try {
    const { title: search } = action.payload;

    const searchParam = search ? `title=${search}` : null;

    const token = yield select(state => state.auth.token);

    const { data } = yield call(
      api.get,
      `/meetups?list=unsubscribed&recommended=true&${searchParam}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    yield put(MeetupsActions.getRecommendedSuccess(data));
  } catch (err) {
    yield put(MeetupsActions.getRecommendedFailure());
    yield put(ErrorActions.setError('Não foi possível buscar os meetups.'));
  }
}
