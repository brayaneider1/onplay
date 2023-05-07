import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AiOutlineMore } from "react-icons/ai";
import {  Popover } from "antd";
import user from "../../../assets/img/user.png";

export const Archived = () => {
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
              <Th>Fecha de Facturación</Th>
              <Th>Nombre del local</Th>
              <Th>Estado</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td className="relative">
                <div className="item">
                  <span>07-12-2021</span>
                  <p>Enviado hace un dia</p>
                </div>
              </Td>
              
              <Td className="relative">
                <div className="item">
                  <span>La cima del futbol</span>
                </div>
              </Td>
              <Td className="relative">
                <div className="item">
                  <span>Pagado</span>
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
