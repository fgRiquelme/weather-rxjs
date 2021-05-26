import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import {
  sendSearch,
  receiveApiData,
  receiveApiError,
  completeApiData,
} from "../actions";
import { fromFetch } from "rxjs/fetch";
import { of, timer } from "rxjs";
import url from "../api";
import { switchMap, catchError } from "rxjs/operators";

function Weather(props) {
  const dispatch = useDispatch();
  //{ sendSearch, receiveApiData, receiveApiError, completeApiData }

  const [location, setLocation] = useState({
    city: "",
  });
  function handleClick(event, data) {
    event.preventDefault();
    dispatch(sendSearch(data));
  }

  useEffect(() => {
    const city = props.city.cityName;
    const link = url(city);
    const data$ = fromFetch(link).pipe(
      switchMap((response) => {
        if (response.ok) {
          return response.json();
        }

        return of({
          error: true,
          message: "Error: " + response.status,
        });
      }),
      catchError((err) => {
        console.error(err);
        return of({ error: true, message: err.message });
      })
    );

    const suscription = data$.subscribe({
      next: (result) => dispatch(receiveApiData(result)),
      complete: () => dispatch(completeApiData()),
      error: (error) => dispatch(receiveApiError(error)),
    });
    return () => {
      suscription.unsubscribe();
    };
  }, [props.city.cityName]);
  if (props.state.complete) {
    console.log("completed");
    return (
      <div className="middle aligned column">
        <h3 className="ui center aligned header">
          <b>Weather in {props.city.cityName}</b>
        </h3>
        <form className="ui form">
          <div className="field">
            <label>City:</label>
            <input
              value={location.city}
              placeholder="Enter the name of a city to search"
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
            />
            <button
              className="ui primary button"
              onClick={(e) => handleClick(e, location)}
            >
              Search
            </button>
          </div>
          <div className="field">
            <label>City:</label>
            <input value={props.city.cityName} readOnly="true" />
          </div>
          <div className="field">
            <label>Country code:</label>
            <input value={props.sys.country} readOnly="true" />
          </div>
          <div className="field">
            <label>Coordinates:</label>
            <ul>
              <li>Longitude: {props.coordinates.longitude}</li>
              <li>Latitude: {props.coordinates.latitude}</li>
            </ul>
          </div>
          <div className="field">
            <label>Weather:</label>
            <ul>
              <li>Weather condition: {props.weather.main}</li>
              <li>Description: {props.weather.description}</li>
              <li>
                <img src={props.weather.icon} alt="Icon" />
              </li>
            </ul>
          </div>
          <div className="field">
            <label>Temperatures:</label>
            <ul>
              <li>Temperature: {props.main.temperature} °C</li>
              <li>Feels like: {props.main.feelsLike} °C</li>
              <li>Min. Temperature: {props.main.minTemperature} °C</li>
              <li>Max. Temperature: {props.main.maxTemperature} °C</li>
              <li>Humidity: {props.main.humidity} %</li>
            </ul>
          </div>
          <div className="field">
            <label>Wind:</label>
            <ul>
              <li>Speed: {props.wind.speed} m/s</li>
              <li>Wind direction: {props.wind.degree}°</li>
            </ul>
          </div>
          <div className="field">
            <label>Cloudiness in percentage:</label>
            <input value={props.clouds.clouds} readOnly="true" />
          </div>
          <div className="field">
            <label>Time Zone:</label>
            <input value={props.timezone.time} readOnly="true" />
          </div>
          <div className="field">
            <label>Real Name:</label>
            <input value={props.realName.nameFromJson} readOnly="true" />
          </div>
        </form>
      </div>
    );
  } else if (props.state.loading) {
    console.log("loading");
    return (
      <div>
        <h3 className="ui center aligned header">Cargando</h3>
      </div>
    );
  } else if (props.state.error) {
    console.log("error");
    return (
      <div>
        <h3 className="ui center aligned header">{props.message}</h3>
      </div>
    );
  } else {
    console.log("else");
    return (
      <div className="middle aligned column">
        <h3 className="ui center aligned header">
          <b>City Not Found</b>
        </h3>
        <form className="ui form">
          <div className="field">
            <label>City:</label>
            <input
              value={location.city}
              placehulder="Enter a name of a city to search"
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
            />
            <button
              className="ui primary button"
              onClick={(e) => handleClick(e, location)}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  const data = state.data;
  if (isEmpty(data)) {
    return {
      city: {
        cityName: state.search.city.cityName,
      },
      coordinates: {
        longitude: "",
        latitude: "",
      },
      weather: {
        main: "",
        description: "",
        icon: "",
      },
      main: {
        temperature: "",
        feelsLike: "",
        minTemperature: "",
        maxTemperature: "",
        humidity: "",
      },
      wind: {
        speed: "",
        degree: "",
      },
      clouds: {
        clouds: "",
      },
      sys: {
        country: "",
      },
      timezone: {
        time: "",
      },
      realName: {
        nameFromJson: "",
      },
    };
  } else if (
    state.data.state.loading ||
    state.data.state.complete ||
    state.data.state.error
  ) {
    return {
      message: state.data.message,
      state: {
        loading: state.data.state.loading,
        complete: state.data.state.complete,
        error: state.data.state.error,
      },
      city: {
        cityName: state.search.city.cityName,
      },
      coordinates: {
        longitude: state.data.data.coord.lon,
        latitude: state.data.data.coord.lat,
      },
      weather: {
        main: state.data.data.weather[0].main,
        description: state.data.data.weather[0].description,
        icon:
          "http://openweathermap.org/img/wn/" +
          state.data.data.weather[0].icon +
          "@2x.png",
      },
      main: {
        temperature: state.data.data.main.temp,
        feelsLike: state.data.data.main.feels_like,
        minTemperature: state.data.data.main.temp_min,
        maxTemperature: state.data.data.main.temp_max,
        humidity: state.data.data.main.humidity,
      },
      wind: {
        speed: state.data.data.wind.speed,
        degree: state.data.data.wind.deg,
      },
      clouds: {
        clouds: state.data.data.clouds.all,
      },
      sys: {
        country: state.data.data.sys.country,
      },
      timezone: {
        time: state.data.data.timezone,
      },
      realName: {
        nameFromJson: state.data.data.name,
      },
    };
  } else {
    return {
      state: {
        loading: false,
        complete: false,
        error: false,
      },
      city: {
        cityName: state.search.city.cityName,
      },
      coordinates: {
        longitude: "",
        latitude: "",
      },
      weather: {
        main: "",
        description: "",
        icon: "",
      },
      main: {
        temperature: "",
        feelsLike: "",
        minTemperature: "",
        maxTemperature: "",
        humidity: "",
      },
      wind: {
        speed: "",
        degree: "",
      },
      clouds: {
        clouds: "",
      },
      sys: {
        country: "",
      },
      timezone: {
        time: "",
      },
      realName: {
        nameFromJson: "",
      },
    };
  }
};

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     { sendSearch, receiveApiData, receiveApiError, completeApiData },
//     dispatch
//   );

function isEmpty(obj) {
  if (obj == null) return true;
  if (obj.lenght === 0) return true;
  if (typeof obj !== "object") return true;
  if (obj.lenght > 0) return false;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

export default connect(mapStateToPros, mapDispatchToProps)(Weather);
