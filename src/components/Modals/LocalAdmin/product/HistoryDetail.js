import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useQuery } from "react-query";
import { Loading } from '../../../Loading/Loading';
import Api from '../../../../common/Api/Api';
import jwt_decode from "jwt-decode";
import { Token } from "../../../../common/Storage/Token";


export const HistoryDeatail = ({ visible, setVisible, dataHistory }) => {
  const userData = jwt_decode(Token.getToken());


  // Petición get para traer los datos del historial de ventas  

  const { data, isLoading } = useQuery(["HistoryDeatail", dataHistory], () =>
    Api.post("/products/DetailHistorySale", {
      idLocal: userData?.data?.IdLocal,
      dataSale: dataHistory?.DateRegisterProductsConsumed
    })
  );

  return (
    <>
      <Modal className="flex flex-col " title="Ventas por usuario" visible={visible} okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
        <div >
          <Table>
            <Thead>
              <Tr>
                <Th>Cliente</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(data?.payload) && <>
                {data?.payload.map(i =>
                  <Tr>
                    <Td>
                      <div className="item">{i?.NameCustomer}</div>
                    </Td>
                    <Td>
                      <div className="item ml-1">{i?.total}</div>
                    </Td>
                  </Tr>
                )}
              </>}
            </Tbody>
          </Table>
          <div className="flex mt-5  w-full py-4 mx-auto justify-center ">
            <h2 className="font-semibold mr-2">Total:</h2>
            <span >{dataHistory?.total}</span>
          </div>
        </div>
      </Modal>
      <Loading visible={isLoading} />

    </>
  )
}
