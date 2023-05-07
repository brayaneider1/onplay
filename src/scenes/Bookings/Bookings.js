import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useQuery } from "react-query";
import Api from "../../common/Api/Api";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { getCurrentDate } from "../../common/utils/getDate";
import { AddReservation } from "../../components/Modals/LocalAdmin/AddReservation";
import { useDispatch, useSelector } from "react-redux";
import { local } from "../../services/Locals/LocalActions";
import { CancelReservation } from "../../components/Modals/LocalAdmin/CancelReservation";
import moment from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const Bookings = () => {
  const dispatch = useDispatch();
  const { field } = useSelector((state) => state.local);
  const [Hours, setHours] = useState([]);
  const [visible, setVisible] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [date, setDate] = useState(getCurrentDate());
  const [visible2, setVisible2] = useState();
  const params = useParams();

  useEffect(() => {
    dispatch(local.dataField(params.id));
  }, [dispatch]);

  const { data, isLoading } = useQuery(["bookings", date], (data) =>
    Api.post("/reservationWeb/ReservationHour", {
      IdField: params.id,
      ReservationDate: data.queryKey[1],
    })
  );

  function isLate({ hour, date,state }) {
    
    let currentDate = moment();
    let hourAux = hour.slice("", 2);
    let newDate = moment(date).set("hours", +hourAux);
    
    return (newDate < currentDate) || state==="R";
  }

  const onHandleReservation = (e) => {
    setVisible(!visible);
    setDataDetail({ e, date, params });
  };

  useEffect(() => {
    const { openTime, closeTime } = field && field;
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
  }, [field, data]);

  function isAvaliable(hour) {
    var item;

    Array.isArray(data?.payload) &&
      data.payload.map((i) => {
        if (i.ReservationTime.slice("", 5) === hour) {
          item = i;
        }
      });
    return item;
  }

  function onHandleDate(e) {
    setDate(e.target.value);
  }

  const onHandleCancel = (data) => {
    setVisible2(!visible2);
    setDataDetail({ data, date, params });
  };

  return (
    <div className="bookings">
      <div className="bookings_content">
        <Link
          to="/"
          className="flex my-1 self-baseline text-xl text-gray-900 items-center hover:text-gray-900 "
        >
          <AiOutlineArrowLeft className="mr-3" /> Volver
        </Link>
        <div className="head">
          <h3>{date}</h3>
          <form>
            <input type="date" onChange={(e) => onHandleDate(e)} />
            
          </form>
        </div>
        <div className="list">
          {Hours.map((i) => (
            <div className="item">
              <span className="hour">{i.hour}</span>
              <p className="label-user">{isAvaliable(i.hour)?.NameUser} </p>
              {/*  <input
                disabled
                className={isLate({ hour: i.hour, date: date }) ? "w-all" : ""}
                defaultValue={isAvaliable(i.hour)?.NameUser || ""}
              /> */}
              {isAvaliable(i.hour) ? (
                <Button
                  className={
                    isLate({ hour: i.hour, date: date,state:isAvaliable(i.hour)?.StateReservation })
                      ? "invisible w-none"
                      : "visible"
                  }
                  onClick={() =>
                    onHandleCancel({ hour: i, id: isAvaliable(i.hour)?.IdUser })
                  }
                >
                  Cancelar{" "}
                </Button>
              ) : (
                <Button
                  className={
                    isLate({ hour: i.hour, date: date,state:isAvaliable(i.hour)?.StateReservation  })
                      ? "invisible w-none"
                      : "visible"
                  }
                  onClick={() => onHandleReservation(i)}
                >
                  Agendar
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Loading visible={isLoading} />
      <CancelReservation
        visible={visible2}
        setVisible={setVisible2}
        detailData={dataDetail}
      />
      <AddReservation
        dataDetail={dataDetail}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};