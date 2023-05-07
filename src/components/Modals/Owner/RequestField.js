import React from "react";
import { Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { local } from "../../../services/Locals/LocalActions";
import Api from "../../../common/Api/Api";
import { Loading } from "../../Loading/Loading";
import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";
import { Token } from "../../../common/Storage/Token";

export const RequestField = ({ visible, setVisible, id }) => {
  const userData = jwt_decode(Token.getToken());

  // petición get para obtener los tipos de deportes

  const { data, isLoading } = useQuery("fieldTypes", () =>
    Api.get("/field/types")
  );

  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = async (e) => {
    dispatch(local.postField({
      ...e,
      idLocal: id,
      idCompany: userData?.data.IdCompany
    }));
  };

  return (
    <Modal
      title="Solicitar nueva cancha"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="request-local">
        <InputComponent
          type="text"
          label="Nombre de la cancha"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="NameField"
          {...register("NameField", { required: true })}
          error={errors.NameField}
          errorMsg="Complete este campo"
        />
        <InputComponent
          type="number"
          label="Precio en el día"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="PriceDay"
          pattern="[0-9]+"
          {...register("PriceDay", { required: true })}
          error={errors.PriceDay}
          errorMsg="Complete este campo"
        />
        <InputComponent
          type="number"
          label="Precio en la noche"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="PriceNight"
          pattern="[0-9]+"
          {...register("PriceNight", { required: true })}
          error={errors.PriceNight}
          errorMsg="Complete este campo"
        />
        <div className="input-component3 w-11/12">
          <p>Deporte </p>
          <select
            name="idFieldType"
            {...register("idFieldType", { required: true })}
          >
            {data?.payload?.map((i) => (
              <option value={i.IdFieldType}>{i.NameFieldType}</option>
            ))}
          </select>
        </div>
        <input type="submit" className="submit" value="Enviar" />
      </form>
      <Loading visible={isLoading} />
    </Modal>
  );
};
