import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Menu mode="horizontal" theme="dark" className="navbar-container">
      <Menu.Item key="cafes">
        <h2 className="company-name">Café Employees</h2>
      </Menu.Item>
      <Menu.Item key="cafes">
        <Link to="/cafes">Cafés</Link>
      </Menu.Item>
      <Menu.Item key="employees">
        <Link to="/employees">Employees</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
