import React from "react";
import classes from "./Fields.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const FieldsInput = ({
  label,
  type,
  name,
  value,
  options,
  onChange,
  showToggle,
  toggleVisibility,
  required,
}) => {
  return (
    <div className={classes.teacherForm}>
      <label>{label}{required && <span className={classes.required}>*</span>}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange}>
          <option value="">Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div
          className={classes.inputWrapper}
        >
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            style={{ flex: 1 }}
            required
          />
          {showToggle && (
            <span
              className={classes.eyeIcon}
              onClick={toggleVisibility}
            >
              {type === "password" ? <MdVisibility /> : <MdVisibilityOff />}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FieldsInput;
