import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as UploadActions } from '../ducks/upload';
import { Creators as ErrorActions } from '../ducks/error';

export function* upload(action) {
  try {
    const { file } = action.payload;

    const token = yield select(state => state.auth.token);

    const formData = new FormData();

    formData.append('file', file, file.name);

    const { data } = yield call(api.post, '/files', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(UploadActions.uploadSuccess(data));
  } catch (err) {
    yield put(UploadActions.uploadFailure());
    yield put(ErrorActions.setError('Não foi possível realizar o upload.'));
  }
}

export function* uploadDelete(action) {
  try {
    const { id } = action.payload;

    const token = yield select(state => state.auth.token);

    yield call(api.delete, `/files/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    yield put(UploadActions.uploadSuccess());
  } catch (err) {
    yield put(UploadActions.uploadFailure());
    yield put(ErrorActions.setError('Não foi possível remover o arquivo.'));
  }
}
