import { Input, Select, Table, Tag, Modal, Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { addCategory, getCategories } from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { HexColorPicker } from "react-colorful";

type Mode = "new" | "edit";

 
const emptyForm:CategoryForm={
  name:"",
  type:"expense",
  color:"black"
}

function Categories() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
    const [form, setForm]=useState<CategoryForm>(emptyForm)
    console.log(form)
  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };
  const handleOk = () => {
    dispatch(addCategory(form))
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm)
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm)
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

    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          New Categoyr
        </Button>
        <Modal
          title={mode === "new" ? "Create New Category" : "Update Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form>
            <Form.Item label="Input">
              <Input name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            </Form.Item>
            <Form.Item label="Select">
              <Select  defaultValue="expense" onChange={(value)=>setForm({...form,type:value })} >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
              
              
            </Form.Item>
            <HexColorPicker onChange={(color)=>setForm({...form,color:color })}  />
          </Form>
          
        </Modal>
      </div>
      <Table dataSource={data} columns={columns} />
    </React.Fragment>
  );
}

export default Categories;
