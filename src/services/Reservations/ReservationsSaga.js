import React from "react";
import { put, takeLatest, all } from "redux-saga/effects";
import { reservations } from "./ReservationsActions";
import Api from "../../common/Api/Api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { modalSucces } from "../../components/SweetAlert/Success";
const MySwal = withReactContent(Swal);

const modalError = ({ message }) =>
  MySwal.fire({
    icon: "error",
    title: <p>Tenemos un error</p>,
    heightAuto: "false",
    didOpen: () => {
      MySwal.clickConfirm();
    },
  }).then(() => {
    return MySwal.fire(<p>{message}</p>);
  });

function* postReservation({ payload: { data } }) {
  try {
    const response = yield Api.post("/reservationWeb/insertResevation", data);
    if (response.ok) {
      yield put(reservations.postReservationResponse(response.payload));
      modalSucces({ message: "El escenario ha sido reservado con exito", reload:true});
    } else {
      const err = new TypeError("ERROR_LOGIN");
      yield put(reservations.postReservationResponse(err));
      modalError({ message: response.payload.Message?response.payload.Message:'Revisa tus datos, por favor' });
    }
  } catch (error) {
    modalError({ message: "Parece que tenemos problemas" });
    yield put(reservations.postReservationResponse(error));
  }
}

function* cancelReservation({ payload: { data } }) {
  try {
    const response = yield Api.post("/reservationWeb/cancelacion", data);
    if (response.ok) {
      yield put(reservations.cancelReservationResponse(response.payload));
      modalSucces({ message: "La cancelaciòn se ha realizado con exito",reload:true,title:'Cancelado' });
    } else {
      const err = new TypeError("ERROR_LOGIN");
      yield put(reservations.cancelReservationResponse(err));
      modalError({ message: response.payload.Message?response.payload.Message:'Revisa tus datos, por favor' });
    }
  } catch (error) {
    modalError({ message: "Parece que tenemos problemas" });
    yield put(reservations.cancelReservationResponse(error));
  }
}



function* ActionWatcher() {
  yield takeLatest(reservations.postReservation, postReservation);
  yield takeLatest(reservations.cancelReservation, cancelReservation);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
