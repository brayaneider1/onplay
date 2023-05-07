import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Calendar } from "antd";
import { useQuery } from "react-query";
import Api from "../../../common/Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { local } from '../../../services/Locals/LocalActions'
import moment from 'moment'

// Modal para reservar una cancha

export const Bookings = ({ visible, setVisible, data }) => {
  const [dataCalendar, setdataCalendar] = useState()
  const [visibleBookings, setvisibleBookings] = useState()
  const [Hours, setHours] = useState([]);
  const dispatch = useDispatch();
  const { field } = useSelector((state) => state.local);



  // Activa las peticion de tipo post para reservar cancha controlando la respuesta de la misma

  const { data: dataReservationHourse, isLoading } = useQuery(
    ["bookings", data, dataCalendar],
    () =>
      Api.post("/reservationWeb/ReservationHour", {
        IdField: data?.IdField,
        ReservationDate: dataCalendar,
      })
  );

  function isAvaliable(hour) {
    var item;
    Array.isArray(dataReservationHourse?.payload) && dataReservationHourse.payload.map((i) => {
      if (i.ReservationTime.slice("", 5) === hour) {
        item = i
      }
    })
    return item;
  }





  //Esta funcion toma el horario de apertura y el de cierre para crear un listado por cada hora 

  useEffect(() => {
    if (field) {
      const { openTime, closeTime } = field;
      const start = Number(openTime.slice("", 2));
      const close = Number(closeTime.slice("", 2));
      let hours = [];

      for (let i = start; i <= close; i++) {

        if (i.toString().length === 1) {
          hours.push({ hour: "0" + i + ":00" });
        } else {
          hours.push({ hour: i + ":00" });
        }
      }
      setHours(hours);
    }

  }, [field, dataReservationHourse]);


  function onPanelChange(value, mode) {
    setdataCalendar(value.format('YYYY-MM-DD'))
    setvisibleBookings(!visibleBookings)
  }



  useEffect(() => {
    dispatch(local.dataField(data?.IdField))
  }, [dispatch, data])

  //Esta función hace la validacion necesaria para desactivar el boton de agendar si una hora del listado es menor a la hora actual 

  function isLate({ hour, date }) {
    let currentDate = moment()
    let hourAux = hour.slice("", 2)
    let newDate = moment(date).set('hours', +hourAux)
    return newDate < currentDate;
  }




  return (
    <>
      <Modal
        title="Reservas"
        visible={visible}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => setVisible(!visible)}
      >
        <div className="booking site-calendar-demo-card">
          <Calendar
            onSelect={onPanelChange}
            onPanelChange={onPanelChange}
            fullscreen={false}
          />
        </div>
      </Modal>

      <Modal

        title="Horarios reservados"
        visible={visibleBookings}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => setvisibleBookings(!visibleBookings)}>
        <div style={{ width: '60vw' }} className="bookings_content">
          <div className="list">
            {Hours.map((i) => {
              var data = isAvaliable(i.hour)
              return (
                <div className="item">
                  <span className="hour">{i.hour}</span>
                  <input disabled className={isLate({ hour: i.hour, date: dataCalendar }) ? "w-all" : ""} defaultValue={data?.NameUser || ""} />
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};
