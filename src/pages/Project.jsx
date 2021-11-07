import React, { useState, useEffect } from "react";
import {
  Button,
  PageHeader,
  List,
  Card,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./css/Project.css";
import { Link } from "react-router-dom";
import { get, post } from "../request";
export default function Project(props) {
  // const projects = [
  //   {
  //     id: 1,
  //     title: "Project 1",
  //     description:
  //       "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
  //   },
  //   {
  //     id: 2,
  //     title: "Project 1",
  //     description:
  //       "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
  //   },
  //   {
  //     id: 3,
  //     title: "Project 1",
  //     description:
  //       "Project description Project descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject descriptionProject description",
  //   },
  // ];
  const [form] = Form.useForm();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const handleNewProject = async () => {
    try {
      const data = form.getFieldsValue();
      await post("/project", data);
      message.success("Successfully created!");
      setShowNewProjectModal(false);
      // update project list
      await fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProjects = async () => {
    const projects = await get("/project");
    setProjects(projects.data);
  };

  useEffect(() => {
    // fetch existing projects when entering Project Page
    fetchProjects();
  }, []);

  return (
    <PageHeader title="Project List">
      <Modal
        title="Create New Project"
        visible={showNewProjectModal}
        onOk={handleNewProject}
        okText="Create"
        onCancel={() => setShowNewProjectModal(false)}
      >
        <Form name="new-project" form={form} labelCol={{ span: 8 }}>
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={() => setShowNewProjectModal(true)}>
          New Project <PlusOutlined />
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={projects}
        renderItem={(item) => (
          <List.Item>
            <Link to={`project-detail/${item._id.$oid}`}>
              <Card
                className="card"
                title={
                  <>
                    <div>{item.name}</div>
                    <div style={{ fontSize: 10, color: "#ccc" }}>
                      id: {item._id.$oid}
                    </div>
                  </>
                }
                bodyStyle={{ overflowWrap: "break-word" }}
              >
                {item.description}
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </PageHeader>
  );
}
