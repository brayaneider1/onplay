import React from 'react'
import {Modal} from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";


export const ListHistory = ({ visible, setVisible }) => {

	
	return (
		<Modal title="Detalle de ventas" visible={visible} okButtonProps={{ hidden: true }}
			cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
      <div className="sells">
      <Table>
        <Thead>
          <Tr>
            <Th>Cliente</Th>
            <Th>Valor final</Th>
            <Th>Acción</Th>
          </Tr>
        </Thead>
        <Tbody className="bg-blue-100 rounded-sm " >
        <Tr >
            <Td>
              asas
            </Td>
            <Td>
            </Td>
            <Td>
            </Td>
          </Tr>

        </Tbody>
      </Table>
   
      </div>
   
				
		</Modal>
	)
}
