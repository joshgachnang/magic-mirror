import * as Sentry from "@sentry/browser";
import * as moment from "moment";
import React, { Component } from "react";
import "./clock.css";

export class Clock extends Component {
  constructor() {
    super();
    this.state = { start: new Date(), time: new Date() };
    setInterval(() => this.setTime(), 1000);
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }

  // TODO: account for skew using this.state.start
  setTime() {
    this.setState({ time: new Date() });
  }

  render() {
    return (
      <div className="clock">
        <div className="time">{moment(this.state.time).format("HH:mm")}</div>
        <div className="date">
          {moment(this.state.time).format("ddd, MM/DD")}
        </div>
      </div>
    );
  }
}
