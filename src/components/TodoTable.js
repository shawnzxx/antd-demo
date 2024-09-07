import React, { useState, useEffect } from "react";
import { Table } from "antd";

function TodoTable() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => setDataSource(data))
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setLoading(false));
    }, 500);
  }, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "User ID",
      sorter: (a, b) => a.userId > b.userId,
      dataIndex: "userId",
    },
    {
      key: "3",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "4",
      title: "Status",
      dataIndex: "completed",
      render: (completed) => (completed ? "Completed" : "In Progress"),
      filters: [
        { text: "Completed", value: true },
        { text: "In Progress", value: false },
      ],
      onFilter: (value, record) => record.completed === value,
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      pagination={{
        position: ["topCenter, bottomCenter"],
        current: page,
        pageSize: pageSize,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
    ></Table>
  );
}

export default TodoTable;
