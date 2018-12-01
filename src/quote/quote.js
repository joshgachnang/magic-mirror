import React, { Component } from "react";
import { getApiUrl } from "../utils";

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export class Quote extends Component {
  state = { quotes: [] };

  updateQuotes = async () => {
    let res = await fetch(getApiUrl("inspirationalQuote"));
    let body = await res.json();
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
