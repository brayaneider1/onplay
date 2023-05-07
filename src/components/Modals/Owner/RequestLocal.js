import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";
import { useForm } from "react-hook-form";
import File from "../../Inputs/Files";
import { UploadFirebase } from "../../firebase/PromiseUpload";
import jwt_decode from "jwt-decode";
import { Token } from "../../../common/Storage/Token";
import { useDispatch, useSelector } from "react-redux";
import { local } from "../../../services/Locals/LocalActions";
import { Loading } from "../../Loading/Loading";

export const RequestLocal = ({ visible, setVisible, data }) => {
  const userData = jwt_decode(Token.getToken());
  const [value, setvalue] = useState("");
  const [error, setError] = useState(false);
  const [hand, setHand] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.local);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch
  } = useForm();

  useEffect(() => {
    if (hand === true)
      if (value == "") {
        setError(true);
      } else {
        setError(false);
      }
  }, [value, hand]);

  const handleError = () => {
    setHand(true);
  };

  // Valida los datos del formulario,sube los archivos a firebase,espera la promesa y activa la peticion post

  const onSubmit = async (e) => {
    if (e.closeTime < e.openTime) {
      message.error("La hora de cierre no puede ser menor al inicial");
    } else {
      if (value === "") {
        setError(true);
      } else {
        if (
          value.type === "image/png" ||
          value.type === "image/jpg" ||
          value.type === "image/jpeg"
        ) {
          return Promise.all([
            UploadFirebase({ value: value }).then(async (res) => {
              dispatch(
                local.postLocal({
                  ...e,
                  Country: data?.payload[0].Country,
                  Department: data?.payload[0].State,
                  Municipality: data?.payload[0].Municipality,
                  Logo: res,
                  idCompany: userData.data.IdCompany,
                })
              );
            }),
          ]);
        } else {
          message.error("El logo solo puede ser de tipo jpg,png o jpeg");
        }
      }
      setError(false);
    }
  };


  return (
    <Modal
      title="Solicitud nuevo local"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="request-local">
        <div className="request-local__content w-full flex">
          <div className="w-1/2 item">
            <InputComponent
              type="text"
              label="Nombre de usuario "
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="UserName"
              error={errors.UserName}
              errorMsg="Complete este campo"
              {...register("UserName", { required: true })}
            />

            <InputComponent
              type="number"
              label="Telefono "
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="TelefonoLocal"
              error={errors.TelefonoLocal}
              errorMsg="Complete este campo"
              {...register("TelefonoLocal", { required: true })}
            />

            <InputComponent
              type="text"
              label="Nombre local"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="NameLocal"
              error={errors.NameLocal}
              errorMsg="Complete este campo"
              {...register("NameLocal", { required: true })}
            />
            <InputComponent
              type="number"
              label="NIT"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="NitLocal"

              error={errors.NitLocal}
              errorMsg="El nit debe contener entr 7 y 11 caracteres numericos"
              {...register("NitLocal", {
                required: true,
                pattern: /[0-9]{4}/,
                minLength: 7,
                maxLength: 11,
              })}
            />
            <InputComponent
              type="text"
              label="Latitud"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="Latitude"

              error={errors.Latitude}
              errorMsg="Complete este campo"
              {...register("Latitude", {
                required: true,
              })}
            />

            <InputComponent
              type="text"
              label="Longitud"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="Longitude"

              error={errors.Longitude}
              errorMsg="Complete este campo"
              {...register("Longitude", {
                required: true,
              })}
            />
          </div>
          <div className="w-1/2 item">
            <InputComponent
              type="text"
              label="Correo electrónico"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="Email"
              error={errors.Email}
              errorMsg="Complete este campo"
              {...register("Email", { required: true })}
            />
            <InputComponent
              type="text"
              label="Dirección"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="LocalAddress"
              error={errors.LocalAddress}
              errorMsg="Complete este campo"
              {...register("LocalAddress", { required: true })}
            />
            <div className="input-component3 w-11/12 pb-6">
              <p>Hora de apertura</p>
              <div className="wrap-time">
                <input
                  type="time"
                  name="openTime"
                  step="3600"
                  max="24:00"
                  min="00:00"
                  value={watch("openTime")}
                  error={errors.openTime}
                  errorMsg="Complete este campo"
                  {...register("openTime", { required: true })}
                />
                <label>{watch("openTime")} </label>
              </div>
            </div>
            <div className="input-component3 w-11/12 pb-4">
              <p>Hora de cierre</p>
              <div className="wrap-time">
                <input
                  type="time"
                  name="closeTime"
                  step="3600"
                  max="24:00"
                  min="00:00"
                  error={errors.closeTime}
                  errorMsg="Complete este campo"
                  {...register("closeTime", { required: true })}
                />
                <label>{watch("closeTime")} </label>
              </div>
            </div>
            <div className="w-11/12">
              <p className="font-bold mt-5">Logo</p>
              <File
                typeData={"image/png" || "image/jpg" || "image/jpeg"}
                setvalue={setvalue}
                value={value}
              />
              {error === true && (
                <span className="text-base text-red-400">
                  La imagen es obligatoria
                </span>
              )}
            </div>
          </div>
        </div>
        <input
          onClick={handleError}
          type="submit"
          className="submit"
          value="Enviar"
        />
      </form>
      <Loading visible={loading && loading} />
    </Modal>
  );
};
