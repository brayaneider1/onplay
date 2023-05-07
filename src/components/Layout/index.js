import React, { useState } from "react";
import { Layout } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { Sidebar } from "./Sidebar/Sidebar";
import { HeaderC } from "./Header/Header";

// componente layout del dashboard

export const LayoutPrivate = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const [visible, setvisible] = useState(false)

  // Accion que oculta o muestra el sidebar

  const handleToggle = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <Layout className="private-layout">
      <div onClick={() => setvisible(!visible)} className="menu">
        {visible === true ? <BiMenu /> : <AiOutlineClose />}
      </div>
      <Sidebar visible={visible} setvisible={setvisible} collapsed={collapse} onCollapse={handleToggle} />
      <Layout className="site-layout">
        <HeaderC />
        {/*   Aquí se ubica el conteido del dashboard por sección */}
        <main>{children} </main>
      </Layout>
    </Layout>
  );
};
