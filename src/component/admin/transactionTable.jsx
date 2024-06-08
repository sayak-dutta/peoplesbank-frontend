"use client"
import { getAccounts, getTransactionByCustId } from '@/axios/apiendpoints'
import { columns } from '@/component/page/dashboard'
import { DollarCircleFilled } from '@ant-design/icons'
import { Card, Col, Row, Segmented, Spin, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

function TransactionTable({id}) {
  const [loading, setLoading]=useState(true)
  const [transactionList, setTransactionList] = useState([])

  const getTransacyion= async (hard=false) => {
    getTransactionByCustId(-1,hard,id).then(r => {
      if (r.status === 200 || r.status === 201) {
        setTransactionList(r.data.map(i=>({...i,bname:i?.beneficiary?.name,accountType:i.account.accountType,date:moment(i.date).format('DD/MMM/YYYY')})))
        setLoading(false)
      }
    }).catch(r => {

    })
  }
  
  useEffect(() => {
    getTransacyion()
  }, [id])

  return (
              <Table
              scroll={{x:"100%"}}
              columns={columns}
              dataSource={transactionList}
              loading={loading}
              

            />

  )
}

export default TransactionTable