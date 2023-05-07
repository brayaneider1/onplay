import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AiOutlineMore } from "react-icons/ai";
import { Popover } from "antd";
import user from "../../../assets/img/user.png";


//Tabla para mostrar los usuarios archivados

export const Archived = () => {

  //contenido de la etiqueta Popover

  const content = (
    <div className="cursor-pointer">
      <p className="cursor-pointer">Quitar suspensión</p>
    </div>
  );

  return (
    <div className="recent">
      <div className="recent_content">
        <Table>
          <Thead>
            <Tr>
              <Th>Propietario</Th>
              <Th>Fin del contrato</Th>
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
                <div className="flex">
                  <Popover placement="bottom" content={content} trigger="click">
                    <AiOutlineMore className="more" />
                  </Popover>
                </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </div>
  );
};
