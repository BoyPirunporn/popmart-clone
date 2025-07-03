import { Button } from '@/app/styles-component/Button';
import { TextField } from '@mui/material';
import { Checkbox, CheckboxProps, Modal } from 'antd';
import React from 'react';

const ConfirmBooking = () => {
    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
     }
    const handleCancel = () => {
        setIsModalOpen(false);
     }
    return (
        <div style={{
            padding: "10px"
        }}>
            <form onSubmit={e => {
                e.preventDefault();
                showModal()
            }}>
                <h3>Confirm booking</h3>
                <div style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <div>
                        Event:
                        Test
                    </div>
                    <div>
                        Event:
                        Test
                    </div>
                    <div>
                        Event:
                        Test
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Checkbox name='acceptTermsAndConditions' onChange={onChange}>ยอมรับเงื่อนไขการใช้งาน</Checkbox>;
                </div>
                <Button selected type='submit' >
                    Confirm Booking
                </Button>
            </form>


            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Booking successfully</p>
            </Modal>
        </div>
    );
};

export default ConfirmBooking;