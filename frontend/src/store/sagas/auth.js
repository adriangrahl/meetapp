import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { Creators as AuthActions } from '../ducks/auth';
import api from '../../services/api';
import { Creators as ErrorActions } from '../ducks/error';

export function* signIn(action) {
  try {
    const { email, password } = action.payload;

    const {
      data: { token, user },
    } = yield call(api.post, '/sessions', {
      email,
      password,
    });

    yield localStorage.setItem(
      '@MeetApp:auth',
      JSON.stringify({
        user,
        token,
      }),
    );

    yield put(AuthActions.signInSuccess(user, token));

    if (user && user.first_login) yield put(push('/preferences'));
  } catch (err) {
    yield put(AuthActions.done());

    const {
      response: { data },
    } = err;
    yield put(ErrorActions.setError('Não foi possível realizar o login.', data));
  }
}

export function* signUp(action) {
  try {
    const { username, email, password } = action.payload;

    yield call(api.post, '/users', {
      username,
      email,
      password,
    });

    yield put(push('/signin'));
  } catch (err) {
    yield put(AuthActions.done());
    const {
      response: { data },
    } = err;
    yield put(ErrorActions.setError('Não foi possível concluir o cadastro.', data));
  }
}

export function* updateProfile(action) {
  try {
    const { user, redirectTo } = action.payload;

    const token = yield select(state => state.auth.token);

    const { data } = yield call(api.put, 'users', user, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(AuthActions.updateSuccess(data));

    if (redirectTo) yield put(push(redirectTo));
  } catch (err) {
    yield put(AuthActions.done());

    const {
      response: { data },
    } = err;
    yield put(ErrorActions.setError('Não foi possível editar o perfil.', data));
  }
}
