import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QuizMakerInputField from "../../components/quizMakerInputField/QuizMakerInputField";
import { Field, reduxForm } from "redux-form";
import Select from "react-select";

class QuizMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerCounter: 0,
      answers: [],
      questions: []
    };
  }

  addAnswer = () => {
    this.setState(state => ({
      answers: [...state.answers].concat(
        <Field
          name={"answer-" + state.answerCounter}
          type="text"
          component={QuizMakerInputField}
          label={"Answer " + (state.answerCounter + 1)}
          key={state.answerCounter}
          id={state.answerCounter}
        />
      ),
      answerCounter: state.answerCounter + 1
    }));
  };

  addQuestion = () => {
    this.setState(state => {
      return {
        answers: [...state.answers].concat(
          <Field
            name={"answer-" + state.answerCounter}
            type="text"
            component={QuizMakerInputField}
            label={"Answer " + (state.answerCounter + 1)}
            key={state.answerCounter}
            id={state.answerCounter}
          />
        ),
        answerCounter: state.answerCounter + 1
      };
    });
  };

  setCorrectAnswer = (index) => {
    this.setState(({ correctAnswer: index }))
  }


  render() {
    const { handleSubmit, isSubmitting } = this.props;
    console.log("correct answer", this.state);
    return (
      <div className="quizMakerContainer">
        <h2>Quiz Maker</h2>
        <form onSubmit={this.handleSubmit}>
          {/* TODO: Extract to component? A question component mebe */}
          <Field
            name="question"
            type="text"
            component={QuizMakerInputField}
            label="Question"
          />

          <div className="quizMakerQuestionContainer">
            {this.state.answers.map(answer => {
              return answer;
            })}
          </div>

          <label>Correct answer</label>
          <Select
            onChange={(e) => this.setCorrectAnswer(e.value)}
            className="selectAnswer"
            options={this.props.answersWithId.map(answer => {
              console.log("id", answer.id);
              return {
                value: answer.id,
                label: answer.answer
              };
            })}
          />
          {this.state.answers.length < 10 &&
            this.props.answers.length === this.state.answerCounter && (
              <div className="addItemQuizButtonContainer">
                <button type="button" onClick={() => this.addAnswer()}>
                  Add answer
                </button>
                <button type="button">Add question</button>
              </div>
            )}
          {this.props.answers.length === this.state.answerCounter && (
            <div className="createQuizButtonContainer">
              <button type="submit" disabled={isSubmitting}>
                Finish Quiz
              </button>
            </div>
          )}

          {this.props.answers.length !== this.state.answerCounter && (
            <div>
              <p className="questionError">You need to fill in all answers</p>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const getAnswerInformation = answerName => {
  return answerName.split("-");
};

const mapStateToProps = state => {
  let answersWithId = [];
  let answerValues = [];

  if (state.form.quizMaker && state.form.quizMaker.values) {
    Object.entries(state.form.quizMaker.values)
      .sort()
      .map(answer => {
        const answerInfo = getAnswerInformation(answer[0]);
        if (answerInfo[0] === "answer") {
          answersWithId.push({ id: answerInfo[1], answer: answer[1] });
          answerValues.push(answer[1]);
        }
      });
  }

  return {
    answers: answerValues,
    answersWithId: answersWithId,
    createdQuestions: state.form.quizMaker
      ? Object.keys(state.form.quizMaker.registeredFields).length - 1
      : -1
  };
};

export default reduxForm({
  form: "quizMaker"
})(
  connect(
    mapStateToProps,
    {
      //TODO: add the async shit here
    }
  )(withRouter(QuizMaker))
);
