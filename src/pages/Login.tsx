import { Form, Formik, FormikProps } from "formik";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = object().shape({
  email: string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters."),
});

const Login = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
    } catch (e) {}
  };
  return (
    <div className="min-h-screen min-w-[100vw] flex items-center justify-center">
      <div className="rounded border shadow p-5 w-[25vw]">
        <div className="font-bold text-xl text-center my-3">Hyperledger</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formikRef}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-center justify-between">
            <TextInput
              name="email"
              type="email"
              label="Email"
              containerStyle={`w-full`}
              size="small"
            />
            <TextInput
              name="password"
              type="password"
              label="Password"
              containerStyle={`w-full`}
              size="small"
            />
            <Button
              size="small"
              className="w-full"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Formik>
        <div className="text-xs my-3 text-center">
          <Link to={"/register"}>Not registered? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
