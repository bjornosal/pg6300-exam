import { string, object } from 'prop-types'
import React from "react";
import InputField from './../inputField/InputField'

export default function QuizMakerInputField({ input, label, type }) {
  return (
    <div className="quizMakerInputFieldContainer">
      <label>{label}</label>
      <InputField label={label} input={input} type={type}/>
    </div>
  )
}

QuizMakerInputField.propTypes = {
    input: object,
    label: string,
    type: string
}