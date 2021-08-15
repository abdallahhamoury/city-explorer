import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityD: {},
      searchCity: '',
      dataShwo: false
    }
  }

  getLocation = async (event) => {
    event.preventDefault();

    await this.setState({
      searchCity: event.target.city.value
    })

    let iqURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchCity}&format=json`;

    let dataFromRequest = await axios.get(iqURL)

    this.setState({
      cityD: dataFromRequest.data[0],
      dataShwo: true
    })
  }

  render() {
    return (
      <div>
        <>
          <h2 style={{ color: "#FF605F" }} >City Explorer</h2>
          {/* <button onClick={this.getLocation}>Get Amman location</button> */}
          <form onSubmit={this.getLocation}>
            <input type='text' placeholder='Enter city' name='city' required />
            <button style={{ backgroundColor: "#FF605F", border: "#FFFFF" }} >submit</button>
          </form>

          {this.state.dataShwo &&
           <div>
           <p>{this.state.searchCity} Lat:{this.state.cityD.lat} /Lon:{this.state.cityD.lon} </p> 

           <img alt="city" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityD.lat},${this.state.cityD.lon}&zoom=12`} />
           </div>
          
          }
          

          
        </>
      </div>
    )
  }
}

export default App;