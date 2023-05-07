import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AiFillEye } from "react-icons/ai";
import { FaPhoneSquare } from "react-icons/fa";
import user from "../../../assets/img/user.png";
import { SuccessRequest } from "../../Modals/Admin/Success";
import { SeeRequest } from "../../Modals/Admin/SeeRequest";
import { NoData } from "../../AuxiliarViews/NoData";
import { File } from "../../Modals/Admin/File";
import { Contact } from "../../Modals/Admin/Contact";

export const Recent = ({ data, success, archived, contact }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visibleFile, setVisibleFile] = useState(false);
  const [visibleContact, setVisibleContact] = useState(false);
  const [dataClient, setDataClient] = useState();

  // activa la modal see Request y envia los datos de la fila 


  const onHandleData = (data) => {
    setVisible2(!visible2);
    setDataClient(data);
  };

  // activa la modal File y envia los datos de la fila 

  const onHandleFile = (data) => {
    setVisibleFile(!visibleFile);
    setDataClient(data);
  };
  // activa la modal Success Request y envia los datos de la fila 


  const onHandleContact = (data) => {
    setVisibleContact(!visibleContact);
    setDataClient(data);
  };

  // activa la modal  Check  y envia los datos de la fila 

  const onHandleSuccess = (data) => {
    setVisible(!visible);
    setDataClient(data);
  };

  return (
    <div className="recent">
      <div className="recent_content">
        {Array.isArray(data) &&
          data.length !== 0 ?
          <Table>
            <Thead>
              <Tr>
                <Th>Propietario</Th>
                <Th>Nombre local</Th>
                <Th>Número</Th>
                <Th>Acción</Th>
              </Tr>
            </Thead>
            <Tbody> {
              data.map((i) => (
                <Tr>
                  <Td>
                    <div className="flex items-center">
                      {/*                       <img className="w-10 h-10 rounded-full mr-4" src={user} />
 */}                      <div className="item">
                        <span>{i.LegalRepresentative}</span>
                        <br />
                        <p>Solicado{i.dateRegister.split("", 10)}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="item ">
                      <span>{i.NameCompany}</span>
                      <p>{i.State}</p>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="item">
                      <span>{i.CompanyPhone}</span>
                      <p>{i.Municipality}</p>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="actions-container">
                      {success && <div
                        onClick={() => onHandleSuccess(i)}
                        className="cursor-pointer mr-2 text-md p-1 bg-green-400 rounded-xl ">
                        Aceptar
                      </div>}
                      <AiFillEye
                        onClick={() => onHandleData(i)}
                        className="cursor-pointer mr-2 text-xl bg-blue-400 rounded-xl "
                      />{archived &&
                        <div onClick={() => onHandleFile(i)} className="cursor-pointer text-md p-1 bg-red-500 rounded-xl">
                          Archivar
                        </div>}
                      {contact && <FaPhoneSquare onClick={() => onHandleContact(i)} className="cursor-pointer ml-3 text-3xl text-blue-600 " />}

                    </div>
                  </Td>
                </Tr>
              ))
            }
            </Tbody>
          </Table> :
          <NoData />
        }
      </div>
      <SuccessRequest
        key={dataClient?.idRequest}
        visible={visible}
        setVisible={setVisible}
        data={dataClient}
      />
      <SeeRequest
        key={dataClient?.idRequest}
        visible={visible2}
        setVisible={setVisible2}
        data={dataClient}
      />
      <File
        key={dataClient?.idRequest}
        visible={visibleFile}
        setVisible={setVisibleFile}
        data={dataClient}
      />
      <Contact
        key={dataClient?.idRequest}
        visible={visibleContact}
        setVisible={setVisibleContact}
        data={dataClient}

      />
    </div>
  );
};
