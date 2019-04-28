import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '../../services/api';
import { Creators as SubscriptionActions } from '../ducks/subscription';
import { Creators as ErrorActions } from '../ducks/error';

export function* subscribe(action) {
  try {
    const { id } = action.payload;

    const token = yield select(state => state.auth.token);

    yield call(api.post, `/meetups/${id}/subscribe`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(SubscriptionActions.subscriptionSuccess());
    yield put(push('/'));
  } catch (err) {
    yield put(SubscriptionActions.subscriptionFailure());
    yield put(ErrorActions.setError('Não foi possível realizar a inscrição.'));
  }
}
