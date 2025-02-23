import React, { Component } from "react";
import * as d3 from "d3";
import Child1 from "./Child1";
import Child2 from "./Child2";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    d3.csv("/tips.csv").then((parsedData) => {
      this.setState({ data: parsedData });
    });
  }

  render() {
    return (
      <div className="charts">
        <Child1 data={this.state.data} />
        <Child2 data={this.state.data} />
      </div>
    );
  }
}

export default App;
