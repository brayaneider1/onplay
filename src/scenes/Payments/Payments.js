import React from "react";
import { Tabs } from "antd";
import { Recent } from "../../components/PaymentsComponents/Recent/Recent";
import { Archived } from "../../components/PaymentsComponents/Archived/Archived";

const { TabPane } = Tabs;

export const Payments = () => {
  return (
    <div className="request-admin">
      <div className="request-admin_content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Recientes" key="1">
            <Recent/>
          </TabPane>
          <TabPane tab="Historial" key="2">
          <Archived/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
