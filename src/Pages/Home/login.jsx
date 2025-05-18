import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Login = ({ usefrom, onFinish, onFinishFailed }) => {
  // const [from1] = Form.useForm();

  // const onFinish = (values) => {
  //   // console.log("Success:", values);
  //   callback?.(values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  // useEffect(() => {
  //   from1.setFieldsValue(data);
  // }, [data]);

  return (
    <Form
      form={usefrom}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      // initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default Login;
