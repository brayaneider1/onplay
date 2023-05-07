import React, { useState } from 'react'
import { Modal } from 'antd'
import { reservations } from '../../../services/Reservations/ReservationsActions'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from "react-query";
import Api from '../../../common/Api/Api';
import { Loading } from '../../Loading/Loading';
import NoData from '../../../assets/img/NoData.svg';
import { BiUserCircle } from 'react-icons/bi'
import { useForm } from "react-hook-form";

export const AddReservation = ({ dataDetail, visible, setVisible }) => {
  const { loading } = useSelector((state) => state.reservation);
  var document;
  const [documents, setDocuments] = useState()
  const dispatch = useDispatch();

  const { data, isLoading, refetch } = useQuery(
    "getUserIdentification",
    () =>
      Api.get("/reservationWeb/GetUserIdentification/" + document),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const {
    handleSubmit,
    register,
  } = useForm();

  //Esta funcion busca el valor introducido en el input y lo envia al fetch

  const onBlurDocumet = (e) => {
    document = e.target.value
    setDocuments(e.target.value)
    console.log(e.target.value)
    refetch()

  }

  //envia los datos del formulario al dispatch de redux

  const onSubmit = (values) => {
    console.log('form', values)
    console.warn(document)
    dispatch(reservations.postReservation({
      ReservationDate: dataDetail.date,
      ReservationHour: dataDetail.e.hour,
      IdField: parseInt(dataDetail.params.id),
      Iduser: parseInt(data.payload[0].IdUser),
      Name: values.Name,
      Phone: values.Phone
    }))
  }

  return (
    <Modal title="Agregar reservación" visible={visible} okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
      <form className="flex flex-col mx-4 justify-center items-center w-full " >
        <div className="input-component3 w-64 ">
          <p>Número de documento</p>
          <input pattern="[0-9]+"
            type="number" onChange={onBlurDocumet} placeholder="Ej: 1116207543" />
        </div>
        <span>{document} </span>
      </form>
      {!data?.payload ? <img className="mx-auto my-12 w-2/6" alt="no-data" src={NoData} /> :
        data.payload.message ? <div className="mx-auto "> <img className="mx-auto my-12 w-2/6" alt="no-data" src={NoData} /> <p className="font-medium mx-auto text-2xl text-blue-900 text-center">{data.payload.message} </p> </div> :
          data.payload[0].NameUser === "Onplay" ?
            <div className="flex flex-col space-between items-center my-6" >
              <div className="w-7/12 flex self-start space-between items-center">
                <BiUserCircle className="font-medium mx-auto text-2xl text-blue-900 text-center 6" />
                <p className="font-medium mx-auto text-2xl text-blue-900 text-center mr-6">{data.payload[0].NameUser} </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-component3 w-64 ">
                  <p>Nombre</p>
                  <input {...register("Name")} name="Name" type="text" placeholder="opcional" />
                </div>
                <div className="input-component3 w-64 mb-4 ">
                  <p>Número de contacto</p>
                  <input {...register("Phone")} name="Phone" type="number" placeholder="opcional" pattern="[0-9]+"
                  />
                </div>
                <input type="submit" className=" flex text-center mx-auto cursor-pointer w-5/12 rounded-lg bg-transparent border-2 border-blue-900 text-blue-900 py-1 px-2.5 hover:bg-gray-200 " value="Agendar" />

              </form>
            </div>

            :


            <div className="flex space-between items-center my-6" >
              <div className="w-7/12 flex space-between items-center">
                <BiUserCircle className="font-medium mx-auto text-2xl text-blue-900 text-center 6" />
                <p className="font-medium mx-auto text-2xl text-blue-900 text-center mr-6">{data.payload[0].NameUser} </p>
              </div>
              <button onClick={onSubmit} className="w-5/12 rounded-lg bg-transparent border-2 border-blue-900 text-blue-900 py-1 px-2.5 hover:bg-gray-200 justify-center " >Agendar</button>

            </div>

      }
      <Loading visible={isLoading || loading} />
    </Modal>
  )
}
