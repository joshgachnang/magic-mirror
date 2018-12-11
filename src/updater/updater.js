// Fetch the latest mirror.nang.io webpage occasionally and if it's different, update.

import React, { Component } from "react";
import * as Sentry from "@sentry/browser";

export class Updater extends Component {
  state = { etag: "" };

  checkForUpdate = async () => {
    const hostname = window.location.hostname;
    console.log("HOSTNAME", hostname);

    if (hostname === "localhost") {
      console.log("HOST");
      return;
    }

    let res;
    try {
      res = await fetch(`https://${hostname}`);
    } catch (e) {
      Sentry.captureException(e);
      console.error(e);
      return;
    }
    let etag = res.headers.etag;
    if (this.state.etag !== "" && this.state.etag !== etag) {
      // New version! Update!
      window.location.reload(true);
    } else {
      this.setState({ etag });
    }
  };

  componentDidMount() {
    setInterval(this.checkForUpdate, 5 * 1000);
  }

  render() {
    return <div className="quote">{this.state.quote}</div>;
  }
}
