import { Input, Select, Table, Tag, Modal, Button, Form, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { HexColorPicker } from "react-colorful";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
type Mode = "new" | "edit" | "delete";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};

function Categories() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [formId, setFormId] = useState<number | null>(null);
  console.log(form);
  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };
  const handleOk = () => {
    if (mode === "new") dispatch(addCategory(form));
    else if (mode === "edit" && typeof formId === "number")
      dispatch(updateCategory(form, formId));
    else if (mode === "delete" && typeof formId === "number")
      dispatch(deleteCategory(formId));
    setIsModalVisible(false);
    setFormId(null);
    setMode("new");
    setForm(emptyForm);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setFormId(null);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#1890ff" }}
            onClick={() => {
              showModal("edit");
              setForm(category);
              setFormId(category.id);
            }}
          />

          <DeleteOutlined
            twoToneColor="#286ce3"
            style={{ color: "red" }}
            onClick={() => {
              showModal("delete");
              setFormId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div>
        <div style={{ marginBottom: "10px" ,float:"right" }}>
          <Button type="primary" onClick={() => showModal("new")}>
            New Categoyr
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "Create New Category"
              : mode === "edit"
              ? "Update Category"
              : "Delete Category"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "edit" || mode === "new" ? (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Name">
                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Select">
                <Select
                  value={form.type}
                  defaultValue="expense"
                  onChange={(value) => setForm({ ...form, type: value })}
                >
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Color">
                <HexColorPicker
                  onChange={(color) => setForm({ ...form, color: color })}
                />
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <p>Are you sure?</p>
          ) : null}
        </Modal>
      </div>
      <Table dataSource={data} columns={columns} />
    </React.Fragment>
  );
}

export default Categories;
