import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataExpressPanes } from "./components/DataExpressPanes";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

import "./App.css";
import { Snackbar, styled } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataExpressPanes />,
  },
]);

function App() {
  return (
    <>
      <CssBaseline />
      <NotificationsProvider
        slotProps={{
          snackbar: {
            anchorOrigin: {
              horizontal: "center",
              vertical: "top",
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </NotificationsProvider>
    </>
  );
}

export default App;
