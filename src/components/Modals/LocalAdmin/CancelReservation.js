import React from "react";
import { Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";
import { reservations } from '../../../services/Reservations/ReservationsActions'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export const CancelReservation = ({ visible, setVisible, detailData }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();


  // envia los datos del formulario a una action de redux para cancelar una reservación

  const onSubmit = (e) => {

    dispatch(reservations.cancelReservation({
      Titel: e.Titel,
      TypeNotification: e.TypeNotification,
      Description: e.Description,
      IdField: parseInt(detailData.params.id),
      Iduser: detailData.data.id,
      date: detailData.date,
      hour: detailData.data.hour.hour

    }))
  }


  return (
    <Modal
      title="Suspensión"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col request-modal ">

        <div className="input-component3 mr-3 mb-5 ">
          <p> Motivo de cancelación  </p>
          <select {...register("TypeNotification", { required: true })}>
            <option id="1" value="Decreto publico">Decreto publico</option>
            <option id="2" value="Fallo electrico">Fallo eléctrico</option>
            <option id="3" value="Orden público">Orden público</option>
            <option id="4" value="Otro">Otro</option>
          </select>
        </div>

        <InputComponent
          type="text"
          label="Título"
          icon="fa fa-user-o"
          className=""
          name="Titel"
          error={errors.Titel}
          errorMsg="Complete este campo"
          {...register("Titel")}
        />
        <InputComponent
          type="text"
          label="Descripción"
          icon="fa fa-user-o"
          className=""
          name="Description"
          error={errors.Description}
          errorMsg="Este espacio es requerido"
          {...register("Description")}
        />
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
    </Modal>
  );
};
