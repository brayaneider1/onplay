import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import InputComponent from '../../Inputs/InputComponent3/InputComponent3';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { modalError } from '../../SweetAlert/Error';
import { modalSucces } from '../../SweetAlert/Success';
import File from "../../Inputs/Files";
import Api from '../../../common/Api/Api';
import { Loading } from '../../Loading/Loading';
import { UploadFirebase } from '../../firebase/PromiseUpload';

export const EditField = ({ visible, setVisible, field }) => {
  const [value, setvalue] = useState("");
  const { data, isLoading } = useQuery("fieldTypes", () =>
    Api.get("/field/types")
  );
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  // Activa las peticion de tipo post para actualizar la cancha  controlando la respuesta de la misma


  const mutation = useMutation(data => {
    return Api.post('/field/UpdateField', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {

        modalError({ message: data?.payload.message ? data?.payload.message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "El escenario se ha editado de manera correcta", reload: true });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })

  // Valida los datos del formulario,sube los archivos a firebase,espera la promesa y activa la peticion post


  const onSubmit = (e) => {
    return Promise.all([
      UploadFirebase({ value: value }).then(async (res) => {
        mutation.mutate({
          idField: field?.IdField,
          namefield: e.NameField,
          priceDay: e.PriceDay,
          priceNight: e.PriceNight,
          idFieldType: e.idFieldType,
        })
      }),
    ])
  };


  return (
    <Modal className="z-1" title="Editar cancha" visible={visible} okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
      <form onSubmit={handleSubmit(onSubmit)} className="request-local">
        <InputComponent
          type="text"
          label="Nombre de la cancha"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="NameField"
          defaultValue={field?.NameField}
          {...register("NameField")}
          error={errors.NameField}
          errorMsg="Complete este campo"
        />
        <InputComponent
          type="number"
          label="Precio en el día"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="PriceDay"
          pattern="[0-9]+"
          defaultValue={field?.PriceDay}
          {...register("PriceDay")}
          error={errors.PriceDay}
          errorMsg="Complete este campo"
        />
        <InputComponent
          type="number"
          label="Precio en la noche"
          placeholder=""
          icon="fa fa-user-o"
          className=""
          name="PriceNight"
          pattern="[0-9]+"
          defaultValue={field?.PriceNight}
          {...register("PriceNight")}
          error={errors.PriceNight}
          errorMsg="Complete este campo"
        />
        <div className="input-component3 w-11/12">
          <p>Deporte </p>
          <select
            name="idFieldType"
            {...register("idFieldType")}
          >
            {data?.payload?.map((i) => (
              <option value={i.IdFieldType}>{i.NameFieldType}</option>
            ))}
          </select>
        </div>
        <input type="submit" className="submit" value="Enviar" />
      </form>
      <Loading visible={mutation.isLoading || isLoading} />
    </Modal>
  )
}
