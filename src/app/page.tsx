"use client";
import { Card, Flex, Layout, Space } from 'antd';
import React, { useState } from 'react';
import DrawerBranch from './components/DrawerBranch';

const { Header, Content } = Layout;
const headerStyle: React.CSSProperties = {
  color: '#000000',
  height: 64,
  justifyContent: "space-between"
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  padding: '20px 20px',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const RegisterButton: React.FC = () => (
  <Space>
    <div className='' >
      <div className='service-card'>
        <button>register</button>
      </div>
    </div>
  </Space>)
export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="content">
      <Header style={headerStyle} >
        <p>Registration Booking</p>
      </Header >
      <Content style={contentStyle}>
        <Card title="Default size card"
          role="button" onClick={() => {
            setOpen(true);
          }} className='service-item register' extra={
            <RegisterButton />
          } style={{ width: "100%", minHeight: "107px", height: "107px" }}>
          <p>Card content</p>
        </Card>
        <div style={{ maxWidth: "480px", width: "100%" }}>
          <DrawerBranch onClose={() => setOpen(!open)} open={open} />
        </div>
      </Content>
    </div>
  );
}
