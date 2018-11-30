import React, { Component } from "react";
import * as moment from "moment";
import { getApiUrl } from "../utils";
import "./calendar.css";

export class Calendar extends Component {
  constructor() {
    super();
    this.state = { events: [] };
    setInterval(() => this.updateSchedule.bind(this), 15000);
  }

  async updateSchedule() {
    let res = await fetch(getApiUrl("calendars"));
    let body = await res.json();
    this.setState({ events: body.events });
  }

  componentDidMount() {
    this.updateSchedule();
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
