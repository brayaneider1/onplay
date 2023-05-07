import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { ListHistory } from "../../Modals/Owner/ListHistory";
import jwt_decode from "jwt-decode";
import { Token } from "../../../common/Storage/Token";
import Api from "../../../common/Api/Api";
import { useQuery } from "react-query";
import { formatter } from "../../../common/utils/FormattPrice";
import { AiFillEye } from "react-icons/ai";
import { HistoryDeatail } from "../../Modals/LocalAdmin/product/HistoryDetail";


export const History = () => {
  const userData = jwt_decode(Token.getToken());
  const [visible, setVisible] = useState(false)
  const [visibleDetail, setvisibleDetail] = useState(false)
  const [detail, setdetail] = useState()

  // peticion para obtener el historrial de venta

  const { data } = useQuery("HistorySale", () =>
    Api.post("/products/HistorySale", { idLocal: userData.data.IdLocal })
  );

  // activa la modal History detail  y envia los datos de la fila 

  const handleData = (sell) => {
    setvisibleDetail(!visibleDetail)
    setdetail(sell)

  }

  return (
    <div className="sells">
      <Table>
        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Valor final</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(data?.payload) && data?.payload.map((i, id) =>
            <Tr key={id}>
              <Td>
                <div className="item">{i?.DateRegisterProductsConsumed}</div>
              </Td>
              <Td>
                <div className="item text-center">{formatter.format(i?.total)}</div>
              </Td>
              <Td className="recent_content actions-container " >
                <AiFillEye
                  onClick={() => handleData(i)}
                  className="cursor-pointer mr-2 my-auto text-2xl text-green-500  "
                />
              </Td></Tr>
          )}
        </Tbody>
      </Table>
      <HistoryDeatail visible={visibleDetail} setVisible={setvisibleDetail} dataHistory={detail} />
      <ListHistory visible={visible} setVisible={setVisible} />
    </div>
  );
};
