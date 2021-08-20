import React from 'react'
export class WeatherForDay extends React.Component {
    render() {
        return (
            <>
               <p style={{fontSize:"20px" ,fontWeight:"bold"}}> * date : {this.props.Date}</p>
               <p style={{fontSize:"15px" ,fontWeight:"bold"}}> * description: {this.props.description}</p> 
            </>
        )
    }
}
export default WeatherForDay