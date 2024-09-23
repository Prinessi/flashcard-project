import React from "react";
import Header from "./Header";
import RootRoutes from "../RootRoutes";
import {
  Link,
} from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <RootRoutes />
    </>
  );
}

export default Layout;
