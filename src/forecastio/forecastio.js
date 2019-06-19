import * as Sentry from "@sentry/browser";
import * as moment from "moment";
import React, { Component } from "react";
import { getApiUrl } from "../utils";
import "./forecastio.css";
import "./weather-icons.min.css";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export class Forecast extends Component {
  state = { forecast: {} };

  updateForecast = async () => {
    let body;
    try {
      let res = await fetch(getApiUrl("forecastio"));
      body = await res.json();
    } catch (e) {
      console.warn("Failed to update forecast", e);
      return;
    }
    this.setState({ forecast: body });
  };

  componentDidMount() {
    this.updateForecast();
    setInterval(this.updateForecast, 15 * 1000);
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
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
