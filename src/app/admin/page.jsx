"use client"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Table } from 'antd';
import { message } from 'antd'; // For displaying login success/failure messages
import Link from 'next/link';
import { getAllCustomer } from '@/axios/apiendpoints';
import Image from 'next/image';
import { EyeFilled, LogoutOutlined } from '@ant-design/icons';

const { Item } = Form;
const ConditionalRendering = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const storedValue = localStorage.getItem('logged');
      setIsLoggedIn(storedValue === 'true');
    }, []); // Empty dependency array to run only on initial render
  
    return (
      <div>
        {isLoggedIn ? <MyTable /> : <LoginPage />}
      </div>
    );
  };
  
  export default ConditionalRendering;
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {

    const NEXT_PUBLIC_EMAIL = process.env.NEXT_PUBLIC_EMAIL; // Assuming you have these env variables
    const NEXT_PUBLIC_PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;

    if (email === NEXT_PUBLIC_EMAIL && password === NEXT_PUBLIC_PASSWORD) {
      localStorage.setItem('logged', 'true');
      message.success('Login successful!');
      location.reload()
      // Redirect or handle successful login here
    } else {
      message.error('Invalid email or password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">    
    <Card style={{ width: 400, margin: 'auto' }}>
        <h3 className='text-center'>Admin Login</h3>
      <Form onFinish={handleSubmit} layout="vertical">
        <Item label="Email" name={"email"}>
          <Input  onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </Item>
        <Item label="Password" name={"password"}>
          <Input.Password  onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Item>
      </Form>
    </Card>
    </div>
  );
};


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Action',
    dataIndex: 'key',
    key: 'action',
    render: (text, record) => (
        <Link href={"/admin/"+text}>
            <Button type="primary" icon={<EyeFilled/>}>
                View
            </Button>
        </Link>
    ),
  },
];

const MyTable = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
      getAllCustomer().then(r=>{
        setdata(r.map(i=>({...i,key:i.id})));
      }).catch(r=>{
        console.log(r);
      }).finally(r=>setloading(false))    
    }, [])
    const logout=()=>{
        localStorage.removeItem("logged")
        location.reload()
    }
  return (
    <Card
        className='rounded-0'
        title={<div className="d-flex justify-content-center"><Image width={300} height={50} className='my-2 mx-auto'  src={"/logo.png"} alt='people bank' /></div>}
        style={{minHeight:"100vh"}}
        styles={{body:{padding:"2px 5px"}}}
        rootClassName='position-relative'
        extra={<Button onClick={logout} icon={<LogoutOutlined/>} />}
    >
        
        <Table scroll={{x:"100%"}} dataSource={data} loading={loading} columns={columns} pagination={{ pageSize: 10 }} />
        <div className="position-absolute bottom-0 col-12 bg-secondary-subtle py-2">
            <h5 className='text-center'>Welcome Admin</h5>
        </div>
    </Card>
  );
};

