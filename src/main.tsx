// import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.tsx";
import { Provider } from 'react-redux';
import store from './store/store';
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import "./index.css";
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { usersApi } from "./store/api/UserApiSlice.ts";  


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <MantineProvider theme={theme} >
      <Provider store={store}>
        <Notifications />
        {/* <ApiProvider api={usersApi}> */}
          <App />
        {/* </ApiProvider> */}
      </Provider>
    </MantineProvider>
  // </React.StrictMode>
);
