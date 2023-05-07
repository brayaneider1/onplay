import React from "react";
import { Modal } from "antd";
import InputComponent from "../../Inputs/InputComponent3/InputComponent3";


//Modal para ver los datos de la solicitud

export const SeeRequest = ({ visible, setVisible, data }) => {
  return (
    <Modal
      key={data && data.idRequest}
      title="Solicitud"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <form className="flex flex-col request-modal  ">
        <InputComponent
          type="text"
          label="Nombre del solicitante"
          defaultValue={data && data.LegalRepresentative}
          placeholder=""
          icon="fa fa-user-o"
          className="w-auto"
          disabled
        />
        <InputComponent
          type="text"
          label="Nombre de la empresa"
          placeholder=""
          defaultValue={data && data.NameCompany}
          icon="fa fa-user-o"
          className=""
          disabled

        />
        <InputComponent
          type="text"
          label="Número de telefono"
          placeholder=""
          defaultValue={data && data.CompanyPhone}
          icon="fa fa-user-o"
          className=""
          disabled

        />
        <InputComponent
          type="text"
          label="Ciudad"
          placeholder=""
          defaultValue={data && data.Country}
          icon="fa fa-user-o"
          className=""
          disabled

        />
        <InputComponent
          type="text"
          label="Correo"
          placeholder=""
          defaultValue={data && data.CompanyEmail}
          icon="fa fa-user-o"
          className=""
          disabled

        />
      </form>
    </Modal>
  );
};
