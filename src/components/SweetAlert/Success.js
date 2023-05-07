import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const modalSucces = ({ message, url, reload, title }) =>
  MySwal.fire({
    icon: "success",
    title: <p> {title ? title : " Felicitaciones"}</p>,
    heightAuto: "false",
    type: "success",
    customClass: 'swal-height',
    text: message,
  }).then((result) => {
    /*      MySwal.fire(<p>{message}</p>)
     */reload === true ? window.location.reload() :
      window.location.href = url;
  });
