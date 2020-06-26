import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField, Button, Checkbox } from "@material-ui/core";
import { activityService } from "../services/ActivitiesService";

export const AddActivityForm: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          activityName: "",
          activityDuration: "",
          didComplete: false,
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          activityService.postActivity(data.activityName, parseInt(data.activityDuration, 10));
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Field
              placeholder="activity name"
              name="activityName"
              type="input"
              variant="outlined"
              as={TextField}
            />
            <div>
              <Field
                placeholder="activity duration"
                name="activityDuration"
                variant="outlined"
                type="input"
                as={TextField}
              />
            </div>
            <Field name="didComplete" type="checkbox" as={Checkbox} />
            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};
