"use client"
import React, { useEffect, useState } from 'react';
import { Card, List, Icon, Typography, Row, Col, Table, Form, Input, Button, message, Select, Segmented } from 'antd';
import { BankFilled, BankOutlined, CarOutlined, CreditCardOutlined, DollarCircleFilled, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { getAccounts, getBeneficiarieByCustId, getTransactionByCustId, transferMoney } from '@/axios/apiendpoints';
import AccountTypeForm from '../support/accounaddform';
import DepositMoneyForm from '../support/depositForm';
import PasswordModal from '../support/confirmPassword';
import { SecretView } from '@/app/dashboard/beneficiary/page';
import moment from 'moment';

const Dashboard = () => {
  const [accounts, setaccounts] = useState([])
  const [visible, setVisible] = useState(false);
  const [depositForm, setdepositForm] = useState(false)
  const [depositAccount, setdepositAetaccount] = useState(-1)
  const [beneficiarylist, setBeneficiarylist] = useState([])
  const [transactionList, setTransactionList] = useState([])
  const [transactionsAccountId, setTransactionsAccountId] = useState(-1)
  const getBeneficiary = async () => {
    getBeneficiarieByCustId().then(r => {
      if (r.status === 200 || r.status === 201) {
        setBeneficiarylist(r.data)
      }
    }).catch(r => {

    })
  }
  const getTransacyion = async (hard = false) => {
    getTransactionByCustId(transactionsAccountId, hard).then(r => {
      if (r.status === 200 || r.status === 201) {
        setTransactionList(r.data.map(i => ({ ...i, bname: i?.beneficiary?.name, accountType: i.account.accountType, date: moment(i.date).format('DD/MMM/YYYY') })))
      }
    }).catch(r => {

    })
  }
  const gACC = () => {
    getAccounts().then(r => {
      if (r?.status === 200) {
        setaccounts(r?.data.map(i => ({ key: i.id, title: i.accountType, balance: i.balance, icon: <DollarCircleFilled />, accountNumber: i.accountNumber })))
      }
    }).catch(r => {
      console.log(r);
    })
  }
  useEffect(() => {
    gACC()
    getBeneficiary()
    // getSession().then(r=>{
    //   console.log(r);
    // }).catch(r=>{
    //   console.log(r);
    // })
  }, [])

  useEffect(() => {
    if (accounts.length > 0) {
      setTransactionsAccountId(accounts[0].key)
    }
  }, [accounts])
  useEffect(() => {
    if (accounts.length > 0) {
      getTransacyion()
    }
  }, [transactionsAccountId])

  return (
    <div className='p-2 p-md-2'>
      <div className="dashboard">
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}

        >
          <Row gutter={[8, 8]}>
            {accounts.map((item) => (
              <List.Item key={item.key}>
                <Card title={item.title} actions={[<Button key={item.key} onClick={() => { setdepositForm(true), setdepositAetaccount(item.key) }} type='link'>Deposit</Button>]}>
                  <List.Item.Meta
                    title={item.balance}
                    avatar={item.icon}
                    description={<SecretView secret={item.accountNumber} extra={"AC no."} />}
                  />

                </Card>
              </List.Item>
            ))}
            <List.Item key={"item.key"}>
              <Card title={"Credit Card"} actions={[<Button key={"hjfgh"} onClick={() => { message.error("Not Eligible") }} type='link'>Apply</Button>]}>
                <List.Item.Meta
                  title={"Credit Upto 50000"}
                  avatar={<CreditCardOutlined />}
                  description={"Apply For New Card"}
                />

              </Card>
            </List.Item>
            {accounts.length < 2 &&
              <List.Item colStyle={{ grid: 1 }} >
                <Card title={"Create Account"} actions={[<Button key={"hjf"} onClick={() => { setVisible(true) }} type='link'>Add Account</Button>]}>
                  <List.Item.Meta
                    title={"Add New Account"}
                    avatar={<BankOutlined />}
                    description={"Add New Account"}
                  />

                </Card>
              </List.Item>

            }
          </Row>

        </List>
      </div>
      <Row className='' gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Card
            title={"Recents Transactions"}
            extra={<Segmented
              value={transactionsAccountId}
              options={accounts.map(o => ({ label: o.title, value: o.key, key: o.key }))}
              onChange={(value) => {
                setTransactionsAccountId(value)
              }}
            />}
            styles={{ body: { padding: 0 } }}
          >
            <Table
              columns={columns}
              dataSource={transactionList}
              pagination={false}
            />

          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <MakePayment list={beneficiarylist} accounts={accounts} cb={() => { gACC(), getTransacyion() }} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
        </Col>
      </Row>
      <AccountTypeForm visible={visible} setVisible={setVisible} cb={gACC} />
      <DepositMoneyForm visible={depositForm} setVisible={setdepositForm} cb={gACC} id={depositAccount} />
    </div>
  );
};

export default Dashboard;

export const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'id',
    key: 'description',
  },
  {
    title: 'Beneficiary',
    dataIndex: 'bname',
    key: 'description',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date', // Unique key for each column
    sorter: (a, b) => new Date(a.date) - new Date(b.date), // Sort function for dates
    sortDirections: ['ascend', 'descend'], // Allowed sort directions
  },
  {
    title: 'Account',
    dataIndex: 'accountType',
    key: 'description',
  },
  {
    title: 'Transaction Type',
    dataIndex: 'type',
    key: 'description',
    render: (type) => (
      <span style={{ color: type === 'CREDIT' ? 'green' : 'red' }}>{type}</span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => `$${amount.toFixed(2)}`, // Format amount with two decimal places
  },
];


const MakePayment = ({ list, accounts, cb }) => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false)
  const [passwordMoadal, setPasswordModal] = useState(false)
  const [formData, setformData] = useState({})
  const Transfer = async (password) => {
    setloading(true)
    transferMoney({ ...form.getFieldsValue(), password }).then(r => {
      if (r.status == 200 || r.status == 201) {
        message.success("Money Transferred")
        form.resetFields()
        cb()
      } else {
        message.error(r.message)
      }
    }).catch(r => {
      message.error(r.message)
    }).finally(setloading(false))
  }
  const onFinish = (values) => {
    setPasswordModal(true)
    setformData({ ...values, pname: list.filter(i => values.beneficiaryId === i.id)[0]?.name, paccount: accounts.filter(i => values.accountId === i.key)[0]?.accountNumber })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const transformedData = list.map(item => ({
    value: item.id,
    label: item.name
  }));

  return (
    <Card title={"Make a Payment"} className="make-payment">
      <Form
        form={form}
        layout="vertical" // Adjust layout as needed (e.g., 'horizontal')
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Payee" name={"beneficiaryId"} rules={[{ required: true, message: 'Field Required' }]} >
          <Select options={transformedData} />
        </Form.Item>
        <Form.Item label="Account" name={"accountId"} rules={[{ required: true, message: 'Field Required' }]} >
          <Select options={accounts.map(item => ({
            value: item.key,
            label: item.title
          }))} />
        </Form.Item>
        <Form.Item label="Amount" name={"amount"} rules={[{ required: true, message: 'Field Required' }]}>
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </Form.Item>
      </Form>
      <PasswordModal isOpen={passwordMoadal} onClose={() => setPasswordModal(false)} onSubmit={(a) => Transfer(a)} formData={formData} />
    </Card>
  );
};
