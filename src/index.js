import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./sass/main.scss";
import initStore from "./store/Store";
import { App } from "./scenes/App";
import * as serviceWorker from "./serviceWorker";
const history = createBrowserHistory();
export const store = initStore(history);

const queryClient = new QueryClient(); // Instance of QueryClient

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
