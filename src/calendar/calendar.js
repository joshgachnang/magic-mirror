import * as Sentry from "@sentry/browser";
import * as moment from "moment";
import React, { Component } from "react";
import { getApiUrl } from "../utils";
import "./calendar.css";

export class Calendar extends Component {
  state = { events: [] };

  componentDidMount() {
    this.updateSchedule();
    setInterval(this.updateSchedule, 15 * 1000);
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }

  updateSchedule = async () => {
    let body;
    try {
      let res = await fetch(getApiUrl("calendars"));
      body = await res.json();
    } catch (e) {
      console.warn("Failed to update schedule", e);
      return;
    }
    this.setState({ events: body.events });
  };

  renderEvent(event) {
    return (
      <div className="event" key={event.id}>
        <div className="time">
          {moment(event.start.dateTime).format("HH:mm")}
        </div>
        <div className="description">{event.summary}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="calendar">
        {this.state.events && this.state.events.map(this.renderEvent)}
      </div>
    );
  }
}
