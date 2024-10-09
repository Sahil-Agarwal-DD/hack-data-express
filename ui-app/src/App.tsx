import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataExpressPanes } from "./components/DataExpressPanes";
import GlobalStyles from "@mui/material/GlobalStyles";
import { css } from "@emotion/react";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataExpressPanes />,
  },
]);

function App() {
  React.useEffect(() => {
    fetch("http://localhost:8000/data-domain-list")
      .then((v) => v.json())
      .then((v) => console.log(v));
  }, []);

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
