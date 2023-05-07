import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LayoutPrivate } from "../../../components/Layout";
import { Bookings } from "../../Bookings/Bookings";
import { ChartsCompany } from "../../Charts/Charts";
import { Home } from "../../Home/Home";
import { Locals } from "../../Locals/Locals";
import { Profile } from "../../Profile/Profile";
import { Scenarios } from "../../Scenarios/Scenarios";
import { Shop } from "../../Shop/Shop";
import { Store } from "../../Store/Store";
import jwt_decode from "jwt-decode";
import { Token } from "../../../common/Storage/Token";
import { Request } from "../../RequestAdmin/RequestAdmin";
import { Clients } from "../../Clients/Clients";
import { Payments } from "../../Payments/Payments";
import { io } from "socket.io-client";

export const Private = () => {
  const userData = jwt_decode(Token.getToken());

  const [time, setTime] = useState("fetching");

/*   useEffect(() => {
    const socket = io("https://api.onplay.com.co/test/");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("onplay", (data) => setTime(data));
    socket.on("disconnect", () => setTime("server disconnected"));
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: App.js ~ line 16 ~ App ~ time", time);
  }, []); */

  return (
    <Router>
      <LayoutPrivate>
        {userData?.rol === "LOCAL ADMINISTRATOR" ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Route exact path="/" component={ChartsCompany} />
        )}
        <Route exact path="/locals" component={Locals} />
        <Route exact path="/payments" component={Payments} />
        <Route exact path="/clients" component={Clients} />
        <Route
          exact
          path="/scenarios/:id/:name/limit=:limit"
          component={Scenarios}
        />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/charts" component={ChartsCompany} />
        <Route exact path="/booking/:id" component={Bookings} />
        <Route exact path="/request" component={Request} />
      </LayoutPrivate>
    </Router>
  );
};
