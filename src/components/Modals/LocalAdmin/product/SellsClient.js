import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useQuery } from "react-query";
import { Loading } from '../../../Loading/Loading';
import Api from '../../../../common/Api/Api';

export const SellClient = ({ visible, setVisible, dataClient }) => {
  
  // Petición fetch para  las ventas por cliente 
  
  const { data, isLoading } = useQuery(["sellClient", dataClient?.IdUnique], () =>
    Api.get("/products/GetProductConsumed/" + dataClient?.IdUnique)
  );

  if ((data?.payload!=undefined) && (Array.isArray(data?.payload)) && (data?.payload.length > 0)) {
    var reukt = data?.payload?.reduce((x, y) => x?.total + y?.total,undefined)
  }

  return (
    <>
      <Modal className="flex flex-col " title="Ventas por usuario" visible={visible} okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
        <div >
          <Table>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Precio</Th>
                <Th>Cantidad</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(data?.payload) && <>
                {data?.payload.map(i =>
                  <Tr>
                    <Td>
                      <div className="item">{i?.NameProduct}</div>
                    </Td>
                    <Td>
                      <div className="item text-center">{i?.UnitValue}</div>
                    </Td>
                    <Td>
                      <div className="item text-center">{i?.Amount}</div>
                    </Td>
                    <Td>
                      <div className="item text-center">{i?.total}</div>
                    </Td>
                  </Tr>
                )}
              </>}
            </Tbody>
          </Table>
          {/*     <div className="flex justify-between w-full px-2 py-4">
            <h2 className="font-semibold">Total:</h2>
            <span >{Array.isArray(data?.payload) && data?.payload.reduce((a, b) => a?.total + b?.total, 0)}</span>
          </div> */}
        </div>
      </Modal>
      <Loading visible={isLoading} />

    </>
  )
}
