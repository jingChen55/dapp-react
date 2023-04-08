import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import { default as Layout} from "./layout/index";
import "./index.css";

ReactDOM.render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>,
  document.getElementById("root"),
);


// ReactDOM.render(
//   <React.StrictMode>
//     <Layout/>
//   </React.StrictMode>,
//   document.getElementById("root"),
// );