import { List, Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';


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
`;

const dataSource = [
    "Terminal 21",
    "Central Ladprao",
    "Siam Center",
    "Fashion Island",
    "Centralworld",
    "MEGABANGNA",
    "Siam Square",
    "Emsphere",
    "Central Pattaya",
    "Seacon Square",
    "Central Westgate",
    "Central Chiangmai",
    "Discovery Plaza"
];
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
            style={{
                maxHeight:"400px",
                overflowY:"auto"
            }}
            renderItem={(item) => (
                <BranchItem className={`branch-item ${item === branch ? "selected" : ""}`} onClick={() => setBranch(item)}>
                    <span>{item}</span>
                </BranchItem>
            )}
        />
    );
};

export default ListBranch;