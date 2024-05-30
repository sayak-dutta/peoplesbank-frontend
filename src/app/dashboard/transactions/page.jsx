"use client"
import { columns } from '@/component/page/dashboard'
import { Card, Col, Row, Table } from 'antd'
import React from 'react'

function Page() {
  return (
    <Row justify={'center'} >
        <Col xs={24} sm={24} md={22} lg={22}>
          <Card
              title="Transactions"
              styles={{body:{padding:0}}}
          >
              <Table
              columns={columns}
              dataSource={[]}
              pagination={false} 
            />
          </Card>
        </Col>
      </Row>

  )
}

export default Page