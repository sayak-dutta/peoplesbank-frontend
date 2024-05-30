'use client'
import { Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'

function Pag() {
  const [open, setOpen] = useState()
  const [modal, setModal] = useState()
  const [id, setId] = useState(null)
  const [column, setColumn] = useState([
    {
      title: 'Beneficiary Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record.key)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this beneficiary?"
            onConfirm={() => handleDelete(record.key)}
            onCancel={() => console.log('Cancel')}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ])
  const [dataSource, setDataSource] = useState([ // Replace with your actual data
  {
    key: '1',
    name: 'John Doe',
  },
  {
    key: '2',
    name: 'Jane Smith',
  },
  ])
  const handleEdit = (key) => {
    setId(key)
    setModal(i=>!i)
    console.log('Edit beneficiary with key:', key);
  };

  const handleDelete = (key) => {
    // Implement your delete logic here, passing the key or beneficiary data
    console.log('Delete beneficiary with key:', key);
  };
  return (
    <Row justify={'center'} >
        <Col xs={24} sm={24} md={22} lg={22}>
          <Card
            title={"Beneficiary"}
            extra={<Button onClick={()=>setOpen(i=>!i)} type='default'>Add Beneficiary</Button> }
            styles={{body:{padding:0}}}
          >
              <Table columns={column} dataSource={dataSource} pagination={false} />
          </Card>
          <Modal footer={null} open={open} onCancel={()=>{setOpen(i=>!i)}}>
            <AddBeneficiaryForm />
          </Modal>
          <Modal footer={null} open={modal} onCancel={()=>{setModal(i=>!i)}}>
            <AddBeneficiaryForm id={id} />
          </Modal>
        </Col>
    </Row>
  )
}

export default Pag

const AddBeneficiaryForm = ({id=null}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    // Handle form submission logic here (e.g., send beneficiary data to server)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(()=>{
    form.setFieldsValue({bname:id})
  },[id])

  return (
    <Form
      form={form}
      layout="vertical" // Adjust layout as needed (e.g., 'horizontal')
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Beneficiary Name" name={"bname"} required>
        <Input placeholder="Enter beneficiary name" />
      </Form.Item>
      <Form.Item label="Account Number" required>
        <Input placeholder="Enter account number" />
      </Form.Item>
      <Form.Item label="IFSC Code" required>
        <Input placeholder="Enter IFSC code" />
      </Form.Item>
      <Form.Item label="Bank Name" required>
        <Input placeholder="Enter bank name" />
      </Form.Item>
      <Form.Item>
        <Button type='primary' block htmlType="submit">
          Add Beneficiary
        </Button>
      </Form.Item>
    </Form>
  );
};
