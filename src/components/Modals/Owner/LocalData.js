import React from "react";
import { Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";
import { useQuery } from "react-query";
import Api from "../../../common/Api/Api";

//los datos de la variable dataClient se  muetran en diferentes inputs

export const LocalData = ({ visible, setVisible, dataClient }) => {
 

  //petición get trae los detalles de un usuario 
  const { data } = useQuery(
    "ClientDetail",
    () => Api.get("/user/getDetailUsers/" + dataClient.IdCompany),
    {
      refetchOnWindowFocus: false,
      enabled: visible,
    }
  );


  return (
    <Modal
      title=""
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form className="request-local">
        <div className="w-full flex local-data">
          <div className="w-full">
            <InputComponent  defaultValue={data?.payload[0].LegalRepresentative} type="text" label="Nombre" disabled />
            <InputComponent defaultValue={data?.payload[0].Identification} type="text" label="Numero de identificación" disabled />
            <InputComponent defaultValue={data?.payload[0].Phone} type="text" label="Telefono" disabled />
            <InputComponent defaultValue={data?.payload[0].Email} type="text" label="Correo" disabled />
            <InputComponent defaultValue={data?.payload[0].UserName} type="text" label="Nombre de usuario" disabled />
            <InputComponent defaultValue={data?.payload[0].Address} type="text" label="Dirección" disabled />
            <InputComponent defaultValue={data?.payload[0].NameCompany} type="text" label="Nombre de la empresa " disabled/>
          </div>
          <div className="w-full ">
            <InputComponent defaultValue={data?.payload[0].NitCompany} type="text" label="NIT " placeholder="" disabled/>
            <InputComponent defaultValue={data?.payload[0].CompanyAddress} type="text" label="Dirección de la empresa" disabled/>
            <InputComponent defaultValue={data?.payload[0].Municipality} type="text" label="Ciudad " disabled/>
            <InputComponent defaultValue={data?.payload[0].CompanyPhone} type="text" label="Telefono de la empresa" disabled/>
            <InputComponent defaultValue={data?.payload[0].NumberLocal} type="text" label="Número de locales " disabled/>
            <InputComponent defaultValue={data?.payload[0].NumberFields} type="text" label="Número de canchas " disabled />
            <InputComponent defaultValue={data?.payload[0].CompanyEmail} type="text" label="Correo de la empresa "  disabled/>
          </div>
        </div>
      </form>
    </Modal>
  );
};
