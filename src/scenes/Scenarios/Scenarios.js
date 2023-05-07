import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Bookings } from "../../components/Modals/Owner/Bookings";
import { NoData } from "../../components/AuxiliarViews/NoData";
import Api from "../../common/Api/Api";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Loading } from "../../components/Loading/Loading";
import { RequestField } from "../../components/Modals/Owner/RequestField";
import jwt_decode from "jwt-decode";
import { Token } from "../../common/Storage/Token";
import { Button, Popover } from "antd";
import { EditField } from "../../components/Modals/Owner/EditField";
import { AiOutlineArrowLeft, AiOutlineMore } from "react-icons/ai";


export const Scenarios = () => {
  const params = useParams();
  const userData = jwt_decode(Token.getToken());
  const [visible, setvisible] = useState(false);
  const [visible2, setvisible2] = useState(false);
  const [datBooking, setdatBooking] = useState()
  const [visibleField, setvisibleField] = useState(false)
  const [dataField, setdataField] = useState()


  const { data, isLoading } = useQuery("fields", () => Api.get("/field/getfield/" + params.id));
  const { data: datas } = useQuery("fieldsLimit", () => Api.get("/field/getFieldNumber/" + userData.data.IdCompany));

  const onHandleBookig = (data) => {
    setdatBooking(data)
    setvisible(!visible)

  }

  const handleEdit = (data) => {
    setvisibleField(!visibleField)
    setdataField(data)
  }


  const content = (data) => {
    return (
      <div >
        <p onClick={() => handleEdit(data)} className="cursor-pointer hover:bg-gray-100 ">
          Editar cancha
        </p>
      </div>
    )
  }

  return (
    <>
      {Array.isArray(data?.payload) ? (
        <>
      <Link to="/locals" className="ml-16 flex my-1 self-baseline text-xl text-gray-900 items-center hover:text-gray-900 link-back ">
      <AiOutlineArrowLeft className="mr-3"/> Volver
      </Link>
          {data.length !== 0 ? <div className="scenarios">
          
            <span className="title-local"> {params.name}</span>
            <div className="scenarios__content">
          
              {data?.payload.map((i) => (
                <div className="item">
                  <Popover
                    placement="bottom"
                    content={content(i)}
                    trigger="click"
                  >
                    <AiOutlineMore />
                  </Popover>
                  <div className="flex flex-row justify-between items-center">
                    <div className="item_image">
                      <img src={i.photo} />
                    </div>
                    <div className="item_content">
                      <span>{i.NameFieldType}</span>
                      <label>{i.NameField}</label>
                      <p>
                        <b>Precio Dia:  </b>
                        {i.PriceDay}&nbsp;&nbsp;<b>Precio Noche: </b>
                        {i.PriceNight}
                      </p>
                    </div>
                  </div>

                  <Button onClick={() => onHandleBookig(i)} className="btn_accent_blue mx-1"> Ver</Button>

                </div>
              ))}
              {(datas?.payload[0].valor !== 0) && <div onClick={() => setvisible2(true)} className="locals_add">
                <FiPlus />
              </div>}
            </div>
          </div>
            : <> <NoData />
              <div onClick={() => setvisible(true)} className="locals_add">
                <FiPlus />
              </div>
            </>}
        </>) : (
        <NoData />
      )}

      <RequestField id={params.id} visible={visible2} setVisible={setvisible2} />
      <EditField field={dataField} visible={visibleField} setVisible={setvisibleField} />
      <Bookings data={datBooking} visible={visible} setVisible={setvisible} />
      <Loading visible={isLoading} />
    </>
  );
};
