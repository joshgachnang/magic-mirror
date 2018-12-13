import React, { Component } from "react";
import "./App.css";
import * as Sentry from "@sentry/browser";
import { Clock } from "./clock/clock";
import { Quote } from "./quote/quote";
import { CTA } from "./cta/cta";
import { Forecast } from "./forecastio/forecastio";
import { Calendar } from "./calendar/calendar";
import { getApiUrl } from "./utils";
import { Updater } from "./updater/updater";
import { GooglePhotos } from "./googlePhotos/googlePhotos";

const defaultLayout = {
  topLeft: ["Clock", "Quote"],
  topRight: ["Forecast"],
  // bottomLeft: ["CTA"],
  bottomLeft: ["GooglePhotos"],
  bottomRight: ["Calendar"]
};

const Components = {
  Clock,
  CTA,
  Calendar,
  Quote,
  Forecast,
  GooglePhotos
};

Sentry.init({
  dsn: "https://4d099a17ced34c88b1211aa0017acdbf@sentry.io/1341580"
});

class App extends Component {
  state = { layout: {} };

  componentDidMount() {
    this.updateLayout();
    setInterval(this.updateLayout, 60 * 1000);
  }

  updateLayout = async () => {
    let layout;
    let apiUrl = getApiUrl("mirror/layout");
    if (window.location.search) {
      apiUrl += `${window.location.search}`;
    }
    try {
      let resp = await fetch(apiUrl);
      let body = await resp.json();
      layout = body.layout;
      console.info("Using layout from server:", layout);
    } catch (e) {
      layout = defaultLayout;
      console.warn("Could not fetch layout from server, using default:", e);
      console.info("Using default layout", layout);
    }
    this.setState({ layout });
  };

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
        <Updater />
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
