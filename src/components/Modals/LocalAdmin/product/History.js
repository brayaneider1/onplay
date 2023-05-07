import React from "react";
import { Modal } from "antd";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export const History = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Agregar plazo"
      visible={visible}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={() => setVisible(!visible)}
    >
      <div className="recent_content" style={{width:'40vw'}}>
      <Table>
        <Thead>
          <Tr>
            <Th>Fecha de Facturación</Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td className="relative">
              <div className="item ">
                <span>03-Abril-2021</span>
                <p></p>
              </div>
            </Td>
            <Td className="relative">
              <div className="item ">
                <span>La cima del futbol</span>
                <p></p>
              </div>
            </Td>
          </Tr>
        </Tbody>
      </Table>
  
      </div>
   </Modal>
  );
};
