"use client"
import { Button, Card, Col, Form, Input, Row, Segmented, Space, Table, message } from 'antd';
import React from 'react'

function page({ params }) {
    const column = [
        {
            title: 'Customer Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'action',
            render: (e) => (<Button onClick={() => router.push(`user/${e.name}`)}>see</Button>),
        },
    ]

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
        },
        {
            key: '2',
            name: 'John',
        },
    ];

    return (
        <Row justify={"center"} gutter={[0, 10]}>
            <Col xs={22} sm={22} md={20} lg={20}>
                <Card>
                    <Form layout='vertical' className=''>
                        <Row className='' justify={"space-between"}>
                            <Col xs={24} sm={24} md={10}>
                                <Form.Item label={"Name"} name={""}>
                                    <Input className='rounded-1' />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={10}>
                                <Form.Item label={"Email"} name={""}>
                                    <Input className='rounded-1' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={10}>
                                <Form.Item label={"Created At"} name={""}>
                                    <Input className='rounded-1' />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>


            <Col xs={22} sm={22} md={20} lg={20}>
                <Segmented
                    className='rounded-1'
                    options={['Accounts', 'Beneficiaries', 'Transactions']}
                    onChange={(value) => {
                        console.log(value); // string
                    }}
                />
            </Col>

            <Col xs={22} sm={22} md={20} lg={20}>
                <Table columns={column} dataSource={dataSource} />
            </Col>
        </Row>
    )
}

export default page