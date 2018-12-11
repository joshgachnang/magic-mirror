import React, { Component } from "react";
import { getApiUrl } from "../utils";
import * as Sentry from "@sentry/browser";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export class GooglePhotos extends Component {
  state = { photo: [] };

  updatePhoto = async () => {
    let body;
    try {
      let res = await fetch(getApiUrl("google/randomPhoto"));
      body = await res.json();
    } catch (e) {
      Sentry.captureException(e);
      console.error(e);
      return;
    }
    this.setState({ photo: body.photo });
  };

  componentDidMount() {
    this.updatePhoto();
    setInterval(this.updatePhoto, 5 * 60 * 1000);
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
        <img src={this.state.photo} />
      </div>
    );
  }
}
