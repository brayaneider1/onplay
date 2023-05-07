import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  RiStarLine,
} from "react-icons/ri";
import { VscChecklist } from "react-icons/vsc";
import { MdLocalActivity } from "react-icons/md";
import { AiFillNotification, AiOutlinePullRequest } from "react-icons/ai";
import { BiStoreAlt, } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { GiMeepleGroup } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logoWhite.png";
import Icon from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import { Token } from "../../../common/Storage/Token";
const { Sider } = Layout;


// Componente al lado izquierdo del dashboard 

export const Sidebar = ({ visible, setvisible, onCollapse }) => {
  const userData = jwt_decode(Token.getToken());


  // verifica el tamaño del viewport y oculta o muestra el sidebar

  useEffect(() => {
    window.innerWidth <= 900 && onCollapse();
    window.innerWidth <= 570 ? setvisible(true) : setvisible(false);
  }, [window]);

  return (
    <Sider
      style={visible === false ? { display: "block" } : { display: "none" }}
      className="sidebar"
    >
      <img className="sidebar_logo mt-5" alt="logo" src={logo} />
      {userData?.rol === "LOCAL ADMINISTRATOR" && (
        <Menu
          theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]} defaultOpenKeys={[window.location.pathname]} >
          <Menu.Item key="/" icon={<Icon component={BiStoreAlt} />}>
            <Link to="/" className="ml-menu">
              Inicio
            </Link>
          </Menu.Item >
          <Menu.Item key="/charts" icon={<Icon component={IoMdStats} />}>
            <Link to="/charts" className="ml-menu" >
              Estadisticas
            </Link>
          </Menu.Item >
          <Menu.Item key="/shop" icon={<Icon component={VscChecklist} />}>
            <Link className="ml-menu" to="/shop">
              Tienda
            </Link>
          </Menu.Item>{" "}
          <Menu.Item key="/notice" icon={<Icon component={AiFillNotification} />}>
            <Link className="ml-menu" to="/notice">
              Noticias
            </Link>
          </Menu.Item>
        </Menu>
      )}

      {userData?.rol === "OWNER" && (
        <Menu theme="dark" defaultSelectedKeys={[window.location.pathname]} defaultOpenKeys={[window.location.pathname]} mode="inline">
          <Menu.Item key="/" icon={<Icon component={BiStoreAlt} />}>
            <Link className="ml-menu" to="/">
              Inicio
            </Link>
          </Menu.Item>
          <Menu.Item key="/locals" icon={<Icon component={MdLocalActivity} />}>
            <Link className="ml-menu" to="/locals">
              Locales
            </Link>
          </Menu.Item>
          <Menu.Item key="/store" icon={<Icon component={VscChecklist} />}>
            <Link className="ml-menu" to="/store">
              Tienda
            </Link>
          </Menu.Item>{" "}
          <Menu.Item key="/proms" icon={<Icon component={AiFillNotification} />}>
            <Link className="ml-menu" to="/proms">
              Promociones
            </Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<Icon component={RiStarLine} />}>
            <Link className="ml-menu" to="/profile">
              Perfil
            </Link>
          </Menu.Item>
        </Menu>
      )}

      {userData?.rol === "ADMINISTRATOR" && (
        <Menu defaultSelectedKeys={[window.location.pathname]} defaultOpenKeys={[window.location.pathname]} theme="dark" mode="inline">
          <Menu.Item key="/" icon={<Icon component={BiStoreAlt} />}>
            <Link className="ml-menu" to="/">
              Inicio
            </Link>
          </Menu.Item>
          <Menu.Item key="/request" icon={<Icon component={AiOutlinePullRequest} />}>
            <Link className="ml-menu" to="/request">
              Solicitudes
            </Link>
          </Menu.Item>
          <Menu.Item key="/clients" icon={<Icon component={GiMeepleGroup} />}>
            <Link className="ml-menu" to="/clients">
              Clientes
            </Link>
          </Menu.Item>{" "}
          <Menu.Item key="/payments" icon={<Icon component={AiFillNotification} />}>
            <Link className="ml-menu" to="/payments">
              Pagos
            </Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<Icon component={RiStarLine} />}>
            <Link className="ml-menu" to="/profile">
              Perfil
            </Link>
          </Menu.Item>
        </Menu>
      )}
    </Sider>
  );
};
