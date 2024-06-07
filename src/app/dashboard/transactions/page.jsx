"use client"
import { getAccounts, getTransactionByCustId } from '@/axios/apiendpoints'
import { columns } from '@/component/page/dashboard'
import { DollarCircleFilled } from '@ant-design/icons'
import { Card, Col, Row, Segmented, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

function Page() {
  const [accounts, setAccounts] = useState([])
  const [transactionList, setTransactionList] = useState([])
  const [transactionsAccountId, setTransactionsAccountId] = useState(-1)

  const getTransacyion= async (hard=false) => {
    console.log(transactionsAccountId);
    getTransactionByCustId(transactionsAccountId,hard).then(r => {
      if (r.status === 200 || r.status === 201) {
        console.log(r.data);
        setTransactionList(r.data.map(i=>({...i,bname:i?.beneficiary?.name,accountType:i.account.accountType,date:moment(i.date).format('DD/MMM/YYYY')})))
      }
    }).catch(r => {

    })
  }
  const gACC = () => {
    getAccounts().then(r => {
      if (r?.status === 200) {
        setAccounts([...[{key:-1,title:"ALL"}],...r?.data.map(i => ({ key: i.id, title: i.accountType, balance: i.balance, icon: <DollarCircleFilled />,accountNumber:i.accountNumber }))])
      }
    }).catch(r => {
      console.log(r);
    })
  }
  useEffect(() => {
    gACC()
  }, [])

  useEffect(()=>{
    if(accounts.length>0){
      setTransactionsAccountId(-1)
    }
  },[accounts])
  useEffect(()=>{
    if(accounts.length>0){
      getTransacyion()
    }
  },[transactionsAccountId])
  return (
    <Row justify={'center'} >
        <Col xs={24} sm={24} md={22} lg={22}>
          <Card
              title="Transactions"
              styles={{body:{padding:0}}}
              extra={<Segmented
                
                defaultValue={-1}
                options={accounts.map(o=>({label:o.title,value:o.key,key:o.key}))}
                onChange={(value) => {
                  setTransactionsAccountId(value)
                }}
                />}
          >
              <Table
              columns={columns}
              dataSource={transactionList}
              pagination={false} 
            />
          </Card>
        </Col>
      </Row>

  )
}

export default Page