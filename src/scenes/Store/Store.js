import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Api from "../../common/Api/Api";
import { Token } from "../../common/Storage/Token";
import jwt_decode from "jwt-decode";
import { Loading } from "../../components/Loading/Loading";

export const Store = () => {
  const userData = jwt_decode(Token.getToken());


  const { data: locals, isLoading } = useQuery(
    "localsOwner",
    () => Api.get("/Local/getLocal/" + userData.data.IdCompany),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    },
  );

  const [localId, setlocalId] = useState()

  useEffect(() => {
    setlocalId( locals?.payload[0]?.IdLocal)
  }, [locals])

  const { data, isLoading: historyloading } = useQuery(
    ["localsOwner", localId],
    (data) => (Api.get("/products/DetailHistoryOwner/" + data.queryKey[1])))



  const onHandleLocal = (local) => {
    setlocalId(local.target.value)
  }

  return (
    <div className="store">
      <div className="store_content">
        <div className="input-component3  w-1/2 mb-10 mt-3   ">
          <p className="mb-2"> Local </p>
          <select defaultValue={locals?.payload[0].IdLocal} onChange={onHandleLocal} >
            {Array.isArray(locals?.payload) && locals?.payload.map(i =>
              <option id={i.IdLocal} value={i.IdLocal}>{i.NameLocal}</option>
            )}
          </select>
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th>Dia de facturación</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(data?.payload) && data?.payload.map((i, id) =>
              <Tr key={id}>
                <Td><div className="item"><span>{i.DateRegisterProductsConsumed} </span></div></Td>
                <Td><div className="item"><span>{i.total} </span></div></Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
      <Loading visible={isLoading || historyloading} />
    </div>
  );
};
