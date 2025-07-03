import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import SelectDateTime from './SelectDateTime';
import ConfirmBooking from './ConfirmBooking';

const steps = [
    {
        title: 'First',
        content: (next:() => void) => <SelectDateTime  next={next}/>,
    },
    {
        title: 'Second',
        content:  (next:() => void) => <ConfirmBooking />,
    }
];

const StepPage: React.FC = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setTimeout(() => {
            setCurrent(current + 1);
        },2*1000)
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {

        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <div style={contentStyle}>{steps[current].content(next)}</div>
        </>
    );
};

export default StepPage;