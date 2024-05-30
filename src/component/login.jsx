"use client"
import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { signIn } from "next-auth/react"

const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // State for signup/signin toggle

  const handleSubmit = async (values) => {
    const { email, password } = values;
    
    const result = await signIn('credentials', {
        email,
        password,
        callbackUrl:'/dashboard'
      });
  
      if (!result.error) {
        console.log('Sign-in successful!');
      } else {
        message.error('Sign-in failed: '+result.error)
      }
  };

  return (
    <Card style={{ width: 400, margin: 'auto' }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]} >
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
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
