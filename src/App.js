import './App.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [weather, setWeather] = useState(null)
  const [temperature, setTemperature] = useState("")
  const [tempUnit, setTempUnit] = useState("")

  useEffect(() => {
      const handleError = () => {
          console.log("No se ha podido acceder a la ubicación")
      }
      
      const success = (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          const api = '6902b2cac59a6522b99b15d194cf04f2'
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`)
              .then(res => {
                setWeather(res.data)
                console.log(res.data)
                const celsius = (res.data.main.temp - 273.15).toFixed(2)
                setTemperature(celsius)
                setTempUnit("°C")
              })
  
      }
  
      navigator.geolocation.getCurrentPosition(success, handleError)

  },[])

  const changeTemperature = () => {
    if(tempUnit === '°C'){
        setTemperature(((temperature*1.8)+32).toFixed(2))
        setTempUnit("°F")
    }else{
      setTemperature(((temperature -  32)/1.8).toFixed(2))
      setTempUnit("°C")
    }
  }
    
  return (
    <div className="App">
      <div className='weather-wrapper'>
        {weather &&
          <div className='container'>
            <h2>Weather App</h2>
            <div>{weather.name}, {weather.sys.country}</div>
            <div className='weather-container-info'>
              <div className='weather-icon-container'>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''/>
                <div className='weather-celsius-degrees'>{temperature}{tempUnit}</div>
              </div>
              <div className='weather-information'>
                <div>{weather.weather[0].description}</div>
                <div className='information'><i className="bi bi-wind"></i><b>Wind Speed: </b>{weather.wind.speed} m/s</div>
                <div className='information'><i className="bi bi-cloud-fill"></i><b>Clouds: </b>{weather.clouds.all}%</div>
                <div className='information'><i className="bi bi-thermometer"></i><b>Pressure: </b>{weather.main.pressure/10} mb</div>
              </div>
            </div>
          
            <button className='weather-btn' onClick={() => changeTemperature()}>Degrees °F/°C</button>
          </div>
          
        }
      </div>

    </div>
  );
}

export default App;
