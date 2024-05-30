"use client"
import { Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" />
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