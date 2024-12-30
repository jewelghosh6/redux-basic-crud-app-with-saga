// import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.tsx";
import { Provider } from 'react-redux';
import store from './store/store';
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <MantineProvider theme={theme} >
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  // </React.StrictMode>
);
