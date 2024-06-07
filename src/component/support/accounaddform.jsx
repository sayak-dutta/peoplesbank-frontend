import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { accountTypes } from '../login';
import { createAccounts, createAccountsV2 } from '@/axios/apiendpoints';

const AccountTypeForm = ({visible,setVisible,cb}) => {
  

  const [form] = Form.useForm();

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);

  const onFinish = async(values) => {
    console.log('Success:', values);
    let account = await createAccountsV2({accountNumber:Math.floor(Math.random()*10000000000),balance:values.balance,accountType:values.type})
      if(account.status !== 201){
        console.log(account);
        message.error(account.message)
        return
      }
      message.success("Account Created")
    cb()
    setVisible(false); // Close modal after successful submission
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
      <Modal
        title="Create New Account"
        open={visible}
        onOk={form.submit}
        onCancel={handleCloseModal}
      >
        <Form
          form={form}
          layout="vertical"
          name="account_form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Account Type"
            name="type"
            rules={[{ required: true, message: 'Please select an account type' }]}
          >
            <Select options={accountTypes} />
          </Form.Item>
          <Form.Item
            label="Deposit Amount"
            name="balance"
            rules={[{ required: true, message: 'Please enter balance' }]}
          >
            <Input type='number' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AccountTypeForm;