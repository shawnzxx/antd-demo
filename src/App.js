import React, { useState } from "react";
import "./App.css";
import { Layout, Menu } from "antd";
import { TableOutlined, CheckSquareOutlined } from "@ant-design/icons";
import MainPage from "./pages/MainPage";

const { Sider, Content } = Layout;

function App() {
  const [selectedKey, setSelectedKey] = useState("3");

  const menuItems = [
    { key: "1", icon: <TableOutlined />, label: "First Table" },
    { key: "2", icon: <CheckSquareOutlined />, label: "Todo Table" },
    { key: "3", icon: <CheckSquareOutlined />, label: "CRUD Table" },
  ];

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div className="logo" />
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <MainPage selectedKey={selectedKey} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
