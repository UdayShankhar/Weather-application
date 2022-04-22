import './App.css';
import axios from "axios"
import { useState } from 'react';
import { ImSearch } from "react-icons/im";

function App() {

  const [data, setData] = useState({})
  const [location,setLocation] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`  
  
const searchLocation = () =>{
    axios.get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data);
      }).catch((err)=>{
        console.log(err.message);
      })
}

  return (
    <div className="app">
    <h2 style={{textAlign:'center',fontSize:'26px'}}>React JS Weather application</h2>
      <div className="search">
        <input style={{marginTop:'22px'}}
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter your city name'
          type="text" />
        <button type='button' style={{ marginLeft: '10px', width: '100px', height: '50px', borderRadius: '20px', background: 'rgb(169, 169, 169)',color:'black'}} onClick={searchLocation}>

          <ImSearch style={{width:'100px',height:'20px',cursor:'pointer'}}/>

          </button>
      </div>
      <div className='container' style={{marginTop:'45px'}}>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{((data.main.temp-32)*5/9).toFixed(2)}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
