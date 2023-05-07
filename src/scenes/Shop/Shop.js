import React from "react";
import { Tabs } from "antd";
import { Products } from "../../components/ShopComponents/Products/Products";
import { Sells } from "../../components/ShopComponents/Sells/Sells";
import { History } from "../../components/ShopComponents/History/History";
import Api from "../../common/Api/Api";
import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";
import { Token } from "../../common/Storage/Token";
const { TabPane } = Tabs;

export const Shop = () => {
  const userData = jwt_decode(Token.getToken());

  const { data: products, isLoading } = useQuery("products", () => Api.get("/products/GetProduct/" + userData.data.IdLocal));
  const { data: productsClient, } = useQuery("productsClient", () => Api.get("/products/GetclientProduct/" + userData.data.IdLocal));
  return (
    <div className="shop">
      <div className="shop_content">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Ventas" key="1">
            <Sells data={products} dataClient={productsClient} />
          </TabPane>
          <TabPane tab="Productos" key="2">
            <Products data={products} isLoading={isLoading} />
          </TabPane>
          <TabPane tab="Historial cierre de caja" key="3">
            <History />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
