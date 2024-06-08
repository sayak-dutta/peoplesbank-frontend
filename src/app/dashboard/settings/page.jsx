"use client"
import { Button, Card, Col, Form, Input, Row } from 'antd'
import React from 'react'

function page() {
    const [form] = Form.useForm()
    return (
        <Row justify={'center'} >
            <Col xs={24} sm={24} md={20} lg={20}>
                <Card
                    title={"Profile"}
                    styles={{ body: { padding: 0 } }}
                >
                    <Form form={form} layout='vertical'>
                        <Row className=''>
                        <Form.Item label={"Name"}>
                            <Input/>
                        </Form.Item>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
export default page