import { Form, Formik, FormikProps } from "formik";
import { useRef } from "react";
import { object, string } from "yup";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { initWeb3 } from "../../utils";
const initialValues = {
  courseId: "",
  institutionId: "",
  instructorId: "",
  fieldOfKnowledge: "",
  skillName: "",
  institutionAddress: "",
};

const validationSchema = object().shape({
  courseId: string().required("This field is required."),
  institutionId: string().required("This field is required."),
  instructorId: string().required("This field is required."),
  fieldOfKnowledge: string().required("This field is required."),
  skillName: string().required("This field is required."),
  institutionAddress: string().required("This field is required."),
});
const SetToken = () => {
  const formikRef = useRef<FormikProps<any>>(null);

  const handleSubmit = async (values: any) => {
    console.log(values);

    // const contract = await initWeb3();
  };

  const getCourse = async () => {
    // getCoursesBySender;
    const contract = await initWeb3();
    const tx = await contract!.getCoursesBySender();

    console.log(tx);
  };

  return (
    <div className="w-[800px] mx-auto my-8">
      <button onClick={getCourse}>Get course</button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        innerRef={formikRef}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="flex flex-col items-center justify-between">
            <TextInput
              name="courseId"
              type="text"
              label="Course ID"
              containerStyle={`w-full`}
              size="small"
            />
            <TextInput
              name="institutionId"
              type="text"
              label="Institution ID"
              containerStyle={`w-full`}
              size="small"
            />
            <TextInput
              name="instructorId"
              type="text"
              label="Instructor ID"
              containerStyle={`w-full`}
              size="small"
            />
            <TextInput
              name="fieldOfKnowledge"
              type="text"
              label="Field Of Knowledge"
              containerStyle={`w-full`}
              size="small"
            />
            <TextInput
              name="skillName"
              type="text"
              label="Skill Name"
              containerStyle={`w-full`}
              size="small"
            />
            <TextInput
              name="institutionAddress"
              type="text"
              label="Institution Address"
              containerStyle={`w-full`}
              size="small"
            />
            {/* <SelectInput
              containerStyle={"w-full"}
              label="Institution"
              size="small"
              name="institution_address"
              options={
                institutionList?.result?.data.map((i: any) => {
                  return {
                    value: i.publicAddress,
                    label: i.name + " - " + i.publicAddress,
                  };
                }) || []
              }
              isLoading={isLoading}
            /> */}

            <Button
              size="small"
              className="w-full"
              variant="primary"
              type="submit"
            >
              Set Token
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SetToken;
