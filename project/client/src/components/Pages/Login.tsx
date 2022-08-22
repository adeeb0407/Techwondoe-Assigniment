import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { actionCreators } from '../../redux';
import { RootState } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../redux/action-creators/index'
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch)

  const onFinish = (values: any) => {
    login(values?.username, values?.password, navigate)
  };

  const loginCreds = useSelector((state: RootState) => state.fetchUser)
  console.log(loginCreds)

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style ={{display: 'flex', justifyContent: 'center', marginTop : '20%'}}>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;