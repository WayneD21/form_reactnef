import React,{useEffect, useState} from "react";
import { Layout, Image, Menu, Dropdown } from "antd";
import {
  CodeSandboxOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faCircleUser  } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Header.scss";
import routes from "../configs/routesPath"
import { logoutApp } from "../utils/auth"

const { Header } = Layout;

const HeaderCustom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectKey, setSelectKey] = useState(null);

  const items = [
    {
      key: routes.profile,
      label: "Profile",
      icon: (
        <FontAwesomeIcon
          icon={faCircleUser}
          className="menu-icon"
          style={{ fontSize: "var(--font-16)", color: "var(--bg-primaryD)", width: "20px", textAlign: "center" }}
        />
      ),
      // onClick: showProfile
    },
    {
      key: routes.logout,
      label: "LogOut",
      icon: (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className="menu-icon"
          style={{ fontSize: "var(--font-16)", color: "var(--red-d)", width: "20px", textAlign: "center" }}
        />
      ),
      onClick: logoutApp
    }
  ];

  const menuItems = [
    {
      key: routes.home,
      label: (
        <>
          <CodeSandboxOutlined className="icon-header" />
          <span>Home</span>
        </>
      ),
    },
    {
      key: routes.product,
      label: (
        <>
          <GlobalOutlined className="icon-header" />
          <span>Product</span>
        </>
      ),
    }
  ];

  const handleMenuClick = (key) => {
    if (key == routes.logout) {
      logoutApp();
    } else {
      setSelectKey(key);
      navigate(key);
    }
  };

  useEffect(() => {
    setSelectKey(location.pathname);
  }, [location]);

  return (
    <div className="header-container">
      <Header className="header-layout">
        {/* Logo */}
        <Link className="wrap-logo" to={"/"}>
          <Image
            preview={false}
            src="images/logo-proxy-devbeta.svg"
            alt="Image"
          />
        </Link>
        {/* Navigation Menu */}
        <Menu
          className="menu-head-container"
          theme="light"
          mode="horizontal"
          selectedKeys={[selectKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={menuItems}
        />
        <Dropdown menu={{ items }} trigger={["click"]} className="head-dropdown-avt">
          <a onClick={(e) => e.preventDefault()}>
            <div className="avt-nef">
              <Image preview={false} src="images/user.jpg" />
            </div>
          </a>
        </Dropdown>
      </Header>
    </div>
  );
};

export default HeaderCustom;
