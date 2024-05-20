import React from 'react';
import { Card, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AccountUpdate: React.FC = () => {
  const onFinish = (values: any) => {
    // Handle form submission logic here
    console.log('Received values:', values);
  };

  return (
    <div className="mt-10">
      <h1 className="font-montserrat ml-10 font-bold text-[25px]">Account Update</h1>
      <div className="flex justify-center mt-6 items-center">
        <div className="bg-white h-auto pb-10  pt-10
        justify-center items-center flex w-1/2  rounded-xl pr-10">
          <Form
            className="font-semibold font-montserrat"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="true"
          >
            <Form.Item
              label="Username"
              name="username"
              // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                placeholder="Username"
                style={{
                  height: 50,
                  width: 360,
                  borderColor: '#333', // Darker border color
                  borderWidth: '1px',  // Optional: Adjust the border width
                  borderStyle: 'solid' // Optional: Ensure the border style is solid
                }}
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              // rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input
                placeholder="Email"
                style={{
                  height: 50,
                  width: 360,
                  borderColor: '#333', // Darker border color
                  borderWidth: '1px',  // Optional: Adjust the border width
                  borderStyle: 'solid' // Optional: Ensure the border style is solid
                }}
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              // rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="Password"
                style={{
                  height: 50,
                  width: 360,
                  borderColor: '#333', // Darker border color
                  borderWidth: '1px',  // Optional: Adjust the border width
                  borderStyle: 'solid' // Optional: Ensure the border style is solid
                }}
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm"
              dependencies={['password']}
              rules={[
                // { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                style={{
                  height: 50,
                  width: 360,
                  borderColor: '#333', // Darker border color
                  borderWidth: '1px',  // Optional: Adjust the border width
                  borderStyle: 'solid' // Optional: Ensure the border style is solid
                }}
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-black 
                
                hover:bg-[#5A31A6] rounded-lg text-white font-bold py-2
                 "
                style={{
                  height: 50,
                  width: 200,
                }}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdate;