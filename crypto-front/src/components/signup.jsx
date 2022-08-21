import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import formikValidateWithJoi from "../utils/formikValidateWithJoi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const SignUp = ({ redirect }) => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { user, createUser } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
    },

    validate: formikValidateWithJoi({
      firstName: Joi.string().required().min(2).label("First Name"),
      lastName: Joi.string().required().min(2).label("Last Name"),
      email: Joi.string()
        .required()
        .min(6)
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string().required().min(8).label("Password"),
      gender: Joi.string().min(1).max(1).allow("").label("Gender"),
    }),

    async onSubmit(values) {
      const { gender, ...body } = values;
      if (gender) {
        body.gender = gender;
      }
      try {
        await createUser(body);

        toast.success("Your account was registered", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

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
      <h1 className="mb-1">Sign Up</h1>
      {error ? <div className="alert alert-danger my-4">{error}</div> : null}
      <Input
        type="text"
        name="firstName"
        label="First Name"
        error={form.touched.firstName && form.errors.firstName}
        placeholder="First Name"
        {...form.getFieldProps("firstName")}
      />
      <Input
        type="text"
        name="lastName"
        label="Last Name"
        error={form.touched.lastName && form.errors.lastName}
        placeholder="Last Name"
        {...form.getFieldProps("lastName")}
      />
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

      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        className="form-select form-select-lg my-3"
        aria-label=".form-select-lg example"
        {...form.getFieldProps("gender")}
      >
        <option value="">Gender</option>
        <option value="1">Male</option>
        <option value="2">Female</option>
        <option value="3">Other</option>
      </select>

      <div>
        <button disabled={!form.isValid} className="btn btn-light my-2">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUp;
