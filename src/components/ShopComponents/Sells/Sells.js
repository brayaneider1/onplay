import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { Button } from "antd";
import { NewSell } from "../../Modals/LocalAdmin/product/NewSell";
import { AddSellClient } from "../../Modals/LocalAdmin/product/AddSelClientl";
import { CloseShells } from "../../Modals/LocalAdmin/product/CloseSells";
import { SellClient } from "../../Modals/LocalAdmin/product/SellsClient";

export const Sells = ({ data, dataClient }) => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visibleClose, setVisibleClose] = useState(false)
  const [visibleDataConsumer, setVisibleDataConsumer] = useState(false)
  const [dataConsumer, setDataConsumer] = useState()
  const [dataSell, setDataSell] = useState()
  const [dataCloseSell, setDataCloseSell] = useState()


  const handleProducts = (consumer) => {
    setDataConsumer(consumer)
    setVisibleDataConsumer(!visibleDataConsumer)
  }

  //activa la modal para agrgar venta

  const handleSell = (sellData) => {
    setDataSell(sellData)
    setVisible2(!visible2)
  }

  // activa la modal para cerrar venta
  const handleClose = (closeData) => {
    setDataCloseSell(closeData)
    setVisibleClose(!visibleClose)
  }


  return (
    <div className="sells">
      <Button onClick={() => setVisible(!visible)} className="sells_add">Nueva venta</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Fecha</Th>
            <Th>Acción</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(dataClient?.payload) && <>
            {dataClient?.payload.map(i =>
              <Tr>
                <Td>
                  <div className="item">{i.NameCustomer}</div>
                </Td>
                <Td>
                  <div className="item text-center">{i.DateRegisterProductsConsumed}</div>
                </Td>
                <Td>
                  <div className="actions">
                    <div onClick={() => handleSell(i)} className="plus cursor-pointer mx-2">
                      <AiOutlinePlus />
                    </div>
                    <div onClick={() => handleProducts(i)} className="succes cursor-pointer mx-2">
                      <AiFillEye />
                    </div>
                    <Button onClick={() => handleClose(i)} className="btn-close mx-2">Cerrar venta</Button>
                  </div>
                </Td>
              </Tr>
            )}
          </>}
        </Tbody>
      </Table>
      <NewSell data={data} visible={visible} setVisible={setVisible} />
      <SellClient dataClient={dataConsumer && dataConsumer} visible={visibleDataConsumer} setVisible={setVisibleDataConsumer} />
      <AddSellClient products={data} dataConsumer={dataSell && dataSell} visible={visible2} setVisible={setVisible2} />
      <CloseShells data={dataCloseSell} visible={visibleClose} setVisible={setVisibleClose} />
    </div>
  );
};
