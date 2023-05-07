import { fork, all } from 'redux-saga/effects';

import AuthSaga from '../services/Auth/AuthSaga';
import LocalSaga from '../services/Locals/LocalSaga';
import ReservationSaga from '../services/Reservations/ReservationsSaga';

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LocalSaga),
    fork(ReservationSaga),
  ]);
}