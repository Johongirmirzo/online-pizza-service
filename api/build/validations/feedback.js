"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const deliveryFeedbackSchema = (0, yup_1.object)({
    dateOfOrder: (0, yup_1.date)()
        .required("Date of order is required!"),
    timeOfOrder: (0, yup_1.string)()
        .required("Time of order is required!"),
    feedbackOn: (0, yup_1.string)()
        .matches(/hospitality|accuracy|speed|call_centre|product_quality|online_order/i, "Please choose feedback type")
        .required("Feedback type is required!"),
    feedbackOnChoice: (0, yup_1.string)()
        .min(5, "Minimum feedback choice length must be 5")
        .max(150, "Maximum feedback choice length must be 150")
        .required("Feedback choice is required!"),
});
const dineInFeedbackSchema = (0, yup_1.object)({
    dateOfVisit: (0, yup_1.date)()
        .required("Date of visit is required!"),
    timeOfVisit: (0, yup_1.string)()
        .required("Time of visit is required!"),
    visitAmount: (0, yup_1.string)()
        .matches(/weekly|monthly|occasionaly|first_time/i, "Please choose visit amount")
        .required("Visit amount is required!"),
});
const createFeedbackSchema = (0, yup_1.object)({
    type: (0, yup_1.string)()
        .matches(/delivery|dine_in/i, "Please choose either option")
        .required("Delivery Type is required"),
    fullName: (0, yup_1.string)()
        .min(5, "Minimum fullname length must be 5")
        .max(50, "Maximum fullname length must be 50")
        .required("Fullname is required!"),
    gender: (0, yup_1.string)()
        .matches(/male|female/i, "Please choose gender")
        .required("Gender is required!"),
    email: (0, yup_1.string)()
        .email("Email must contain @")
        .min(8, "Minimum email length must be 8")
        .max(50, "Maximum email length must be 50")
        .required("Email is required!"),
    mobileNumber: (0, yup_1.string)()
        .length(12, "Phone number must be 12 digits eg. 998991002030")
        .required("Phone number is required!"),
    feedback: (0, yup_1.string)()
        .min(10, "Minimum feedback length must be 10")
        .max(250, "Maximum feedback length must be 250")
        .required("Feedback is required!"),
    rating: (0, yup_1.number)()
        .min(0.5, "Minimum rating is 0.5")
        .max(5, "Maximum rating is 5")
        .required("Rating is required!"),
    experience: (0, yup_1.string)()
        .min(10, "Minimum experience length must be 10")
        .max(250, "Maximum experience length must be 250")
        .required("Experience is required!"),
    feedbackTypeData: (0, yup_1.object)()
        .when("type", ([type], schema) => {
        return type === "DELIVERY" ? schema.object(deliveryFeedbackSchema) : schema.object(dineInFeedbackSchema);
    })
});
exports.default = createFeedbackSchema;
