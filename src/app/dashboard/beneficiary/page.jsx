'use client'
import { addBeneficiaries, deleteBeneficiaries, editBeneficiaries, getBeneficiarieByCustId } from '@/axios/apiendpoints'
import { EyeOutlined, EyeInvisibleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Table, Tooltip, message } from 'antd'
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
      title: 'Account no',
      dataIndex: 'accountNumber',
      key: 'account',
      render: (i) => (<SecretView secret={i} />)
    },
    {
      title: 'IFSC',
      dataIndex: 'ifscCode',
      key: 'ifsc',
    },

    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this beneficiary?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={() => console.log('Cancel')}
          >
            <Tooltip title="delete">

            <Button type="link" icon={<DeleteOutlined/>} danger/>
            </Tooltip>
          </Popconfirm>
        </>
      ),
    },
  ])
  const [dataSource, setDataSource] = useState([])
  const handleEdit = (e) => {
    setId(e)
    setModal(i => !i)

  };

  const handleDelete = (key) => {
    // Implement your delete logic here, passing the key or beneficiary data
    deleteBeneficiaries(key).then(r=>{
      getBeneficery()
    })
  };


  const getBeneficery = async () => {
    getBeneficiarieByCustId().then(r => {
      setDataSource(r.data)
      setOpen(false)
      setModal(false)
    }).catch(err => {
      message.error(err?.message)
    })
  }
  useEffect(() => {
    getBeneficery()
  }, [])

  return (
    <Row justify={'center'} >
      <Col xs={24} sm={24} md={22} lg={22}>
        <Card
          title={"Beneficiary"}
          extra={<Button onClick={() => setOpen(i => !i)} type='default'>Add Beneficiary</Button>}
          styles={{ body: { padding: 0 } }}
        >
          <Table columns={column} dataSource={dataSource} pagination={false} />
        </Card>
        <Modal footer={null} open={open} onCancel={() => { setOpen(i => !i), setId(null) }}>
          <AddBeneficiaryForm id={id} cb={getBeneficery} />
        </Modal>
        <Modal footer={null} open={modal} onCancel={() => { setModal(i => !i), setId(null) }}>
          <AddBeneficiaryForm cb={getBeneficery} id={id} />
        </Modal>
      </Col>
    </Row>
  )
}

export default Pag

const AddBeneficiaryForm = ({ id, cb = () => { } }) => {
  const [FLoading, setFLoading] = useState(false)
  const [form] = Form.useForm();

  const onFinish = (values) => {

    setFLoading(true);

    if (id) {
      editBeneficiaries(values,id.id).then(r => {
        setFLoading(false)
        if (r.status) {
          values
          
          cb()
        }
      },
        form.resetFields()
      ).catch(err => {
        setFLoading(false)
        message.error(err?.message)
      })
    }
    else {
      addBeneficiaries(values).then(r => {
        setFLoading(false)
        if (r.status) {
          values
          cb()
        }
      },
        form.resetFields()
      ).catch(err => {
        setFLoading(false)
        message.error(err?.message)
      })
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (id) {
      form.setFieldsValue({ "name": id.name, "accountNumber": id.accountNumber, "ifscCode": id.ifscCode })
    }
  }, [id])

  return (
    <Form
      form={form}
      layout="vertical" // Adjust layout as needed (e.g., 'horizontal')
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Beneficiary Name" name={"name"} required>
        <Input placeholder="Enter beneficiary name" />
      </Form.Item>
      <Form.Item label="Account Number" name={"accountNumber"} required>
        <Input placeholder="Enter account number" />
      </Form.Item>
      <Form.Item label="IFSC Code" name={"ifscCode"} required>
        <Input placeholder="Enter IFSC code" />
      </Form.Item>
      <Form.Item>
        <Button type='primary' block htmlType="submit" loading={FLoading} >
          {id ? "Edit Beneficiary" : "Add Beneficiary"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export const SecretView = ({ secret,extra=null }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => setIsRevealed(!isRevealed);

  const maskedSecret = secret?.substr(0, 2) + secret?.substr(secret?.length - 4).replace(/./g, 'X') + secret?.substr(secret?.length - 2); // Mask all characters with 'x'

  const secretContent = isRevealed ? secret : maskedSecret;

  return (
    <div className="secret-view">
      <span className="secret-content">{extra} {secretContent}</span>
      <Button type="link" onClick={toggleReveal}>
        {isRevealed ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </Button>
    </div>
  );
};

