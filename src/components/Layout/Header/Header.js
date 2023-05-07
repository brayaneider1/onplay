import React from 'react'
import {  useDispatch } from "react-redux";
import { Layout, Popover } from "antd";
import { auth } from "../../../services/Auth/AuthActions";
import { MdNotificationsNone } from 'react-icons/md'
import jwt_decode from "jwt-decode";
import { Token } from "../../../common/Storage/Token";
const { Header } = Layout;

// Componente de cabecera del dashboard

export const HeaderC = () => {

  const userData = jwt_decode(Token.getToken());
	const dispatch = useDispatch();

 // Contenido de la etiqueta Popover

	const content = (
		<div className="cursor-pointer">
			<p onClick={() => dispatch(auth.logout())} >Cerrar sesion</p>
		</div>
	);

	return (
		<Header className="header" >
			<div className="header_title">
				<span>Bienvenido, <b>{userData?.data?.UserName!==null?userData?.data?.UserName:userData?.data?.NameCompany}</b> </span>
			</div>
			<div className="header_options">
			<div className="notification">
					<MdNotificationsNone />
					<div className="dot" ></div>
				</div>
				<Popover className="cursor-pointer" placement="top" content={content} trigger="click">
					<img alt="profile" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
				</Popover>
			</div>
		</Header>

	)
}
