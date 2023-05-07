import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AiOutlineMore } from "react-icons/ai";
import {  Popover } from "antd";
import user from "../../../assets/img/user.png";

import { History } from "../../Modals/LocalAdmin/product/History";
import { AddTerm } from "../../Modals/Owner/AddTerm";

export const Recent = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const content = (
    <div className="cursor-pointer">
      <p onClick={()=>setVisible(!visible)} className="cursor-pointer my-4">Alargar Plazo</p>
      <p  className="cursor-pointer my-4">Suspender Servicio</p>
      <p onClick={()=>setVisible2(!visible2)} className="cursor-pointer my-4">Historial de pagos</p>
    </div>
  );

  return (
    <div className="recent">
      <div className="recent_content">
        <Table>
          <Thead>
            <Tr>
              <Th>Propietario</Th>
              <Th>Fecha de pago</Th>
              <Th>Valor del contrato</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full mr-4" src={user} />{" "}
                  <div className="item">
                    <span>Carlos arturo</span>
                    <p>Enviado hace un dia</p>
                  </div>
                </div>
              </Td>
              <Td className="relative">
                <div className="item">
                  <span>07-12-2021</span>
                </div>
              </Td>
              <Td className="relative">
                <div className="item">
                  <span>60 mil/mes</span>
                </div>
              </Td>
              <Td className="relative">
                <div className="flex">
                  <div className="bg-green-300 rounded-xl mr-4 cursor-pointer py-1 px-4 text-white">Cobrar</div>
                  <Popover placement="bottom" content={content} trigger="click">
                    <AiOutlineMore className="more cursor-pointer" />
                  </Popover>
                </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
      <AddTerm visible={visible} setVisible={setVisible}/>
      <History visible={visible2} setVisible={setVisible2}/>
    </div>
  );
};
