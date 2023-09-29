import { Form, Formik, FormikProps } from "formik";
import { useRef } from "react";
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
      <div className="rounded border shadow p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formikRef}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-center justify-between">
            <TextInput name="email" type="email" />
            <TextInput name="password" type="password" />
            <Button className="w-full" variant="secondary" type="submit">
              Sign In
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
