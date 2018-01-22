import React, { Component } from "react";
import "./App.css";
import { Clock } from "./clock/clock";
import { Quote } from "./quote/quote";
import { CTA } from "./cta/cta";
import { Forecast } from "./forecastio/forecastio";
import { Calendar } from "./calendar/calendar";

const API_URL = "http://localhost:8080/";

// TODO: fetch from API
const layout = {
  topLeft: ["Clock", "Quote"],
  topRight: ["Forecast"],
  bottomLeft: ["CTA"],
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
  renderStringsToComponent(strings) {
    let componentList = strings.map(s => {
      let Component = Components[s];
      return <Component key={s} apiUrl={API_URL} />;
    });
    return <div className="box">{componentList}</div>;
  }

  render() {
    return (
      <div className="App">
        <div className="topLeft">
          {this.renderStringsToComponent(layout.topLeft)}
        </div>
        <div className="topRight">
          {this.renderStringsToComponent(layout.topRight)}
        </div>

        <div className="bottomLeft">
          <div className="bottom">
            {this.renderStringsToComponent(layout.bottomLeft)}
          </div>
        </div>
        <div className="bottomRight">
          <div className="bottom">
            {this.renderStringsToComponent(layout.bottomRight)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
