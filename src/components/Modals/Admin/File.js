import React from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Loading } from "../../Loading/Loading";
import { modalSucces } from "../../SweetAlert/Success";
import { modalError } from "../../SweetAlert/Error";

//Modal para modiciar el estado de la solicitud

export const File = ({ visible, setVisible, data }) => {
  var dataForm;

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm();

  //petición fetch para actualizar datos de la petición 

  const {
    isLoading,
    refetch: RegisterFetch,
  } = useQuery(
    "FileRequest",
    async () =>
      await fetch(
        "https://api.onplay.com.co/request/updateRequest",
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
          if (response.ok) {
            modalSucces({ message: 'El estado fue cambiado con exito,', reload: true, title: 'Cambiado' })
          } else {
            modalError({ message: 'Parece que tenemos un error' })

          }
        })
        .catch((err) => err),
    {
      enabled: false,
    }
  );
  const onSubmit = (Data) => {
    dataForm = { "idRequest": data.idRequest, "status": Data.status };
    RegisterFetch();
  };

  return (
    <Modal
      title="Modificar estado de la solicitud"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col request-modal  "
      >
        <div className="input-component3 w-11/12">
          <p>Seleccione el estado</p>
          <select
            name="status"
            className="input-component"
            {...register("status", { required: true })}
          >
            <option key="1" value="A">Archivar</option>
          </select>
        </div>
        <input type="submit" className="my-2 btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={isLoading} />
    </Modal>
  );
};
