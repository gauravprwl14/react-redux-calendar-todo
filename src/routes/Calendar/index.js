import React from 'react'
import Grid from './Grid'

class Calendar extends React.Component {
    render() {
        return (
            <div> 
                <Grid noOfCol={31}/>
            </div>
        )
    }
}

export default Calendar
