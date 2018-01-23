import React, { Component } from "react";
import * as moment from "moment";
import "./forecastio.css";
import "./weather-icons.min.css";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export class Forecast extends Component {
  constructor() {
    super();
    this.state = { forecast: {} };
    setInterval(() => this.updateForecast.bind(this), 15000);
  }

  async updateForecast() {
    let res = await fetch(this.props.apiUrl + "forecastio");
    let body = await res.json();
    this.setState({ forecast: body });
  }

  componentDidMount() {
    this.updateForecast();
  }

  getWeatherIcon(weather, time) {
    let iconName;
    if (time && time.month() === 3 && time.date() === 1) {
      iconName = pickRandom([
        "meteor",
        "volcano",
        "alien",
        "earthquake",
        "hurricane",
        "tsunami"
      ]);
    } else {
      iconName = `wi-forecast-io-${weather}`;
    }
    return <i className={`wi ${iconName}`} />;
  }

  renderCurrently(currently, summary) {
    return (
      <div>
        <div className="today">
          {Math.floor(currently.temperature)}°
          {this.getWeatherIcon(currently.icon)}
        </div>
        <div className="summary">{summary}</div>
      </div>
    );
  }

  renderFuture(dailies) {
    if (!dailies) {
      return null;
    }
    return dailies
      .map((day, i) => {
        if (i < 5) {
          return this.renderDay(day);
        }
        return null;
      })
      .filter(d => d);
  }
  renderDay(day) {
    return (
      <div className="future" key={day.time}>
        <div className="date">{moment.unix(day.time).format("ddd")}</div>
        <div className="high">
          {this.getWeatherIcon(day.icon)}
          {Math.floor(day.temperatureMax)} / {Math.floor(day.temperatureMin)}
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.forecast.currently) {
      return null;
    }
    return (
      <div className="forecast">
        {this.renderCurrently(
          this.state.forecast.currently,
          this.state.forecast.daily.summary
        )}
        {this.renderFuture(this.state.forecast.daily.data)}
      </div>
    );
  }
}
