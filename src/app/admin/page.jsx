"use client"
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Space, Table, message } from 'antd';
import { useRouter } from 'next/navigation';
const CustTable = () => {
    const router = useRouter()
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
            render: (e) => (<Button onClick={() => router.push(`/admin/${e.name}`)}>see</Button>),
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
        <Table columns={column} dataSource={dataSource} />
    )
}

export default CustTable