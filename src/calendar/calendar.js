import React, { Component } from "react";
import * as moment from "moment";
import { getApiUrl } from "../utils";
import "./calendar.css";

export class Calendar extends Component {
  state = { events: [] };

  updateSchedule = async () => {
    let res = await fetch(getApiUrl("calendars"));
    let body = await res.json();
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
