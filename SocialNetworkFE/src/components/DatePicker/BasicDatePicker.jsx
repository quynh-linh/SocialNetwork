import { useState } from 'react';
import Calendar from 'react-calendar';
import { convertDate } from '~/const/convertDate';

function BasicDatePicker({valueDate=undefined}) {
    const [valueDayCalendar,setValueDayCalendar] = useState('');
    const handleOnChangeValueCalendar = (value,e) =>{
        setValueDayCalendar(value);
        valueDate(convertDate(value));
    };  
    return (
        <div>
            <Calendar onChange={(value,e) => handleOnChangeValueCalendar(value,e)} value={valueDayCalendar} />
        </div>
    );
}
export default BasicDatePicker;