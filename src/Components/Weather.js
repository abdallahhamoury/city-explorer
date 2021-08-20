import React from 'react'
import WeatherForDay from './WeatherForDay'
export class Weather extends React.Component {
    render() {
        return (
            <div className="weather">
               <WeatherForDay Date={this.props.Date} description={this.props.description} />
            </div>
        )
    }
}
export default Weather