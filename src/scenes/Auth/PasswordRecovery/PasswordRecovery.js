import React from "react";
import InputComponent from "../../../components/Inputs/InputComponent2/InputComponent2";
import logo from "../../../assets/img/Logo.svg";
import { useForm } from "react-hook-form";
import bg from '../../../assets/img/bg-blue.png'
import { Loading } from '../../../components/Loading/Loading'
import { useQuery } from "react-query";
import Api from "../../../common/Api/Api";
import { modalError } from "../../../components/SweetAlert/Error";
import { modalSucces } from "../../../components/SweetAlert/Success";
import { Link } from "react-router-dom";


export const PasswordRecovery = () => {
  var email
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();



  const onSubmit = (data, e) => {
    e.preventDefault();
    email = data
    refetch()
  }

  const { isLoading, refetch } = useQuery(
    ["recoveryPass", email],
    () =>
    Api.post("/login/getpasswordOblivion/" , email),
    {
      onSuccess: data => {
        if (data?.ok === false) {
          modalError({ message: data?.payload.Message ? data?.payload.Message : 'Revisa tus datos, por favor' });
        } else {
          modalSucces({ message: "Por favor revise su correo",url:"/" });
        }
      },
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return (
    <div className="login">
      <div className="login_content" style={{ backgroundImage: `url(${bg})` }}>
        <h1>Recuperar contraseña</h1>
        <form className="pt-16" onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            {...register("email", { required: true })}
            name="email"
            type="text"
            label="Correo eléctronico"
            placeholder="ej: usuario@gmail.com"
            icon="fa fa-user-o"
            className=""
            error={errors.email}
            errorMsg="El correo es requerido"
          />
          <input type="submit" className="submit" value="Enviar" />
          <p>
            ¿Ya la recuerdas?
            <b>
              <br />
              <br />
              <Link to="/">Iniciar sesión</Link>
            </b>
          </p>
        </form>
      </div>
      <div className="login_logo">
        <img alt="logo" src={logo} />
        <span>On play</span>
      </div>
      <Loading visible={isLoading} />
    </div>
  );
};
