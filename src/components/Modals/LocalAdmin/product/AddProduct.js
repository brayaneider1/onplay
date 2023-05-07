import React from 'react'
import { Modal } from 'antd'
import InputComponent from '../../../Inputs/InputComponent3/InputComponent3';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { modalError } from '../../../SweetAlert/Error';
import { modalSucces } from '../../../SweetAlert/Success';
import Api from '../../../../common/Api/Api';
import jwt_decode from "jwt-decode";
import { Token } from "../../../../common/Storage/Token";
import { Loading } from '../../../Loading/Loading';

export const AddProduct = ({ visible, setVisible }) => {
  const userData = jwt_decode(Token.getToken());

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  // Activa las peticion de tipo post controlando la respuesta de la misma

  const mutation = useMutation(data => {
    return Api.post('/products/InsertProduct', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {

        modalError({ message: data?.payload.message ? data?.payload.message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "La petición se ha realizado de manera exitosa", reload: true });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })

  //envia los datos del formulario a la petición post

  const onSubmit = (e) => {
    mutation.mutate({ ...e, IdLocal: userData?.data?.IdLocal })
  };


  return (
    <Modal title="Agregar producto" visible={visible} okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-4 justify-center items-center w-full " >
        <InputComponent
          type="text"
          label="Nombre del producto"
          placeholder=""
          icon="fa fa-user-o"
          className="w-full"
          name="NameProduct"
          error={errors.NameProduct}
          errorMsg="Complete este campo"
          {...register("NameProduct", { required: true })}
        />
        <InputComponent
          type="number"
          label="Precio"
          placeholder=""
          icon="fa fa-user-o"
          className="w-full"
          name="UnitValue"
          error={errors.UnitValue}
          errorMsg="Complete este campo"
          pattern="[0-9]+"
          {...register("UnitValue", { required: true })}
        />
        {/*    <InputComponent
          type="number"
          label="Cantidad disponible"
          placeholder=""
          icon="fa fa-user-o"
          className="w-full"
          name="Amount"
          error={errors.Amount}
          errorMsg="Complete este campo"
          pattern="[0-9]+"
          {...register("Amount", { required: true })}
        /> */}
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  )
}
