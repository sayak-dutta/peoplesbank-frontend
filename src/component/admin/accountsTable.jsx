import React, { useState, useEffect } from 'react';
import { Table, Switch, Button, message } from 'antd'; // Import necessary components
import { getAccounts } from '@/axios/apiendpoints';

const columns = [
  {
    title: 'Account No.',
    dataIndex: 'accountNumber',
    key: 'accountNumber',
  },
  {
    title: 'Account Type',
    dataIndex: 'title',
    key: 'accountType',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    render: (balance) => `$${balance.toFixed(2)}`, // Format balance with 2 decimal places
  },
  {
    title: 'Eligible for Credit',
    dataIndex: 'eligibleForCard',
    key: 'eligibleForCard',
    render: (eligible) => <Switch checked={false} />, // Use Switch for eligibility display
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (action) => <Button type="link" danger>Freeze</Button>, // Display custom action button
  },
];

const AccountTable = ({ id }) => {
  const [tableData, setTableData] = useState([]);

  
  const fetchData = async () => {
    const response = await getAccounts(id)
    if(response.status==200){
        const data = response?.data.map(i => ({ key: i.id, title: i.accountType, balance: i.balance, accountNumber: i.accountNumber }));
        setTableData(data);
    }else{
        message.error(response?.message)
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once

  return (
    <Table dataSource={tableData} columns={columns} rowKey="id" pagination={false} />
  );
};

export default AccountTable;