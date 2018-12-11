import React, { Component } from "react";
import * as moment from "moment";
import { getApiUrl } from "../utils";
import "./calendar.css";
import * as Sentry from "@sentry/browser";

export class Calendar extends Component {
  state = { events: [] };

  updateSchedule = async () => {
    let body;
    try {
      let res = await fetch(getApiUrl("calendars"));
      body = await res.json();
    } catch (e) {
      Sentry.captureException(e);
      console.error(e);
      return;
    }
    this.setState({ events: body.events });
  };

  componentDidMount() {
    this.updateSchedule();
    setInterval(this.updateSchedule, 15 * 1000);
  }

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
      <div className="calendar">{this.state.events.map(this.renderEvent)}</div>
    );
  }
}
