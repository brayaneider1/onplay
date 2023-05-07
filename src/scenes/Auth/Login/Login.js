import React, { useState } from "react";
import InputComponent from "../../../components/Inputs/InputComponent2/InputComponent2";
import logo from "../../../assets/img/Logo.svg";
import logoWhite from "../../../assets/img/logoWhite.png";
import { auth } from "../../../services/Auth/AuthActions";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import bg from '../../../assets/img/bg-blue.png'
import { Loading } from '../../../components/Loading/Loading'
import { AiFillEye } from "react-icons/ai";

export const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false)
  const dispatch = useDispatch();
  const loadingIcon = loading && loading === true ? "Cargando..." : "Entrar"
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    watch
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(auth.login(data));
  }

  return (
    <div className="login">

      <div className="login_content" style={{ backgroundImage: `url(${bg})` }}>
        <img alt="resp-logo" src={logoWhite} />
        <h1>INICIA SESIÓN</h1>
        <form className="pt-16" onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            type="text"
            label="Usuario"
            placeholder=""
            icon="fa fa-user-o"
            {...register("User", { required: true })}
            className=""
            error={errors.User}
            errorMsg="El usuario es requerido"
          />
          <div className="input-component2-icon w-11/12 mb-5">
            <p>Contraseña</p>
            <div className="input-component2-icon__content">
              <input type={show ? "text" : "password"} {...register("pass", { required: true })} />
              <AiFillEye className="cursor-pointer" onClick={() => setShow(!show)} />
            </div>
            {errors.pass && (
              <span className="text-white">La contraseña es requerida</span>
            )}
          </div>
          <Link to="/password">¿Olvidaste tu contraseña?</Link>
          <input type="submit" className="submit" value={loadingIcon} />
          <p>
            ¿Aún no tienes una cuenta?
            <b>
              <br />
              <br />
              <Link to="/request">Solicita un usuario</Link>
            </b>
          </p>
        </form>

      </div>
      <div className="login_logo">
        <img alt="logo" src={logo} />
        <span>On play</span>
      </div>
      <Loading visible={loading && loading} />
    </div>
  );
};
