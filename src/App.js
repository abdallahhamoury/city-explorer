import React from 'react';
import axios from 'axios';
import Weather from './Components/Weather'
import Movie from './Components/Movie'
import './App.css';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityD: {},
      searchCity: '',
      dataShwo: false,
      cityW: [],
      showWeData: false,
      cityMo:[],
      showMOData:false,
    }
  }

  getLocation = async (event) => {
    event.preventDefault();

    await this.setState({
      searchCity: event.target.city.value
    })

    let iqURL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchCity}&format=json`;

    let dataFromRequest = await axios.get(iqURL)

    await this.setState({
      cityD: dataFromRequest.data[0],
      dataShwo: true,
    });
// ***************************************************************************************weather
    try {
      let weatherUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?lat=${this.state.cityD.lat}&lon=${this.state.cityD.lon}`

      let dataweather = await axios.get(weatherUrl)
      console.log(dataweather.data);
      await this.setState({
        cityW: dataweather.data,
        showWeData: true,
      });
    }
    catch (error) {
      console.log("error")
      await this.setState({
        showWeData: false,
      })
    }
    // ***************************************************************************************movies
    try {
      let movierUrl = `${process.env.REACT_APP_SERVER_LINK}/movies?cityName=${this.state.searchCity}`

      let datamovies = await axios.get(movierUrl)
      console.log(datamovies.data);
      await this.setState({
        cityMo: datamovies.data,
        showMOData: true,
      });
    }
    catch (error) {
      console.log("error")
      await this.setState({
        showMOData: false,
      })
    }
  
  }


  render() {
    return (
      <>
      <div>
      
          <h2 style={{ color: "#FF605F" }} >City Explorer</h2>
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
            { this.state.showWeData  && this.state.cityW.map((item, indx) => {
        return (<Weather  key={indx} Date={item.valid_date} description={item.description} />);
      })
      }
      </div>
      <div>
      { this.state.showWeData  && this.state.cityMo.map((movie,indx) => {
        return (<Movie key={indx} avgVote={movie.avgVote} overview={movie.overview} date={movie.date} src={movie.src} title={movie.title}  vote={movie.vote} />);})
      }
        
        
      </div>
     
  </>
    )
  }
}

export default App;