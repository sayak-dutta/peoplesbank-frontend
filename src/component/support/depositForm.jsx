import React, { useState } from 'react';
import { Modal, Form, Input,  Button, message } from 'antd';
import { depositeMoney } from '@/axios/apiendpoints';

const DepositMoneyForm = ({visible,setVisible,cb, id }) => {
  

  const [form] = Form.useForm();

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);

  const onFinish =async (values) => {
    let account = await depositeMoney(values.amount,id)
    if(account.status !== 201 && account.status !== 200){
      console.log(account);
      message.error(account.message)
      return
    }
    form.resetFields()
    message.success("Money Deposited")
    cb()
    setVisible(false); // Close modal after successful submission
    setVisible(false); // Close modal after successful submission
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Deposit Money"
        open={visible}
        onOk={form.submit}
        onCancel={handleCloseModal}
      >
        <Form
          form={form}
          layout="vertical"
          name="deposit_form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter a deposit amount' }]}
          >
            <Input type='number'  />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DepositMoneyForm;
