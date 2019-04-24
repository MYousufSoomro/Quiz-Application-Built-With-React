import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isGetStarted: false,
      quizData: {},
      currentQuest: 0,
      isNextQuest: true,
      isResultBtn: false,
      optionStatus: false,
      showResult: false,
      score: 0,
      flag: "",
      checkedStatus_1: false,
      checkedStatus_2: false,
      checkedStatus_3: false,
      checkedStatus_4: false
    };

    this.nextQuest = this.nextQuest.bind(this);
    this.showResult = this.showResult.bind(this);
    this.restart = this.restart.bind(this);
    this.convertUnicode = this.convertUnicode.bind(this);
  }

  quizApi() {
    fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    )
      .then(response => response.json())
      .then(json => this.setState({ quizData: json }));
  }

  componentDidMount() {
    this.quizApi();
  }

  nextQuest() {
    const { currentQuest } = this.state;
    if (currentQuest < 8) {
      this.setState({
        currentQuest: currentQuest + 1,
        optionStatus: false,
        checkedStatus_1: false,
        checkedStatus_2: false,
        checkedStatus_3: false,
        checkedStatus_4: false
      });
    } else if (currentQuest === 8) {
      this.setState({
        currentQuest: currentQuest + 1,
        optionStatus: false,
        isNextQuest: false,
        isResultBtn: true,
        checkedStatus_1: false,
        checkedStatus_2: false,
        checkedStatus_3: false,
        checkedStatus_4: false
      });
    }
  }

  showResult() {
    this.setState({ showResult: true });
  }

  checkhere(e, checkedStatus) {
    const { score } = this.state;

    if (e.target.value === "correct") {
      this.setState({ score: score + 10 });
    }

    if (checkedStatus === "checkedStatus_1") {
      this.setState({ checkedStatus_1: true });
    } else if (checkedStatus === "checkedStatus_2") {
      this.setState({ checkedStatus_2: true });
    } else if (checkedStatus === "checkedStatus_3") {
      this.setState({ checkedStatus_3: true });
    } else if (checkedStatus === "checkedStatus_4") {
      this.setState({ checkedStatus_4: true });
    }
  }

  restart() {
    this.quizApi();
    this.setState({
      currentQuest: 0,
      showResult: false,
      isGetStarted: false,
      isNextQuest: true,
      score: 0,
      checkedStatus_1: false,
      checkedStatus_2: false,
      checkedStatus_3: false,
      checkedStatus_4: false
    });
  }

  convertUnicode(input) {
    console.log("input--->>>>>>>>", input);
    // return input.replace(/\\u(\w{4,4})/g, function(a, b) {
    //   var charcode = parseInt(b, 16);
    //   return String.fromCharCode(charcode);
    // });
  }

  render() {
    const {
      isGetStarted,
      quizData,
      currentQuest,
      isNextQuest,
      isResultBtn,
      showResult,
      optionStatus,
      score,
      checkedStatus_1,
      checkedStatus_2,
      checkedStatus_3,
      checkedStatus_4
    } = this.state;

    const entities = {
      "&#039;": "'",
      "&quot;": '"',
      "&ntilde;": "ñ",
      "&eacute;": "é",
      "&amp;": "&",
      "&uuml;": "ü"
    };

    return (
      <div className="App">
        {!isGetStarted && (
          <button
            className="button"
            onClick={() => {
              this.setState({ isGetStarted: true });
            }}
          >
            Get Started
          </button>
        )}
        {isGetStarted && !showResult && (
          <div>
            <h3>
              Q{currentQuest + 1}: {quizData.results[currentQuest].question.replace(/&#?\w+;/g, match => entities[match])}
            </h3>
            <label className="container">
              {quizData.results[currentQuest].correct_answer.replace(/&#?\w+;/g, match => entities[match])}
              <input
                disabled={optionStatus ? "disabled" : ""}
                checked={checkedStatus_1}
                type="radio"
                name={"quiz" + currentQuest}
                value="correct"
                onChange={e => {
                  this.checkhere(e, "checkedStatus_1");
                }}
              />
              <span className="checkmark" />
            </label>

            <label className="container">
              {quizData.results[currentQuest].incorrect_answers[0].replace(/&#?\w+;/g, match => entities[match])}
              <input
                disabled={optionStatus ? "disabled" : ""}
                checked={checkedStatus_2}
                type="radio"
                name={"quiz" + currentQuest}
                value="incorrect"
                onChange={e => {
                  this.checkhere(e, "checkedStatus_2");
                }}
              />
              <span className="checkmark" />
            </label>

            <label className="container">
              {quizData.results[currentQuest].incorrect_answers[1].replace(/&#?\w+;/g, match => entities[match])}
              <input
                disabled={optionStatus ? "disabled" : ""}
                checked={checkedStatus_3}
                type="radio"
                name={"quiz" + currentQuest}
                value="incorrect"
                onChange={e => {
                  this.checkhere(e, "checkedStatus_3");
                }}
              />
              <span className="checkmark" />
            </label>

            <label className="container">
              {quizData.results[currentQuest].incorrect_answers[2].replace(/&#?\w+;/g, match => entities[match])}
              <input
                disabled={optionStatus ? "disabled" : ""}
                checked={checkedStatus_4}
                type="radio"
                name={"quiz" + currentQuest}
                value="incorrect"
                onChange={e => {
                  this.checkhere(e, "checkedStatus_4");
                }}
              />
              <span className="checkmark" />
            </label>

            {isNextQuest && (
              <button className="button" onClick={this.nextQuest}>
                Next
              </button>
            )}
            {!isNextQuest && isResultBtn && (
              <button className="button" onClick={this.showResult}>
                Show Result
              </button>
            )}
          </div>
        )}

        {showResult && (
          <div>
            <h1>Your Score is {score}%</h1>
            <button className="button" onClick={this.restart}>
              Restart this Quiz
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
