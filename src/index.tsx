import React from "react";
import ReactDOM from "react-dom/client";
import App from "./features/App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
