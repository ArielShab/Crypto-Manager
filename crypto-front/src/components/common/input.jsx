const Input = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group my-2">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        id={name}
        name={name}
        className={error ? "form-control is-invalid" : "form-control"}
      ></input>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
