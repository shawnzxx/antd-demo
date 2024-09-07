import React from "react";
import { Layout } from "antd";
import FirstTable from "../components/FirstTable";
import TodoTable from "../components/TodoTable";
import { CRUDTable } from "../components/CRUDTable";

const { Content } = Layout;

function MainPage({ selectedKey }) {
  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <FirstTable />;
      case "2":
        return <TodoTable />;
      case "3":
        return <CRUDTable />;
      default:
        return <FirstTable />;
    }
  };

  return (
    <Content style={{ padding: "50px 0" }}>
      <div style={{ width: "80%", margin: "0 auto" }}>{renderContent()}</div>
    </Content>
  );
}

export default MainPage;
