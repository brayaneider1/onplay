import React from "react";
import { Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";
import { useForm } from "react-hook-form";

export const Suspension = ({ visible, setVisible }) => {
  const {
    register,
  } = useForm();

  return (
    <Modal
      title="Suspensión"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form className="flex flex-col ">
        <InputComponent
          type="text"
          label="Motivo de suspensión"
          placeholder="Seleccione un motivo de suspensión"
          select
          options={[{ id: 1, name: "lorem  " }]}
          icon="fa fa-user-o"
          className="w-auto"
          name="name"
          {...register("name")}
        />
        <InputComponent
          type="number"
          label="Descripción"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="name"
          pattern="[0-9]+"

          {...register("name")}
        />
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
    </Modal>
  );
};
