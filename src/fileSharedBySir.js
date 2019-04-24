import React, { Component } from 'react';
import logo from './logo.svg';
import Quiz from './component/Quiz';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      dta: []
    }

  }

  componentDidMount() {
    var { head,dta } = this.state
    fetch('https://opentdb.com/api.php?amount=10')
      .then((resp) => resp.json()) // Transform the data into json
      .then((data) => {
        
        this.setState({dta: data.results})
        console.log(dta)
      })     
  }

start(){
  this.setState({ start: true })
  console.log(this.state.dta)
}

  render() {
    var { start, dta } = this.state
    console.log(dta[0])
    return (
      <div className="App">
        <header className="App-header">
          {!start && <button onClick={() => this.start()}>Start Quiz</button>}
          {dta.length && start && <Quiz data={dta[0].question}/>}
        </header>
      </div>
    );
  }
}

export default App;