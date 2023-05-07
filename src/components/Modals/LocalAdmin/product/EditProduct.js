import React from 'react'
import { Modal } from 'antd'
import InputComponent from '../../../Inputs/InputComponent3/InputComponent3';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { modalError } from '../../../SweetAlert/Error';
import { modalSucces } from '../../../SweetAlert/Success';
import Api from '../../../../common/Api/Api';
import { Loading } from '../../../Loading/Loading';

export const EditProduct = ({ visible, setVisible, product }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  // Activa las peticion de tipo post para editar producto controlando la respuesta de la misma

  const mutation = useMutation(data => {
    return Api.post('/products/EditProduct', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {

        modalError({ message: data?.payload.message ? data?.payload.message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "El producto fue editado de manera exitosa.", reload: true, title: 'Cambiado' });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })

  //envia los datos del formulario a la petición post

  const onSubmit = (e) => {
    mutation.mutate({
      idproduct: product?.IdProduct,
      name: e.name || product?.NameProduct,
      valueunit: e.valueunit || product.UnitValue
    })
  };


  return (
    <Modal title="Editar producto" visible={visible} okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-4 justify-center items-center w-full " >
        <InputComponent
          defaultValue={product && product?.IdProduct}
          type="text"
          label="Nombre del producto"
          placeholder=""
          icon="fa fa-user-o"
          className="w-full hidden"
          value={product?.IdProduct}
          error={errors.name}
          errorMsg="Complete este campo"
          {...register("name")}


        />
        <InputComponent
          defaultValue={product && product?.NameProduct}
          type="text"
          label="Nombre del producto"
          placeholder=""
          icon="fa fa-user-o"
          className="w-full"
          error={errors.name}
          errorMsg="Complete este campo"
          {...register("name")}
        />
        <InputComponent
          defaultValue={product && product?.UnitValue}
          type="number"
          label="Precio"
          placeholder=""
          icon="fa fa-user-o"
          className="w-full"
          error={errors.valueunit}
          errorMsg="Complete este campo"
          pattern="[0-9]+"
          {...register("valueunit")}
        />
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  )
}
