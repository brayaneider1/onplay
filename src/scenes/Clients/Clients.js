import React,{useState} from "react";
import { Tabs } from "antd";
import { Archived } from "../../components/ClientsComponents/Archived/Archived";
import { Actived } from "../../components/ClientsComponents/Actived/Actived";
import { useQuery } from 'react-query';
import {Loading} from '../../components/Loading/Loading'

const { TabPane } = Tabs;



export const Clients = () => {
const  {data,isLoading}  = useQuery('Clients',
() =>
fetch('https://api.onplay.com.co/user/getUsers', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + localStorage.getItem("token")
   }
 })
   .then(async(response) => {
    return await response.json()
   })
   .catch((err) => {console.log(err)}),
{
 refetchOnWindowFocus: false,
 enabled: true
}
);

  return (
    <div className="request-admin">
      <div className="request-admin_content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Activos" key="1">
            <Actived key="01" data={data}/>
          </TabPane>
          <TabPane tab="Archivadas" key="2">
          <Archived key="02"/>
          </TabPane>
        </Tabs>
      </div>
      <Loading visible={isLoading} />

    </div>
  );
};
