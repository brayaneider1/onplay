import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/es";

import "../i18n/i18n";
import { Private } from "../scenes/Layout/Private/Private";
import { Public } from "../scenes/Layout/Public/Public";

moment.locale("es");

export const App = () => {
  const { authentication } = useSelector((state) => state.auth);

  useEffect(() => {
    moment.locale("en");
  }, []);

  const [response, setResponse] = useState("");


  return (
    <>
      {!authentication && <Public />}
      {authentication && <Private />}
    </>
  );
};
