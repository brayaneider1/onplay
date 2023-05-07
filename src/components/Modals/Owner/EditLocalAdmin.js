import React from 'react'
import { message, Modal } from 'antd'
import InputComponent from '../../Inputs/InputComponent3/InputComponent3'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { modalError } from '../../SweetAlert/Error'
import { modalSucces } from '../../SweetAlert/Success'
import Api from '../../../common/Api/Api'
import { Loading } from '../../Loading/Loading'

export const EditLocalAdomin = ({ visible, setVisible, local }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm()

  // Activa las peticion de tipo post para actualizar la cancha  controlando la respuesta de la misma

  const mutation = useMutation(
    (data) => {
      return Api.post('/login/UpdatePasswordLocal', data)
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
            message: 'El usuario se ha modificado de manera correcta',
            reload: true,
          })
        }
      },
      onError: () => {
        modalError({ message: 'Parece que tenemos problemas' })
      },
    }
  )

  //Valida que las dos contraseñas se han iguales,de ser así activa la peticion de lo contrario muestra un mensaje de error

  const onSubmit = (e) => {
    if (e.newpass !== e.newpass2) {
      message.error(' Las contraseñas no coinciden')
    } else {
    }
    mutation.mutate({
      idLocal: local?.IdLocal,
      newpass: e.newpass,
      email: e.email,
    })
  }

  return (
    <Modal
      className="z-1"
      title="Editar datos de usuario"
      open={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-4 justify-center items-center w-full request-local "
      >
        <div className="request-local__content w-full flex ">
          <div className="w-full">
            <InputComponent
              type="email"
              label="Correo electronico"
              icon="fa fa-user-o"
              className=""
              name="NameLocal"
              defaultValue={local?.email}
              {...register('email')}
              error={errors.email}
              errorMsg="Complete este campo"
            />
            <InputComponent
              type="text"
              label="Nueva contraseña"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="Latitude"
              {...register('newpass', { required: true })}
              error={errors.newpass}
              errorMsg="Complete este campo"
            />
            <InputComponent
              type="number"
              label="Repetir contraseña"
              placeholder=""
              icon="fa fa-user-o"
              className=""
              name="Longitude"
              {...register('newpass2', { required: true })}
              error={errors.newpass2}
              errorMsg="Complete este campo"
            />
          </div>
        </div>
        <input type="submit" className="btn-close p-2" value="Aceptar" />
      </form>
      <Loading visible={mutation.isLoading} />
    </Modal>
  )
}
