import { List, Typography } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'


const BranchItem = styled.div`
align-items: start;
text-align: start;
padding: 10px 0px;
border: 1px solid #d9d9d9;
cursor: pointer;
&:hover {
    background-color: #f5f5f5;
}
&.selected {
    background-color: #e6f7ff;
}
`

const dataSource = [
    'Centralworld',
    'Siam Paragon',
    'Terminal 21',
    'MBK Center',
    'Emporium',
    'Icon Siam',
    'Platinum Fashion Mall',
    'Union Mall',
    'Central Plaza Ladprao',
    'Central Festival Eastville'
]
const ListBranch = ({
    setBranch,
    branch
}: {
    setBranch: React.Dispatch<React.SetStateAction<string>>;
    branch: string;
}) => {
    return (
        <List
            dataSource={dataSource}
            renderItem={(item) => (
                <BranchItem className={`branch-item ${item === branch ? "selected" : ""}`} onClick={() => setBranch(item)}>
                    <span>{item}</span>
                </BranchItem>
            )}
        />
    )
}

export default ListBranch