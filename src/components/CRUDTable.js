import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Input, Form } from "antd";

const CRUDTable = (props) => {
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      address: "John Address",
    },
    {
      id: 2,
      name: "David",
      email: "david@gmail.com",
      address: "David Address",
    },
    {
      id: 3,
      name: "James",
      email: "james@gmail.com",
      address: "James Address",
    },
    {
      id: 4,
      name: "Sam",
      email: "sam@gmail.com",
      address: "Sam Address",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => onEditStudent(record)} />
            <DeleteOutlined
              onClick={() => onDeleteStudent(record)}
              style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();

  const addNewStudent = () => {
    const newStudent = {
      id: Math.floor(Math.random() * 1000),
      name: `Student ${Math.floor(Math.random() * 100)}`,
      email: `student${Math.floor(Math.random() * 100)}@example.com`,
      address: `${Math.floor(Math.random() * 1000)} Random St.`,
    };
    setDataSource((prev) => [...prev, newStudent]);
  };

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this student?",
      content: `This will permanently delete ${record.name}.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setDataSource((prev) =>
          prev.filter((student) => student.id !== record.id)
        );
      },
    });
  };

  const onEditStudent = (record) => {
    setEditingStudent(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const onSaveEdit = () => {
    form.validateFields().then((values) => {
      setDataSource((prev) =>
        prev.map((student) =>
          student.id === editingStudent.id ? { ...student, ...values } : student
        )
      );
      setIsEditModalVisible(false);
    });
  };

  return (
    <>
      <Button onClick={addNewStudent} style={{ marginBottom: 16 }}>
        Add a new Student
      </Button>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Edit Student"
        open={isEditModalVisible}
        onOk={onSaveEdit}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

CRUDTable.propTypes = {};

export { CRUDTable };
