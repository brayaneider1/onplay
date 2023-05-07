import React from "react";
import { put, takeLatest, all } from "redux-saga/effects";
import { local } from "./LocalActions";
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

function* postLocal({ payload: { data } }) {
  try {
    const response = yield Api.post("/local/postLocals", data);
    if (response.ok) {
      yield put(local.postLocalResponse(response.payload));
      modalSucces({ message: "Se ha registrado con exito", url: "/locals" });
    } else {
      const err = new TypeError("ERROR_LOGIN");
      yield put(local.postLocalResponse(err));
      modalError({ message: response.payload.Message });
    }
  } catch (error) {
    modalError({ message: "Parece que tenemos problemas" });
    yield put(local.postLocalResponse(error));
  }
}

function* postField({ payload: { data } }) {
  try {
    const response = yield Api.post("/field/insert", data);
    if (response.ok) {
      yield put(local.postFieldResponse(response.payload));
      modalSucces({ message: "Ha sido registrado con exito", reload: true });
    } else {
      const err = new TypeError("ERROR_LOGIN");
      yield put(local.postFieldResponse(err));
      modalError({ message: response.payload.Message });
    }
  } catch (error) {
    modalError({ message: "Parece que tenemos problemas" });
    yield put(local.postFieldResponse(error));
  }
}


function* dataField({ payload: { data } }) {
  try {
    const response = yield Api.get("/field/FieldGet/" + data);
    if (response.ok) {
      yield put(local.dataFieldResponse(response.payload[0]));
    } else {
      const err = new TypeError("ERROR_LOGIN");
      yield put(local.dataFieldResponse(err));
      modalError({ message: response.payload.Message });
    }
  } catch (error) {
    yield put(local.dataFieldResponse(error));
  }
}



function* ActionWatcher() {
  yield takeLatest(local.postLocal, postLocal);
  yield takeLatest(local.postField, postField);
  yield takeLatest(local.dataField, dataField);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
