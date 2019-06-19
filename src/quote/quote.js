import * as Sentry from "@sentry/browser";
import React, { Component } from "react";
import { getApiUrl } from "../utils";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export class Quote extends Component {
  state = { quotes: [] };

  componentDidMount() {
    this.updateQuotes();
    setInterval(this.updateQuotes, 15 * 1000);
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }

  updateQuotes = async () => {
    let body;
    try {
      let res = await fetch(getApiUrl("inspirationalQuote"));
      body = await res.json();
    } catch (e) {
      console.warn("Failed to update quotes", e);
      return;
    }
    this.setState({ quotes: body.quotes, quote: pickRandom(body.quotes) });
  };

  render() {
    return <div className="quote">{this.state.quote}</div>;
  }
}
