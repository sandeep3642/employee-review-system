import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation schema for feedback formy

const feedbackValidationSchema = Yup.object({
  periodFrom: Yup.date()
    .required("From Date is required")
    .test("is-before", "From Date must be before To Date", function (value) {
      const { periodTo } = this.parent;
      return !value || !periodTo || new Date(value) <= new Date(periodTo);
    }),
  periodTo: Yup.date()
    .required("To Date is required")
    .max(new Date(), "To Date cannot be in the future")
    .test("is-after", "To Date must be after From Date", function (value) {
      const { periodFrom } = this.parent;
      return !value || !periodFrom || new Date(value) >= new Date(periodFrom);
    }),
  metrics: Yup.object().shape({
    productivity: Yup.number()
      .required("Productivity is required")
      .min(0)
      .max(10),
    teamwork: Yup.number().required("Teamwork is required").min(0).max(10),
    punctuality: Yup.number()
      .required("Punctuality is required")
      .min(0)
      .max(10),
    communication: Yup.number()
      .required("Communication is required")
      .min(0)
      .max(10),
    problemSolving: Yup.number()
      .required("Problem solving is required")
      .min(0)
      .max(10),
  }),
});

const FeedbackForm = ({
  employeeJoiningDate,
  employeeId,
  onSubmitFeedback,
}) => {
  const formik = useFormik({
    initialValues: {
      id: "",
      periodFrom: "",
      periodTo: "",
      metrics: {
        productivity: 0,
        teamwork: 0,
        punctuality: 0,
        communication: 0,
        problemSolving: 0,
      },
    },
    validationSchema: feedbackValidationSchema,
    onSubmit: async (values) => {
      try {
        const feedbackData = {
          ...values,
          employeeId, // Pass employeeId to feedback
        };
        await onSubmitFeedback(feedbackData); // Call the function to handle form submission
        formik.resetForm(); // Reset the form after successful submission
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="periodFrom"
            className="block text-sm font-medium text-gray-700"
          >
            From Date
          </label>
          <input
            id="periodFrom"
            name="periodFrom"
            type="date"
            value={formik.values.periodFrom}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 w-full border rounded-md text-gray-900"
          />
          {formik.touched.periodFrom && formik.errors.periodFrom && (
            <div className="text-red-500 text-sm">
              {formik.errors.periodFrom}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="periodTo"
            className="block text-sm font-medium text-gray-700"
          >
            To Date
          </label>
          <input
            id="periodTo"
            name="periodTo"
            type="date"
            value={formik.values.periodTo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 w-full border rounded-md text-gray-900"
          />
          {formik.touched.periodTo && formik.errors.periodTo && (
            <div className="text-red-500 text-sm">{formik.errors.periodTo}</div>
          )}
        </div>

        {/* Metrics */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Metrics
          </label>
          {Object.keys(formik.values.metrics).map((metric) => (
            <div
              key={metric}
              className="flex items-center gap-4 mt-2 text-gray-900"
            >
              <span className="capitalize">{metric}:</span>
              <input
                type="number"
                name={`metrics.${metric}`}
                value={formik.values.metrics[metric]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-20 border rounded-md p-1"
              />
              {formik.touched.metrics?.[metric] &&
                formik.errors.metrics?.[metric] && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.metrics[metric]}
                  </div>
                )}
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Generate Feedback
          </button>
        </div>
      </form>
    </>
  );
};

export default FeedbackForm;
