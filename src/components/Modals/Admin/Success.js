import React from "react";
import { message, Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Loading } from "../../Loading/Loading";

// Modal para aceptar la solictud

export const SuccessRequest = ({ visible, setVisible, data }) => {
  var dataForm;

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm();

  // petición para aceptar la solicitud

  const {
    data: response,
    isLoading,
    refetch: RegisterFetch,
  } = useQuery(
    "register",
    async () =>
      await fetch(
        "https://api.onplay.com.co/request/UpdateNumber/" + data?.CompanyEmail,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(dataForm),
        }
      )
        .then((response) => {
          response.json()
          window.location = "/request"
        })
        .catch((err) => err),
    {
      enabled: false,
    }
  );

  // Envia los datos a la peticion fetch

  const onSubmit = (data) => {
    dataForm = { ...data, };

    if (data.LocalNumber > data.FieldsNumber) {
      message.error(
        "El número de locales no puede ser mayor al número de canchas"
      );
    } else {
      if (data.EndDate < data.StartDate) {
        message.error(
          "La fecha final no puede ser menor a la inicial"
        );
      } else {
        RegisterFetch();

      }
    }
  };

  return (
    <Modal
      title="Aceptar solicitud"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}

        className="flex flex-col request-modal "
      >
        <InputComponent
          type="number"
          label="Número de locales"
          placeholder=""
          icon="fa fa-user-o"
          className="w-auto"
          name="LocalNumber"
          pattern="[0-9]+"
          {...register("LocalNumber", { required: true })}
        />
        <InputComponent
          type="number"
          label="Número de canchas"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="FieldsNumber"
          pattern="[0-9]+"

          {...register("FieldsNumber", { required: true })}
        />

        <div className="input-component3 w-11/12 ">
          <p>Fecha de inicio</p>
          <input
            className="w-11/12 "
            type="date"
            name="StartDate"
            error={errors.StartDate}
            {...register("StartDate", { required: true })}
          />
        </div>
        <div className="input-component3 w-11/12">
          <p>Fecha de fin</p>
          <input
            className="w-11/12"
            type="date"
            name="EndDate"
            error={errors.EndDate}
            {...register("EndDate", { required: true })}
          />
        </div>
        <input type="submit" className="my-2 btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={isLoading} />
    </Modal>
  );
};
