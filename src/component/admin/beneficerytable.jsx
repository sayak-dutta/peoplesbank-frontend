import { getBeneficiarieByCustId } from "@/axios/apiendpoints"
import { Card, Col, Row, Table } from "antd"
import { useEffect, useState } from "react"

function BeneficeryTable({id}) {
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
      },
      {
        title: 'IFSC',
        dataIndex: 'ifscCode',
        key: 'ifsc',
      },
  
    //   {
    //     title: 'Action',
    //     dataIndex: '',
    //     key: 'action',
    //     render: (record) => (
    //       <>
    //         <Button type="link" onClick={() => handleEdit(record)}>
    //           Edit
    //         </Button>
    //         <Popconfirm
    //           title="Are you sure you want to delete this beneficiary?"
    //           onConfirm={() => handleDelete(record.id)}
    //           onCancel={() => console.log('Cancel')}
    //         >
    //           <Tooltip title="delete">
  
    //           <Button type="link" icon={<DeleteOutlined/>} danger/>
    //           </Tooltip>
    //         </Popconfirm>
    //       </>
    //     ),
    //   },
    ])
    const [dataSource, setDataSource] = useState([])
    
    const getBeneficery = async () => {
      getBeneficiarieByCustId(id).then(r => {
        setDataSource(r.data)
      }).catch(err => {
        message.error(err?.message)
      })
    }
    useEffect(() => {
      getBeneficery()
    }, [id])
  
    return (
            <Table columns={column} dataSource={dataSource} pagination={false} />
    )
  }
  
  export default BeneficeryTable