import React, { Fragment, useRef } from "react";
import { Button, Input, Spin, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function FirstTable() {
  const dataSource = [
    {
      name: "John",
      age: 32,
      address: "New York",
    },
    {
      name: "Jim",
      age: 33,
      address: "Sydney",
    },
    {
      name: "David",
      age: 40,
      address: "Japan",
    },
    {
      name: "James",
      age: 32,
      address: "New York",
    },
    {
      name: "Sam",
      age: 40,
      address: "Sydney",
    },
    {
      name: "John",
      age: 32,
      address: "New York",
    },
    {
      name: "Jim",
      age: 33,
      address: "Sydney",
    },
    {
      name: "David",
      age: 40,
      address: "Japan",
    },
    {
      name: "James",
      age: 32,
      address: "New York",
    },
    {
      name: "Sam",
      age: 40,
      address: "Sydney",
    },
  ];

  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex, isNumber = false) => ({
    filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => (
      <Fragment>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] || ""}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          onPressEnter={() => confirm()}
        />
        <Button type="primary" onClick={() => confirm()} size="small">
          Search
        </Button>
        <Button
          onClick={() => {
            setSelectedKeys([]);
            confirm();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Fragment>
    ),
    filterIcon: () => <SearchOutlined />,
    onFilter: (value, record) =>
      isNumber
        ? record[dataIndex] === parseInt(value, 10)
        : record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      ...getColumnSearchProps("age", true),
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}

export default FirstTable;
