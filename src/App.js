import React, { Component } from "react";
import "./App.css";
import { Clock } from "./clock/clock";
import { Quote } from "./quote/quote";
import { CTA } from "./cta/cta";
import { Forecast } from "./forecastio/forecastio";
import { Calendar } from "./calendar/calendar";
import { getApiUrl } from "./utils";

// TODO: fetch from API
const defaultLayout = {
  topLeft: ["Clock", "Quote"],
  topRight: ["Forecast"],
  // bottomLeft: ["CTA"],
  bottomLeft: [],
  bottomRight: ["Calendar"]
};

const Components = {
  Clock,
  CTA,
  Calendar,
  Quote,
  Forecast
};

class App extends Component {
  constructor() {
    super();
    this.state = { layout: {} };
  }

  componentDidMount() {
    this.updateLayout();
    setTimeout(this.updateLayout.bind(this), 60 * 1000);
  }

  async updateLayout() {
    let layout;
    let apiUrl = getApiUrl("mirror/layout");
    if (window.location.search) {
      apiUrl += `${window.location.search}`;
    }
    try {
      let resp = await fetch(apiUrl);
      let body = await resp.json();
      layout = body.layout;
      console.info("[Using layout from server:", layout);
    } catch (e) {
      layout = defaultLayout;
      console.info(
        "Could not fetch layout from server, using default:",
        defaultLayout
      );
    }
    this.setState({ layout });
  }

  renderStringsToComponent(strings) {
    if (!strings) {
      return null;
    }

    let componentList = strings.map(s => {
      let Component = Components[s];
      return <Component key={s} />;
    });
    return <div className="box">{componentList}</div>;
  }

  render() {
    return (
      <div className="App">
        <div className="topLeft">
          {this.renderStringsToComponent(this.state.layout.topLeft)}
        </div>
        <div className="topRight">
          {this.renderStringsToComponent(this.state.layout.topRight)}
        </div>

        <div className="bottomLeft">
          <div className="bottom">
            {this.renderStringsToComponent(this.state.layout.bottomLeft)}
          </div>
        </div>
        <div className="bottomRight">
          <div className="bottom">
            {this.renderStringsToComponent(this.state.layout.bottomRight)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
