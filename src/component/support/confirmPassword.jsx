import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';

const PasswordModal = ({ isOpen, onClose, onSubmit,formData }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password); // Call the callback function with the password
    setPassword(''); // Reset the password field after submission
    onClose(); // Close the modal after successful submission
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Confirm & Pay
        </Button>,
      ]}
    >
      <Form layout="vertical" className='mt-1 pt-1' onSubmit={handleSubmit}>
        <Typography.Text className='fs-6'> <i> {`Paying ${formData.amount} to  ${formData.pname} \n from Account ${formData.paccount?.substr(0,2)}XXXXXX`}</i></Typography.Text>
        <Form.Item label="Password Enter Password To Confirm" className='mt-5' rules={[{ required: true, message: 'Field Required' }]}>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordModal;
