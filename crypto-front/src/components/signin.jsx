import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import formikValidateWithJoi from "../utils/formikValidateWithJoi";
import Joi from "joi";
import Input from "./common/input";
import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";

const SignIn = ({ redirect }) => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },

    validate: formikValidateWithJoi({
      email: Joi.string()
        .required()
        .min(6)
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string().required().min(8).label("Password"),
    }),

    async onSubmit(values) {
      try {
        await login(values);

        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response?.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form noValidate className="container my-5" onSubmit={form.handleSubmit}>
      <h1 className="mb-1">Sign In</h1>
      {error ? <div className="alert alert-danger my-4">{error}</div> : null}
      <Input
        type="email"
        name="email"
        label="Email"
        error={form.touched.email && form.errors.email}
        placeholder="Email"
        {...form.getFieldProps("email")}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        error={form.touched.password && form.errors.password}
        placeholder="Password"
        {...form.getFieldProps("password")}
      />

      <div>
        <button disabled={!form.isValid} className="btn btn-light my-2">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignIn;
