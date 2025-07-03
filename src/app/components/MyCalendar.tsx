import * as React from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
                minDate={new Date()}
                maxDate={new Date()}
                disableHighlightToday
                disablePast
                disableFuture
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
