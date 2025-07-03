import MyCalendar from '@/app/components/MyCalendar';
import { Button as ButtonCus } from '@/app/styles-component/Button';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const times = [
  '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
];

const SelectDateTime = ({
    next
}:{
    next:() => void
}) => {
  const [today, setToday] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);


  return (
    <div>
        <MyCalendar
          value={date!}
          onChange={(newValue) => setDate(newValue)}
        />
      {!!date && (
        <>
          <Flex>
            <div className='timeSession' style={{ maxWidth: '300px' }}>
              <div className="times paddingBottom">
                {times.map((t) => (
                  <Button
                    key={t}
                    className={`timeButtons ${t === time ? 'activeTime' : ''}`}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </Flex>
          <div className='buttonSection datePicketButSection'>
            <ButtonCus selected={!!date && !!time} onClick={next} className='Next center-text-btn'>
              Confirm
            </ButtonCus>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectDateTime;
