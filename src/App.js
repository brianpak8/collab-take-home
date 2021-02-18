import React, { Component } from 'react';
import './App.css';
import Form from './components/Form.js'
import Output from './components/Output.js'
import Header from './components/Header.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: []
    }
  }
  renderOutput = (outputArray) => {
    this.setState({
      output: outputArray
    })
  }
  clearOutput = () => {
    this.setState({
      output: []
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
          <Form renderOutput={this.renderOutput}
                clearOutput={this.clearOutput}/>
          {
            (this.state.output.length > 0) ? <div>Here is a list of emails where there is a discrepancy.</div> : null
          }
          <Output output={this.state.output}/>
        </div>
      );
    }
}

export default App;
