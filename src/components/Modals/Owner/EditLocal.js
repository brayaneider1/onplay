import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import InputComponent from '../../Inputs/InputComponent3/InputComponent3'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { modalError } from '../../SweetAlert/Error'
import { modalSucces } from '../../SweetAlert/Success'
import File from '../../Inputs/Files'
import Api from '../../../common/Api/Api'
import { Loading } from '../../Loading/Loading'
import { UploadFirebase } from '../../firebase/PromiseUpload'

export const EditLocal = ({ visible, onClose, local }) => {
  const [value, setvalue] = useState('')

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm()

  // Activa las peticion de tipo post para actualizar el local  controlando la respuesta de la misma

  const mutation = useMutation(
    (data) => {
      return Api.post('/local/UpdateLocal', data)
    },
    {
      onSuccess: (data) => {
        if (data?.ok === false) {
          modalError({
            message: data?.payload.message
              ? data?.payload.message
              : 'Revisa tus datos, por favor',
          })
        } else {
          modalSucces({
            message: 'El local se ha editado de manera correcta',
            reload: true,
          })
        }
      },
      onError: () => {
        modalError({ message: 'Parece que tenemos problemas' })
      },
    }
  )

  // Valida los datos del formulario,sube los archivos a firebase,espera la promesa y activa la peticion post

  const onSubmit = (e) => {
    return Promise.all([
      UploadFirebase({ value: value }).then(async (res) => {
        mutation.mutate({
          idLocal: local?.IdLocal,
          namelocal: e.NameLocal || local?.NameLocal,
          address: e.LocalAddress || local?.LocalAddress,
          longitud: e.Longitude || local?.Longitude,
          latitud: e.Latitude || local?.Latitude,
          openTime: e.openTime || local?.openTime,
          closeTime: e.closeTime || local?.closeTime,
          TelefonoLocal: e.TelefonoLocal || local?.TelefonoLocal,
          logo: res,
        })
      }),
    ])
  }

  return (
    <Modal
      className="z-1"
      title="Editar local"
      open={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={onClose}
      destroyOnClose
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-4 justify-center items-center w-full request-local "
      >
        <div className="request-local__content w-full flex ">
          <div className="w-1/2">
            <InputComponent
              type="text"
              label="Nombre local"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="NameLocal"
              defaultValue={local?.NameLocal}
              {...register('NameLocal')}
              error={errors.NameLocal}
              errorMsg="Complete este campo"
            />
            <InputComponent
              type="number"
              label="Latitud"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="Latitude"
              defaultValue={local?.Latitude}
              {...register('Latitude', {
                pattern: /[0-9]{4}/,
                minLength: 10,
                maxLength: 10,
              })}
              pattern="[0-9]+"
              min="-100000000000000"
              step="0.00000000001"
              error={errors.Latitude}
              errorMsg="Complete este campo"
            />
            <InputComponent
              type="number"
              label="Longitud"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="Longitude"
              defaultValue={local?.Longitude}
              {...register('Longitude', {
                pattern: /[0-9]{4}/,
                minLength: 10,
                maxLength: 10,
              })}
              pattern="[0-9]+"
              min="-1000000000000"
              step="0.00000000001"
              error={errors.Longitude}
              errorMsg="Complete este campo"
            />
            <div className="w-11/12">
              <p className="font-bold">Logo</p>
              <File
                typeData={'image/jpeg' || 'image/png' || 'image/jpg'}
                setvalue={setvalue}
                value={value}
              />
            </div>
          </div>
          <div className="w-1/2">
            <InputComponent
              type="text"
              label="Dirección"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="LocalAddress"
              defaultValue={local?.LocalAddress}
              error={errors.LocalAddress}
              errorMsg="Complete este campo"
              {...register('LocalAddress')}
            />
            <InputComponent
              type="number"
              label="Telefono "
              placeholder=""
              max="9999999999"
              icon="fa fa-user-o"
              className=""
              name="TelefonoLocal"
              defaultValue={local?.TelefonoLocal}
              error={errors.TelefonoLocal}
              errorMsg="Complete este campo"
              {...register('TelefonoLocal')}
            />
            <div className="input-component3 w-11/12 pb-6">
              <p>Hora de apertura</p>
              <div
                className="wrap-time"
                style={{ width: '100%', border: '0.009px solid #322b5f8e' }}
              >
                <input
                  type="time"
                  name="openTime"
                  value={watch('openTime')}
                  error={errors.openTime}
                  errorMsg="Complete este campo"
                  {...register('openTime', { required: true })}
                />
                <label>{local?.openTime} </label>
              </div>
            </div>
            <div className="input-component3 w-11/12 pb-4">
              <p>Hora de cierre</p>
              <div
                className="wrap-time"
                style={{ width: '100%', border: '0.009px solid #322b5f8e' }}
              >
                <input
                  type="time"
                  name="closeTime"
                  value={local?.closeTime}
                  error={errors.closeTime}
                  errorMsg="Complete este campo"
                  {...register('closeTime')}
                />
                <label>{local?.closeTime} </label>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  )
}
