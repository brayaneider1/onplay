import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { Recent } from "../../components/RequestAdminComponents/Recent/Recent";
import { Archived } from "../../components/RequestAdminComponents/Archived/Archived";
import { useQuery } from 'react-query';
import { Loading } from '../../components/Loading/Loading'
import { modalError } from "../../components/SweetAlert/Error";

const { TabPane } = Tabs;


export const Request = () => {

  const { data, isLoading } = useQuery('Requests',
    () =>
      fetch('https://api.onplay.com.co/request/getRequest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      })
        .then(async (response) => {
          return await response.json()
        })
        .catch((err) => { modalError({ message: 'Parece que tenemos problemas' }) }),
    {
      refetchOnWindowFocus: false,
      enabled: true
    }
  );

  const [recent, setRecent] = useState([]);
  const [inProcess, setInProcess] = useState([]);
  const [viable, setViable] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [filed, setFiled] = useState([]);

  useEffect(() => {
    if (data) {
      setRecent(Array.isArray(data) && data?.filter((item) => item.status === "SC"));
      setInProcess(Array.isArray(data) && data?.filter((item) => item.status === "EP"));
      setViable(Array.isArray(data) && data?.filter((item) => item.status === "V"));
      setCompleted(Array.isArray(data) && data?.filter((item) => item.status === "C"));
      setFiled(Array.isArray(data) && data?.filter((item) => item.status === "A"));
    }
  }, [data]);

  return (
    <div className="request-admin">
      <div className="request-admin_content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Recientes" key="1">
            <Recent contact={true} archived={true} success={true} data={recent} />
          </TabPane>
          <TabPane tab="En proceso" key="2">
            <Recent archived={false}  success={false} data={inProcess} />
          </TabPane>
          <TabPane tab="Contactado" key="3">
            <Archived  archived={true} success={true} data={completed} />
          </TabPane>
          <TabPane tab="Completado" key="4">
            <Archived archived={false} data={viable} />
          </TabPane>
          <TabPane tab="Archivado" key="5">
            <Archived check data={filed} />
          </TabPane>
        </Tabs>
      </div>
      <Loading visible={isLoading} />

    </div>
  );
};
