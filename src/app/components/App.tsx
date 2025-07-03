import { Flex, Layout } from 'antd';
import React from 'react';

const { Footer, } = Layout;


const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'rgb(255,255,255)',
    height: '76px',
    padding: "10px 20px 0px",
    maxWidth: '480px',
    width: '100%',
    display: 'flex',
    justifyContent: "center",
    alignItems: 'flex-start',
    borderTop: '1px solid rgba(0,0,0,0.1',
};

const footerContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}

const footerItemsStyle: React.CSSProperties = {
    position: "relative",
    appearance: 'none',
    userSelect: 'none',
    outline: 'none',
    textDecoration: 'none',
    color: "inherit",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    flexDirection: 'column',
}
const footerItemIconStyle: React.CSSProperties = {
    position: 'relative',
    width: '20px',
    height: '20px',
}

const layoutStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    minHeight: '100dvh',
    maxWidth: '480px',
    margin: "auto"
};


const App: React.FC<{
    children: React.ReactNode;
}> = ({
    children
}) => {
        return (
            <Flex gap="middle" wrap style={{
                backgroundColor:"gray",
                overflow:"hidden",
                maxHeight:"100dvh"
            }}>
                <Layout style={layoutStyle}>
                    <div style={{
                        paddingBottom: "76px", // เท่ากับ footer height
                    }}>
                        {children}
                    </div>
                    <Footer style={footerStyle}>
                        <div style={footerContainerStyle}>
                            <div >
                                <a href="/booking" style={footerItemsStyle}>
                                    <div style={footerItemIconStyle}>
                                        <img alt="Booking" loading="lazy" decoding="async" data-nimg="fill" src="https://rewarding-rocket.s3.ap-southeast-1.amazonaws.com/1714220676316-Group%201171275107.svg"
                                            style={{
                                                position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent"
                                            }} />
                                    </div>
                                    <p className="sc-715cd296-4 jJyYuo">Booking</p>
                                    <div>
                                        <div className="sc-715cd296-6 fZoNEr" style={{ opacity: 1 }}>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div>
                                <a style={footerItemsStyle} href="/mybooking">
                                    <div style={footerItemIconStyle}>
                                        <img alt="My bookings" loading="lazy" decoding="async" data-nimg="fill" src="https://rewarding-rocket.s3.ap-southeast-1.amazonaws.com/1714267461653-Group%201171275104.svg" style={{
                                            position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent"
                                        }} />
                                    </div>
                                    <p className="sc-715cd296-4 jJyYuo">My bookings</p>
                                </a>
                            </div>
                            <div >
                                <a style={footerItemsStyle} href="/profile">
                                    <div style={footerItemIconStyle}>
                                        <img alt="Profile" loading="lazy" decoding="async" data-nimg="fill" src="https://rewarding-rocket.s3.ap-southeast-1.amazonaws.com/1714220683911-Group%201171275106.svg" style={{
                                            position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent"
                                        }} />
                                    </div>
                                    <p className="sc-715cd296-4 jJyYuo">โปรไฟล์</p>
                                </a>
                            </div>
                        </div>
                    </Footer>
                </Layout>
            </Flex>
        )
    };

export default App;