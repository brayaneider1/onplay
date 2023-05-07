import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useQuery, useMutation } from 'react-query';
import { Loading } from '../../../Loading/Loading';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { modalError } from '../../../SweetAlert/Error';
import { modalSucces } from '../../../SweetAlert/Success';
import Api from '../../../../common/Api/Api';
const { confirm } = Modal;




export const CloseShells = ({ visible, setVisible, data }) => {

  // muestra modal con pregunta de confirmación

  function showConfirm() {
    confirm({
      title: '¿Esta seguro que desea cerrar esta venta?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Si',
      cancelText: 'No',
      onOk() {
        mutation.mutate({ "idunique": data?.IdUnique })
      }
    });
  }

  // Activa las peticion de tipo post controlando la respuesta de la misma

  const mutation = useMutation(data => {
    return Api.post('/products/CloseSale', data)
  }, {
    onSuccess: data => {
      if (data?.ok === false) {
        modalError({ message: data?.payload.Message ? data?.payload.Message : 'Revisa tus datos, por favor' });
      } else {
        modalSucces({ message: "La petición se ha realizado de manera exitosa", reload: true, title: 'Cerrado' });
      }
    },
    onError: () => {
      modalError({ message: 'Parece que tenemos problemas' });
    }
  })


  // Petición get para traer los productos consumidos 

  const { data: dataClient, isLoading } = useQuery(["sellCloseData", data?.IdUnique], () =>
    Api.get("/products/GetProductConsumed/" + data?.IdUnique)
  );

  return (

    <Modal key="1" className="flex flex-col " title="Cerrar venta" visible={visible} okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }} onCancel={() => setVisible(!visible)}>
      <div className="sells">
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Precio</Th>
              <Th>Cantidad</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody className="bg-blue-100 rounded-sm ">
            {Array.isArray(dataClient?.payload) && <>
              {dataClient?.payload.map(i =>
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
        <Button onClick={showConfirm} className="btn-close mt-10" > Cerrar venta </Button>
      </div>
      <Loading visible={isLoading} />
    </Modal>

  )
}
