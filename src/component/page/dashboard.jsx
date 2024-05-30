"use client"
import React from 'react';
import { Card, List, Icon, Typography, Row, Col, Table, Form, Input, Button } from 'antd';
import { BankFilled, BankOutlined, CarOutlined, CreditCardOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Dashboard = () => {
  const accountsData = [
    { title: 'Checking Account', balance: '$10,000', icon: <BankOutlined /> },
    { title: 'Savings Account', balance: '$5,000', icon: <BankFilled /> },
    { title: 'Credit Card', balance: '$5,000', icon: <CreditCardOutlined /> },
  ];


  return (
    <div className='p-2 p-md-2'>
    <div className="dashboard">      
        <List
             grid={{
                gutter: 16,
                column: 3,
              }}
          dataSource={accountsData}
          renderItem={(item) => (
            <List.Item>
                <Card title={item.title} actions={["Ava"]}>
                    <List.Item.Meta
                        avatar={item.icon}
                        description={item.balance}
                    />

                </Card>
            </List.Item>
          )}
        />
    </div>
    <Row className='' gutter={[8,8]}>
        <Col xs={24} sm={24} md={24} lg={18}>
            <Card
                title={
                    <>
                        <Typography.Title level={3}>Recents Transactions</Typography.Title>
                        <Link href={"/dashboard/transactions"}>View All</Link>
                    </>
                }
                styles={{body:{padding:0}}}
            >
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />

            </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
            <MakePayment />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
        </Col>
    </Row>
    </div>
  );
};

export default Dashboard;

export const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date', // Unique key for each column
      sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort function for dates
      sortDirections: ['ascend', 'descend'], // Allowed sort directions
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`, // Format amount with two decimal places
    },
  ];
  
  const dataSource = [ // Replace with your actual data
    {
      date: '2024-05-30',
      description: 'Salary deposit',
      amount: 2000,
    },
    {
      date: '2024-05-28',
      description: 'Grocery shopping',
      amount: -50.25,
    },
    // ... more data objects
  ];
  
  const MakePayment = () => {
    const [form] = Form.useForm();
  
    const onFinish = (values) => {
      console.log('Success:', values);
      // Handle form submission logic here (e.g., send payment data to server)
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Card title={"Make a Payment"} className="make-payment">
        <Form
          form={form}
          layout="vertical" // Adjust layout as needed (e.g., 'horizontal')
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Payee">
            <Input placeholder="Enter payee name" />
          </Form.Item>
          <Form.Item label="Amount">
            <Input type="number" placeholder="Enter amount" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Pay
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  };
  