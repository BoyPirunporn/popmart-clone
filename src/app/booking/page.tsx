"use client";
import { Card, Flex, Layout, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import DrawerBranch from '../components/DrawerBranch';
import styled from 'styled-components';

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
    height: "100%"
};

const delay = (duration: number) => () => new Promise((resolve) => setTimeout(resolve, duration));

const RegisterButton: React.FC = () => {
    const [disable,setDisable] = useState(false);

    useEffect(() => {
       delay(5*1000)
    },[])

    return (
        <Space>
            <div className='' >
                <div className='service-card'>
                    <div className='register' role='button' >register</div>
                </div>
            </div>
        </Space>);
};


const ContentStyle = styled.div`
height: 100vh;
display:flex;
flex-direction:column;
overflow-y:auto;
`;

export default function Home() {
    const [open, setOpen] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) return null;
    return (
        <div className="content">
            <Header style={headerStyle} >
                <p>Registration Booking</p>
            </Header >
            <ContentStyle>
                <Content style={contentStyle}>
                    <Card title="Default size card"
                        role="button" onClick={() => {
                            setOpen(true);
                        }} className='service-item ' extra={
                            <RegisterButton />
                        } style={{ width: "100%", minHeight: "107px", height: "107px" }}>
                        <p>Card content</p>
                    </Card>

                    <div style={{ maxWidth: "480px", width: "100%" }}>
                        <DrawerBranch onClose={() => setOpen(!open)} open={open} />
                    </div>
                </Content>
            </ContentStyle>
        </div>
    );
}
