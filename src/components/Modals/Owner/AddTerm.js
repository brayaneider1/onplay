import React from "react";
import { Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";
import { useForm } from "react-hook-form";

export const AddTerm = ({ visible, setVisible }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm();

  return (
    <Modal
      title="Agregar plazo"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form className="flex flex-col ">
      <InputComponent
            type="number"
            label="Ingrese el número de días de plazo"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="name"
            pattern="[0-9]+"
            {...register("name")}
          />
          <InputComponent
            type="text"
            label="Ingrese el motivo de la tardanza"
            placeholder="Seleccione un motivo"
            select
            options={[{ id: 1, name: "lorem  " }]}
            icon="fa fa-user-o" 
            className="w-auto"
            name="name"
            {...register("name")}
          />
        
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
    </Modal>
  );
};
