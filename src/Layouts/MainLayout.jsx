import React,{ useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderCustom from "./Header";
import "../Styles/MainLayout.scss";
import { getSid } from "../utils/auth";
import routes from "../configs/routesPath";

const MainLayout = () => {

  const [islog, setIsLog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getSid()) {
      navigate(routes.login);
    } else {
      setIsLog(true);
    }
  }, [navigate]);

  return islog && (
    <div className="main-layout">
      <Layout style={{ zIndex: "1" }}>
        <HeaderCustom />
          <main className="wrap-main-layout">
          <Outlet />
        </main>
      </Layout>
    </div>
  );
};

export default MainLayout;