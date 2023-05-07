import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputComponent from "../../components/Inputs/InputComponent3/InputComponent3";
import logo from "../../assets/img/logoWhite.png";
import { Link } from "react-router-dom";
import bg from "../../assets/img/bg-blue.png";
import { useMutation, useQuery } from "react-query";
import { Loading } from "../../components/Loading/Loading";
import Api from "../../common/Api/Api";
import { modalSucces } from "../../components/SweetAlert/Success";
import { modalError } from "../../components/SweetAlert/Error";
import { InputNumber } from "antd";

export const Request = () => {
  var Departamento;
  var ciudad;
  var dataForm;

  const [states, setstates] = useState();

  const handleState = (e) => {
    setstates(e.target.value);
    Departamento = e.target.value;
    refetch();
  };

  const handlecity = (e) => {
    ciudad = e.target.value;
    refetchcity();
  };
  const { data: countries } = useQuery("countries", () =>
    fetch("https://countriesnow.space/api/v0.1/countries/positions").then(
      (res) => res.json()
    )
  );

  const { data: state, refetch } = useQuery(
    "state",
    async () =>
      await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: Departamento }),
      })
        .then((response) => response.json())
        .catch((err) => err),
    {
      enabled: false,
    }
  );

  const { data: city, refetch: refetchcity } = useQuery(
    "city",
    async () =>
      await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            country: states,
            state: ciudad,
          }),
        }
      )
        .then((response) => response.json())
        .catch((err) => err),
    {
      enabled: false,
    }
  );


  const {
    handleSubmit,
    formState: { errors },
    register,
    watch
  } = useForm();
  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything

  const mutation = useMutation(data => {

    return Api.post('/request/postsolicitud ', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {
        modalError({ message: data?.payload.message ? data?.payload.message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "La petición se ha realizado de manera exitosa", url: "/" });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })

  const onSubmit = (data) => {
    dataForm = { ...data };
    mutation.mutate(dataForm)
  };




  const onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  return (
    <div className="request">
      <div className="request_logo" style={{ backgroundImage: `url(${bg})` }}>
        <img alt="logo" src={logo} />
        <span>
          On play</span>
        <p>
          ¿Ya no tienes una cuenta?
          <b>
            <Link to="/"> Inicia sesion</Link>
          </b>
        </p>
      </div>

      <div className="request_content">
        <h1>Solicita un usuario</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputComponent
            type="text"
            label="Nombre de la empresa"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="NameCompany"
            error={errors.NameCompany}
            errorMsg="Complete este campo"
            {...register("NameCompany", { required: true })}
          />
          <InputComponent
            type="text"
            label="País"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="Country"
            error={errors.Country}
            errorMsg="Complete este campo"
            select
            options={countries?.data}
            {...register("Country", { required: true })}
            onChange={(e) => handleState(e)}
            defaultValue={countries?.data[46]}

          />
          <InputComponent
            type="text"
            label="Departamento o estado"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            error={errors.State}
            errorMsg="Complete este campo"
            name="State"
            select
            options={state?.data?.states}
            {...register("State", { required: true })}
            onChange={(e) => handlecity(e)}
          />
          <InputComponent
            type="text"
            label="Ciudad"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="Municipality"
            error={errors.Municipality}
            errorMsg="Complete este campo"
            select
            options={city?.data}
            {...register("Municipality", { required: true })}
            boris={true}
          />
          <InputComponent
            type="text"
            label="Nombre del representante"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="LegalRepresentative"
            error={errors.LegalRepresentative}
            errorMsg="Complete este campo"
            {...register("LegalRepresentative", { required: true })}
          />
          <InputComponent
            type="number"
            label="Teléfono "
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="CompanyPhone"
            error={errors.CompanyPhone}
            errorMsg="El tamaño debe ser de 10 caracteres"
            pattern="[0-9]+"
            {...register("CompanyPhone", {
              required: true, pattern: /[0-9]{4}/, minLength: 10,
              maxLength: 10
            })}
          />

          <InputComponent
            type="email"
            label="Correo electrónico"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="CompanyEmail"
            error={errors.CompanyEmail}
            errorMsg="Complete este campo"
            {...register("CompanyEmail", { required: true })}
          />

          <input type="submit" value="Guardar" className="submit " />
        </form>
      </div>
      <Loading visible={mutation.isLoading} />
    </div>
  );
};
