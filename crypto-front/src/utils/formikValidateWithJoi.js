import Joi from "joi";

// validate if signin/signup details are legal or correct

const formikValidateWithJoi = (schema) => {
  return (values) => {
    const { error } = Joi.object(schema).validate(values, {
      abortEarly: false,
    });

    if (!error) {
      return null;
    }

    const errors = {};

    for (let detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    return errors;
  };
};

export default formikValidateWithJoi;
