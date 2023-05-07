import React from 'react'
import { Modal } from 'antd'
import InputComponent from '../../../Inputs/InputComponent3/InputComponent3';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Api from '../../../../common/Api/Api';
import { modalError } from '../../../SweetAlert/Error';
import { modalSucces } from '../../../SweetAlert/Success';
import { Loading } from '../../../Loading/Loading';

export const NewSell = ({ visible, setVisible, data }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  // Activa la peticion de tipo post para insertar productos consumidos controlando la respuesta de la misma

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
    mutation.mutate({ ...data, idunique: "" })
  }

  return (
    <Modal title="Nueva venta" visible={visible} okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-4 px-4 justify-center w-full " >
        <InputComponent
          type="text"
          label="Nombre del cliente"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-1"
          name="NameCustomer"
          {...register("NameCustomer", { required: true })}
        />
        {/*         <div className="flex flex-row justify-between ">
 */}          <div className="input-component3  w-11/12 mb-5 ">
          <p> Productos </p>
          <select {...register("IdProduct", { required: true })}
          >
            {Array.isArray(data?.payload) && data?.payload.map(i =>
              <option id={i.IdProduct} value={i.IdProduct}>{i.NameProduct}</option>
            )}
          </select>
        </div>
        <InputComponent
          type="text"
          label="Cantidad"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="Amount"
          {...register("Amount", { required: true })}
        />
        {/*         </div>
 */}        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />

    </Modal>
  )
}
