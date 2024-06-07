"use client"
import { AppstoreAddOutlined, LockOutlined, SettingOutlined, TransactionOutlined, UnlockOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Layout, Menu, theme } from 'antd'
import Link from 'next/link';
import React, { useMemo, useState } from 'react'
import { NextLinkCB } from './routeloader';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    
  
  return (
    <Layout.Sider
      style={{}}
    collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <AntdMenu />
    </Layout.Sider>
  )
}

export default Sidebar

export function HeaderCl  (){
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return(
        <Layout.Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
    )
}

const items = [
  {
    key: 'dashboard',
    label: <Link href="/dashboard">Dashboard</Link>,
    icon: <AppstoreAddOutlined />,
  },
  {
    key: 'beneficiary',
    label: <NextLinkCB href="/dashboard/beneficiary">Beneficiary</NextLinkCB>,
    icon: <UserOutlined />,
  },
  {
    key: 'transactions',
    label: <NextLinkCB href="/dashboard/transactions">Transactions</NextLinkCB>,
    icon: <TransactionOutlined />, // "金を" (kin) icon for transactions (replace with a suitable icon if needed)
  },
  {
    key: 'settings',
    label: <Link href="/dashboard/settings">Settings</Link>,
    icon: <SettingOutlined />,
  },
  {
    key: 'support',
    label: <Link href="/dashboard/support">Support</Link>,
    icon: <UsergroupAddOutlined />
  },
  {
    key: 'logout',
    label: <Link href="#" onClick={signOut}>Log out</Link>,
    icon: <UnlockOutlined />,
  },
];

const AntdMenu = () => {
  var pathname = usePathname()

    // Use useMemo to efficiently extract the active key
    const activeKey = useMemo(() => {
      // Extract the relevant part of the path (e.g., /dashboard/beneficiary becomes 'transactions')
      const pathSegments = pathname.split('/');
      return pathSegments[pathSegments.length - 1]; // Get the last segment
    }, [pathname]);
    console.log(activeKey)
    
  return (
    <Menu
      theme="dark" 
      defaultSelectedKeys={['dashboard']} // Set dashboard as default selected
      selectedKeys={[activeKey]}
      mode="inline" // For vertical menu (change to 'horizontal' for horizontal)
      items={items}
    />
  );
};
