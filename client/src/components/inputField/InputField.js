import { string, object } from 'prop-types'
import React from "react";

export default function InputField({ input, label, type, onChange }) {
  return (
    <div>
      <div className="inputContainer">
      {onChange ? 
        <input {...input} type={type} placeholder={label} onChange={onChange ? onChange : undefined}/> :
        <input {...input} type={type} placeholder={label}/>

      }
        </div>
    </div>
  );
}

InputField.propTypes = {
    input: object,
    label: string,
    type: string
}