// NewNotificationForm.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const NewNotificationForm: React.FC<Props> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Logic to handle form submission
    onClose(); // Close the modal after form submission
  };

  return (
    <Modal
      title="Create New Notification"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: 'Please enter the body' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewNotificationForm;
