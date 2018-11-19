import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QuizMakerInputField from "../../components/quizMakerInputField/QuizMakerInputField";
import { Field, reduxForm, reset } from "redux-form";
import Select from "react-select";
import InputField from "../../components/inputField/InputField";

class QuizMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerCounter: 0,
      questionCounter: 0,
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

  canCreateQuestion = state => {
    return (
      this.props.question !== undefined &&
      state.answerCounter > 0 &&
      this.state.correctAnswer
    );
  };

  addQuestion = () => {
    const { dispatch } = this.props;
    if (this.state.correctAnswer && this.props.question) {
      this.setState(
        state => {
          if (this.canCreateQuestion(state)) {
            return {
              questions: [...state.questions].concat({
                question: this.props.question,
                answers: state.answers,
                correctAnswer: state.correctAnswer
              })
            };
          }
        },
        () => {
          dispatch(reset("quizMaker"));
          this.clearAnswerFields();
        }
      );
    } else {
      this.setState({
        answerError:
          "To create a new question, you need to write a question, supply the answers and choose the correct one."
      });
    }
  };

  createQuiz = () => {
    this.doCreateQuiz().then(() => {
      this.setState({
        questionCounter: 0,
        answerCounter: 0,
        answers: [],
        answerError: "",
        correctAnswer: null
      });
    });
  };

  clearAnswerFields = () => {
    this.setState(state => {
      return {
        answers: [],
        answerCounter: 0,
        correctAnswer: null,
        questionCounter: state.questionCounter + 1,
        answerError: ""
      };
    });
  };

  setCorrectAnswer = index => {
    this.setState({
      correctAnswer: index,
      answerError: ""
    });
  };

  doCreateQuiz = async () => {
    const url = "/api/quiz";

    let response;

    const payload = {
      quizName: this.props.quizName,
      questions: this.state.questions
    };

    try {
      response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      return "Failed to connect to server";
    }

    return response;
  };

  render() {
    const { handleSubmit, isSubmitting } = this.props;
    return (
      <div className="quizMakerContainer">
        <h2>Quiz Maker</h2>
        <form onSubmit={handleSubmit(this.createQuiz)}>
          <Field
            name="quizName"
            type="text"
            component={QuizMakerInputField}
            label="Quiz Name"
          />

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
            onChange={e => this.setCorrectAnswer(e.value)}
            className="selectAnswer"
            options={this.props.answersWithId.map(answer => {
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

                {/* TODO: SHow button if the question can be made as well*/}
                <button type="button" onClick={this.addQuestion}>
                  Add question
                </button>
              </div>
            )}
          {this.props.answers.length === this.state.answerCounter && (
            <div className="createQuizButtonContainer">
              <p>Questions: {this.state.questionCounter + "/10"} </p>

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

          {this.state.answerError !== "" && (
            <div>
              <p className="questionError">{this.state.answerError}</p>
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
  let question = undefined;
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
    question =
      Object.values(state.form.quizMaker.values) &&
      Object.values(state.form.quizMaker.values).length > 1
        ? Object.values(state.form.quizMaker.values)[0]
        : undefined;
  }
  return {
    answers: answerValues,
    answersWithId: answersWithId,
    createdQuestions: state.form.quizMaker
      ? Object.keys(state.form.quizMaker.registeredFields).length - 1
      : -1,
    question: question !== undefined ? question : undefined,
    quizName:
      state.form.quizMaker && state.form.quizMaker.values
        ? state.form.quizMaker.values["quizName"]
        : undefined
  };
};

export default reduxForm({
  form: "quizMaker"
})(
  connect(
    mapStateToProps,
    {}
  )(withRouter(QuizMaker))
);
