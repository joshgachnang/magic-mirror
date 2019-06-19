import * as Sentry from "@sentry/browser";
import React, { Component } from "react";
import { getApiUrl } from "../utils";

// function pickRandom(list) {
//   return list[Math.floor(Math.random() * list.length)];
// }

export class GooglePhotos extends Component {
  state = { photo: [] };

  updatePhoto = async () => {
    let body;
    try {
      let res = await fetch(getApiUrl("google/randomPhoto"));
      body = await res.json();
    } catch (e) {
      console.warn("Failed to update photos", e);
      return;
    }
    this.setState({ photo: body.photo });
  };

  componentDidMount() {
    this.updatePhoto();
    setInterval(this.updatePhoto, 5 * 60 * 1000);
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (!this.state.photo) {
      return null;
    }
    return (
      <div
        style={{
          maxWidth: "50%",
          maxHeight: "50%"
        }}
      >
        {this.state.photo && <img src={this.state.photo} />}
      </div>
    );
  }
}
