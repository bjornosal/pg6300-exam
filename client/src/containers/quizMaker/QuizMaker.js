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
      answers: []
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

  getAnswerInformation = answerName => {
    return answerName.split("-");
  };

  render() {
    const { handleSubmit, isSubmitting } = this.props;

    /**
     * TODO: Creating one quiz. What is required?
     * On setup, a question, and an answer will be created.
     * Their state will be stored with Redux
     *
     *
     *
     */

     console.log(this.props.answers);
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
            className="selectAnswer"
            options={
              this.state.answers instanceof Array
                ? this.state.answers.map(answer => {
                  return {
                    value: answer.id,
                    label: "MAP STATE TO PROPS THX"
                  };
                })
                : "NO"
            }
          />
          {this.state.answers.length < 10 &&
            <div className="addItemQuizButtonContainer">
              <button type="button" onClick={() => this.addAnswer()}>
                Add answer
            </button>
              <button type="button">Add question</button>
            </div>
          }
          <div className="createQuizButtonContainer">
            <button type="submit" disabled={isSubmitting}>
              Finish Quiz
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let answerValues = [];
  if (state.form.quizMaker && state.form.quizMaker.values) {
    Object.entries(state.form.quizMaker.values).sort().map(answer => {
      answerValues.push(answer[1]);
    });
  }
  return {answers: answerValues};
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
