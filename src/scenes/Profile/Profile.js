import React from "react";
import InputComponent from "../../components/Inputs/InputComponent3/InputComponent3";
import { useForm } from "react-hook-form";
import { modalError } from "../../components/SweetAlert/Error";
import { Loading } from "../../components/Loading/Loading";
import { modalSucces } from "../../components/SweetAlert/Success";
import Api from "../../common/Api/Api";
import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";
import { Token } from "../../common/Storage/Token";

export const Profile = () => {
  var dataForm
  const userData = jwt_decode(Token.getToken());

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const { isLoading, refetch } = useQuery(
    ["recoveryPass", dataForm],
    () =>
      Api.post("/login/UpdatePassword", dataForm),
    {
      onSuccess: data => {
        if (data?.ok === false) {
          modalError({ message: data?.payload.Message ? data?.payload.Message : 'Revisa tus datos, por favor' });
        } else {
          modalSucces({ message: "Por favor revise su correo", url: "/" });
        }
      },
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );


  const onSubmit = (data) => {
    if (data.newpass2 == data.newpass) {
      dataForm = {
        iduser: userData?.data?.IdUser,
        pass: data.pass,
        newpass: data.newpass
      }
      refetch()
    } else {
      modalError({ message: 'Las contraseñas no coinciden' })
    }
  }


  return (
    <div className="profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Cambiar contraseña</h2>
        <InputComponent
          type="text"
          label="Contraseña actual"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.pass}
          errorMgs="Verifique este campo"
          {...register("pass", { required: true })}
        />
        <InputComponent
          type="text"
          label="Nueva Contraseña"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.newpass}
          errorMgs="Verifique este campo"
          {...register("newpass", { required: true })}
        />
        <InputComponent
          type="text"
          label="Confirmar Nueva Contraseña"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          error={errors.newpass2}
          errorMgs="Verifique este campo"
          {...register("newpass2", { required: true })}
        />
        <input type="submit" className="submit" value="Enviar" />
      </form>
      <Loading visible={isLoading} />
    </div>
  );
};
