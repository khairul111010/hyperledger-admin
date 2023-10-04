import { Form, Formik, FormikProps } from "formik";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import Button from "../components/Button";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import {
  useLoginAdminMutation,
  useRegisterAdminMutation,
} from "../store/features/admin/adminApi";
import { userLoggedIn } from "../store/features/auth/authSlice";
import {
  useLoginInstitutionMutation,
  useRegisterInstitutionMutation,
} from "../store/features/institution/institutionApi";
import {
  useLoginInstructorMutation,
  useRegisterInstructorMutation,
} from "../store/features/instructor/instructorApi";
import {
  useLoginLearnerMutation,
  useRegisterLearnerMutation,
} from "../store/features/learner/learnerApi";
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  type: "learner",
};

const validationSchema = object().shape({
  name: string().required("Name is required."),
  email: string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  password: string()
    .required("Password is required.")
    .min(8, "Password must be 8 characters."),
  confirm: string()
    .required("Please retype your password.")
    .oneOf([ref("password")], "Passwords does not match"),
  type: string()
    .required("Please select a type")
    .oneOf(["admin", "institution", "instructor", "learner"]),
});

const Login = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const [registerAdmin] = useRegisterAdminMutation();
  const [loginAdmin] = useLoginAdminMutation();
  const [registerInstitution] = useRegisterInstitutionMutation();
  const [loginInstitution] = useLoginInstitutionMutation();
  const [registerInstructor] = useRegisterInstructorMutation();
  const [loginInstructor] = useLoginInstructorMutation();
  const [registerLearner] = useRegisterLearnerMutation();
  const [loginLearner] = useLoginLearnerMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values: any) => {
    try {
      if (values.type === "admin") {
        registerAdmin({
          name: values.name,
          email: values.email,
          password: values.password,
        })
          .unwrap()
          .then((result: any) => {
            if (result && result.status === 201) {
              loginAdmin({
                email: values.email,
                password: values.password,
              })
                .unwrap()
                .then((res: any) => {
                  if (res && res.status === 201) {
                    dispatch(userLoggedIn(res.result));
                    toast.success("Successfully Signed In");
                    navigate("/");
                  }
                });
            }
          });
      } else if (values.type === "institution") {
        registerInstitution({
          name: values.name,
          email: values.email,
          password: values.password,
        })
          .unwrap()
          .then((result: any) => {
            if (result && result.status === 201) {
              loginInstitution({
                email: values.email,
                password: values.password,
              })
                .unwrap()
                .then((res: any) => {
                  if (res && res.status === 201) {
                    dispatch(userLoggedIn(res.result));
                    toast.success("Successfully Signed In");
                    navigate("/");
                  }
                });
            }
          });
      } else if (values.type === "instructor") {
        registerInstructor({
          name: values.name,
          email: values.email,
          password: values.password,
        })
          .unwrap()
          .then((result: any) => {
            if (result && result.status === 201) {
              loginInstructor({
                email: values.email,
                password: values.password,
              })
                .unwrap()
                .then((res: any) => {
                  if (res && res.status === 201) {
                    dispatch(userLoggedIn(res.result));
                    toast.success("Successfully Signed In");
                    navigate("/");
                  }
                });
            }
          });
      } else {
        registerLearner({
          name: values.name,
          email: values.email,
          password: values.password,
        })
          .unwrap()
          .then((result: any) => {
            if (result && result.status === 201) {
              loginLearner({
                email: values.email,
                password: values.password,
              })
                .unwrap()
                .then((res: any) => {
                  if (res && res.status === 201) {
                    dispatch(userLoggedIn(res.result));
                    toast.success("Successfully Signed In");
                    navigate("/");
                  }
                });
            }
          });
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
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
              name="name"
              type="text"
              label="Name"
              containerStyle={`w-full`}
              size="small"
            />
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
            <TextInput
              name="confirm"
              type="password"
              label="Confirm Password"
              containerStyle={`w-full`}
              size="small"
            />
            <SelectInput
              containerStyle={"w-full"}
              label="Type"
              size="small"
              name="type"
              options={[
                { value: "admin", label: "Admin" },
                { value: "institution", label: "Institution" },
                { value: "instructor", label: "Instructor" },
                { value: "learner", label: "Learner" },
              ]}
            />
            <Button
              size="small"
              className="w-full"
              variant="primary"
              type="submit"
            >
              Register
            </Button>
          </Form>
        </Formik>
        <div className="text-xs my-3 text-center">
          <Link to={"/login"}>Already registered? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
