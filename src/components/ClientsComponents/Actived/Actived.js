import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AiOutlineMore } from "react-icons/ai";
import { Popover } from "antd";
import { LocalData } from "../../Modals/Owner/LocalData";
import { Suspension } from "../../Modals/Owner/Suspension";

//Tabla para mostrat los usuarios activos 

export const Actived = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [dataClient, setdataClient] = useState(false)

  // recibe un parametro data, guardado en un estado local,y muetra una modal con los datos recibidos en el parametro
  const handleDataClient = (data) => {
    setdataClient(data)
    setVisible(!visible)
  }


  // contenido de la etiqeuta Popover

  const content = (
    <div className="cursor-pointer">
      <p onClick={() => setVisible2(!visible2)} className="cursor-pointer">
        Suspender
      </p>
    </div>
  );

  return (
    <div className="recent">
      <div className="recent_content">
        <Table>
          <Thead>
            <Tr>
              <Th>Propietario</Th>
              <Th>Tiempo de contrato</Th>
              <Th>Inicio de contrato</Th>
              <Th>Fin del contrato</Th>
              <Th>Valor del contrato</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(data) &&
              data?.map((i, index) => (
                <Tr key={index}>
                  <Td>
                    <div className="flex items-center">
                      {/*                       <img className="w-10 h-10 rounded-full mr-4" src={user} />
 */}                      <div className="item">
                        <span>{i.LegalRepresentative}</span>
                        <p>Enviado hace un dia</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="item ">
                      <span>4 meses</span>
                      <p>24.05.2020</p>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="item">
                      <span>{i?.StartDate?.split("", 10)}</span>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="item">
                      <span>{i?.EndDate?.split("", 10)}</span>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="item">
                      <span>30 mil/mes</span>
                    </div>
                  </Td>
                  <Td className="relative">
                    <div className="flex">
                      <div
                        onClick={() => handleDataClient(i)}
                        className="bg-green-300 rounded-xl mr-4 cursor-pointer py-1 px-4 text-white"
                      >
                        Ver
                      </div>
                      <Popover
                        placement="bottom"
                        content={content}
                        trigger="click"
                      >
                        <AiOutlineMore className="more cursor-pointer" />
                      </Popover>
                    </div>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </div>
      <LocalData dataClient={dataClient} visible={visible} setVisible={setVisible} />
      <Suspension visible={visible2} setVisible={setVisible2} />
    </div>
  );
};
