import React, {useState} from 'react';

import {useForm, Controller } from 'react-hook-form';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import moment from 'moment';

const test = () => {
    const [ cA, setcA] = useState(moment())
    const [focus, setFocus] = useState(null);
    console.log(focus)
    const {register, handleSubmit,control, errors, reset} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const formData = (data) => {
        console.log(cA.toString(), data)
    }

    // const onDChange = (createdAt) =>{
    //     setcA(() => ({createdAt}))
    // }
    return(
        
        <div>

        <h4>Testing</h4>

        <form action="" onSubmit={handleSubmit(formData)}>
       <section>
        
       <SingleDatePicker
             date={cA}// momentPropTypes.momentObj or null
             onDateChange={date => {return (
                // setcA(moment(date))
                // console.log(date.toString())
                setcA(date)
            )}} // PropTypes.func.isRequired
            focused={focus} // PropTypes.bool
            onFocusChange={ c => setFocus(c.focused)} // PropTypes.func.isRequired
            id="dates" // PropTypes.string.isRequired,
            />
        

       </section>
      
        <button type="submit">submit</button>
        </form>

        </div>
    )
}

export default test;