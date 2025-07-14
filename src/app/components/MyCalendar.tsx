import * as React from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

export default function MyCalendar({
    value,
    onChange,
}: {
    value: Date;
    onChange: (date: Date) => void;
}) {
    const [mounted,setMounted] = React.useState<boolean>(false);

   

     React.useEffect(() => {
        setMounted(true);
    },[])
     if(!mounted) return null;
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={value}
                onChange={(newValue) => {
                    if (newValue) onChange(newValue);
                }}
                minDate={new Date(dayjs().add(1,"days").toDate())}
                maxDate={new Date(dayjs().add(1,"days").toDate())}
                disableHighlightToday
                disablePast
                // disableFuture
                slots={{
                    toolbar: () => null,
                    leftArrowIcon: () => null,
                    rightArrowIcon: () => null,
                }}
                slotProps={{
                    actionBar: { actions: [] },
                }}
                showDaysOutsideCurrentMonth={false}
            />
        </LocalizationProvider>
    );
}
