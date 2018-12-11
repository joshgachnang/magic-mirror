import React, { Component } from "react";
import { getApiUrl } from "../utils";
import * as Sentry from "@sentry/browser";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export class Quote extends Component {
  state = { quotes: [] };

  updateQuotes = async () => {
    let body;
    try {
      let res = await fetch(getApiUrl("inspirationalQuote"));
      body = await res.json();
    } catch (e) {
      Sentry.captureException(e);
      console.error(e);
      return;
    }
    this.setState({ quotes: body.quotes, quote: pickRandom(body.quotes) });
  };

  componentDidMount() {
    this.updateQuotes();
    setInterval(this.updateQuotes, 15 * 1000);
  }

  render() {
    return <div className="quote">{this.state.quote}</div>;
  }
}
