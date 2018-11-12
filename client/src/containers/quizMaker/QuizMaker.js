import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import QuizMakerInputField from "../../components/quizMakerInputField/QuizMakerInputField";
import { Field, reduxForm } from "redux-form";
import Select from 'react-select'

class QuizMaker extends Component {
  render() {
    const { handleSubmit, isSubmitting } = this.props;

    return (
      <div className="quizMakerContainer">
        <h2>Quiz Maker</h2>
        <form onSubmit={handleSubmit}>
          <Field
            name="question"
            type="text"
            component={QuizMakerInputField}
            label="Question"
          />

          <Field
            name="answer"
            type="text"
            component={QuizMakerInputField}
            label="Answer"
          />

          <Select className="selectAnswer" options={[
            {value: "one", label:"one"},
            {value: "two", label:"two"},
            {value: "three", label:"three"},
          ]}/>
          <div className="addItemQuizButtonContainer">
            <button disabled={isSubmitting}>Add answer</button>
            <button disabled={isSubmitting}>Add question</button>
          </div>

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
  return {};
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
