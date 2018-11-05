import { string, object } from 'prop-types'
import React from "react";

export default function InputField({ input, label, type }) {
  return (
    <div>
      <div className="inputContainer">
        <input {...input} type={type} placeholder={label} />
      </div>
    </div>
  );
}

InputField.propTypes = {
    input: object,
    label: string,
    type: string
}