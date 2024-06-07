"use client"
import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { signIn } from "next-auth/react"
import { createAccounts, getBeneficiarieByCustId, loginRequest, signupRequest } from '@/axios/apiendpoints';
import Image from 'next/image';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // State for signup/signin toggle
  const [formLoading, setformLoading] = useState(false)

  const handleSubmit = async (values) => {
    setformLoading(true)
    const { email, password } = values;
    let a =  isSignup? await signupRequest(values): await loginRequest(values)
    //create Account Now
    if(a.status !==200){
      message.error(a?.message)
      setformLoading(false)
      return
    }
    console.log(a);
    if(isSignup){
      let account = await createAccounts({accountNumber:Math.floor(Math.random()*10000000000),balance:0,accountType:values.type}, a.data.id)
      if(account.status !== 201){
        console.log(account);
        message.error(account.message)
        setformLoading(false)
        return
      }
    }
    const result = await signIn('credentials', {
        email:a.data.email,
        password:a.data.id,
        callbackUrl:'/dashboard'
      });                            
      if (!result.error) {
        console.log('Sign-in successful!');
      } else {
        message.error('Sign-in failed: '+result.error)
        setformLoading(false)
      }
  };

  return (
    <Card style={{ width: 400, margin: 'auto' }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className='col-11 col-md-8 mx-auto mb-3'>
          <Image width={600} height={40} style={{width:"100%"}} src={"/logo.png"} alt='people bank' />
        </div>
        <h2>{isSignup ? 'Create Account' : 'Login'}</h2>
        {isSignup&&
        <Form.Item label="Customer Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]} >
          <Input />
        </Form.Item>}
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]} >
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password />
        </Form.Item>

        {isSignup&&
        <Form.Item initialValue={"SAVING"} label="Account Type" name="type" rules={[{ required: true, message: 'Select Bank Account Type' }]} >
          <Select
            style={{ width: "100%" }}
            options={accountTypes.map((type) => ({label:type.label,value:type.value,key:type.value}))} 
          />
        </Form.Item>}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={formLoading}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </Form.Item>
        <Form.Item>
          {isSignup ? (
            <span>
              Already have an account?{' '}
              <a onClick={() => setIsSignup(false)}>Sign In</a>
            </span>
          ) : (
            <span>
              New user?{' '}
              <a onClick={() => setIsSignup(true)}>Sign Up</a>
            </span>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;

export const accountTypes = [
  { value: 'SAVING',key: 'SAVING', label: 'Saving Account' },
  { value: 'CURRENT',key: 'CURRENT', label: 'Current Account' },
];
