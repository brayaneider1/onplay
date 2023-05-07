import React from "react";
import { Modal } from "antd";
import InputComponent from "../../../Inputs/InputComponent3/InputComponent3";
import { useForm } from "react-hook-form";
import { modalError } from "../../../SweetAlert/Error";
import { modalSucces } from "../../../SweetAlert/Success";
import { useMutation } from "react-query";
import Api from "../../../../common/Api/Api";
import { Loading } from "../../../Loading/Loading";

export const AddSellClient = ({ visible, setVisible, products, dataConsumer }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();


  // Activa las peticion de tipo post para insertar productos consumidos controlando la respuesta de la misma

  const mutation = useMutation(data => {
    return Api.post('/products/InsertProductsConsumed', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {
        modalError({ message: data?.payload.message ? data?.payload.message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "La venta se ha realizado de manera exitosa", reload: true });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })

  //envia los datos del formulario a la petición post

  const onSubmit = (data) => {
    mutation.mutate({ ...data, NameCustomer: dataConsumer?.NameCustomer, idunique: dataConsumer?.IdUnique })
  }


  return (
    <Modal
      title="Agregar venta"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
        <div className="flex flex-row justify-evenly w-full">
          <div className="input-component3 mr-3 ">
            <p> Productos </p>
            <select {...register("IdProduct", { required: true })}
            >
              {Array.isArray(products?.payload) && products?.payload.map(i =>
                <option id={i.IdProduct} value={i.IdProduct}>{i.NameProduct}</option>
              )}
            </select>
          </div>
          <InputComponent
            type="number"
            label="Cantidad"
            placeholder=""
            icon="fa fa-user-o"
            className=""
            name="Amount"
            pattern="[0-9]+"
            {...register("Amount", { required: true })}
            errors={errors.Amount}
            pattern="[0-9]+"

            errorMsg="Debe llenar este campo"
          />
        </div>
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  );
};
