import { Drawer, Space } from 'antd';
import React, { FC } from 'react';
import ListBranch from './ListBranch';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../styles-component/Button';

type DrawerProps = {
    open: boolean;
    onClose: () => void;
};

const ButtonDiv = styled.div`
width: 100%;
text-align: center;
`;


const DrawerBranch: React.FC<DrawerProps> = ({
    onClose,
    open
}) => {
    const [branch, setBranch] = React.useState<string>("");
    const route = useRouter();
    return (
        <Drawer
            title="Drawer with extra actions"
            placement={"bottom"}
            onClose={onClose}
            closable={false}
            open={open}
            key={"bottom"}
            width="100%"
            height={800}

            getContainer={false}
            rootStyle={{ position: 'absolute', padding: 0, margin: 0, overflowY: "auto" }} // สำคัญมาก ถ้าจะไม่ให้เต็มจอ

            extra={
                <Space>
                    <span role="img" className='anticon anticon-close' onClick={onClose}>
                        <svg
                            fillRule="evenodd"
                            viewBox="64 64 896 896"
                            focusable="false"
                            data-icon="close"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true">
                            <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z">
                            </path>
                        </svg>
                    </span>
                </Space>
            }
        >
            <ListBranch branch={branch} setBranch={setBranch} />
            <ButtonDiv className='btn-section'>
                <Button selected={!!branch} className="next-btn" onClick={() => route.push("/booking/time")}>Next</Button>
            </ButtonDiv>
        </Drawer>
    );
};

export default DrawerBranch;