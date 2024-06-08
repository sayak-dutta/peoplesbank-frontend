"use client"
import Pag from '@/app/dashboard/beneficiary/page';
import Page from '@/app/dashboard/transactions/page';
import { getCustomerDetail } from '@/axios/apiendpoints';
import AccountTable from '@/component/admin/accountsTable';
import BeneficeryTable from '@/component/admin/beneficerytable';
import TransactionTable from '@/component/admin/transactionTable';
import { Button, Card, Col, Form, Input, Row, Segmented, Space, Table, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page({ params }) {
    const Tabs = ['Accounts', 'Beneficiaries', 'Transactions']
    const [currentTab, setCurrentTab] = useState("Accounts")
    const [form] = Form.useForm();
    const [isTouched, setIsTouched] = useState(false);
    const router = useRouter()
    useEffect(()=>{
        getCustomerDetail(params.slug).then(r=>{
            form.setFieldsValue({name:r.name,email:r.email})
        }).catch(r=>{
            console.log(r);
        })
    },[])

    return (
        <Row justify={"center"} gutter={[0, 10]}>
            <Col xs={23} sm={23} md={21} lg={21}>
                <Card title="Customer Details" extra={<Link href={"/admin"}>Customers List</Link>}>
                    <Form form={form} layout='horizontal' disabled className=''
                    onFieldsChange={() => {
                        setIsTouched(true);
                      }}
                    >
                        <Row className='' justify={"space-between"}>
                            <Col xs={24} sm={24} md={15}>
                                <Form.Item label={"Name"} name={"name"}>
                                    <Input className='rounded-1' style={{width:'350px'}} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={15}>
                                <Form.Item label={"Email"} name={"email"}>
                                    <Input className='rounded-1' style={{width:'350px'}} />
                                </Form.Item>
                            </Col>
                            {/* <Col xs={24} sm={24} md={15}>
                                <Form.Item label={"Create"} name={"date"}>
                                    <Input className='rounded-1' style={{width:'350px'}} />
                                </Form.Item>
                            </Col> */}
                        </Row>
                    </Form>
                </Card>
            </Col>


            <Col xs={23} sm={23} md={21} lg={21}>
                <Card 
                    title={Tabs.filter(i=>i===currentTab)[0]}
                    extra={
                        <Segmented
                        className='rounded-1'
                        options={Tabs}
                        onChange={(value) => {
                            setCurrentTab(value) // string
                        }}
                    />
                    }
                    styles={{body:{padding:"2px 5px"}}}
                >
                    {currentTab==="Accounts"&&<AccountTable id={params.slug} />}
                    {currentTab==="Beneficiaries"&&<BeneficeryTable id={params.slug} />}
                    {currentTab==="Transactions"&&<TransactionTable id={params.slug} />}
                </Card>
            </Col>
        </Row>
    )
}

export default page