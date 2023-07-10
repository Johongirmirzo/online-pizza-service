import {object, string, number, array, date} from "yup";


const createDineInFeedbackSchema = object({   
    fullName:
        string()
        .min(5, "Minimum fullname length must be 5")
        .max(50, "Maximum fullname length must be 50")
        .required("Fullname is required!"),
    gender:
        string()
        .matches(/male|female/i, "Please choose gender")
        .required("Gender is required!"),
    email:  
        string()
        .email("Email must contain @")
        .min(8, "Minimum email length must be 8")
        .max(50, "Maximum email length must be 50")
        .required("Email is required!"),
    mobileNumber:
        string()
        .length(12, "Phone number must be 12 digits eg. 998991002030")
        .required("Phone number is required!"),
    feedback:
        string()
        .min(10, "Minimum feedback length must be 10")
        .max(250, "Maximum feedback length must be 250")
        .required("Feedback is required!"),
    rating:
        number()
        .min(0.5, "Minimum rating is 0.5")
        .max(5, "Maximum rating is 5")
        .required("Rating is required!"),
    experience:
        string()
        .min(10, "Minimum experience length must be 10")
        .max(250, "Maximum experience length must be 250")
        .required("Experience is required!"),
    dateOfVisit:
        date()
        .required("Date of visit is required!"),
    timeOfVisit:
        string()
        .required("Time of visit is required!"),
    visitAmount:
        string()
        .matches(/weekly|monthly|occasionaly|first_time/i, "Please choose visit amount")
        .required("Visit amount is required!"),
})


const createDeliveryFeedbackSchema = object({   
    fullName:
        string()
        .min(5, "Minimum fullname length must be 5")
        .max(50, "Maximum fullname length must be 50")
        .required("Fullname is required!"),
    gender:
        string()
        .matches(/male|female/i, "Please choose gender")
        .required("Gender is required!"),
    email:  
        string()
        .email("Email must contain @")
        .min(8, "Minimum email length must be 8")
        .max(50, "Maximum email length must be 50")
        .required("Email is required!"),
    mobileNumber:
        string()
        .length(12, "Phone number must be 12 digits eg. 998991002030")
        .required("Phone number is required!"),
    feedback:
        string()
        .min(10, "Minimum feedback length must be 10")
        .max(250, "Maximum feedback length must be 250")
        .required("Feedback is required!"),
    rating:
        number()
        .min(0.5, "Minimum rating is 0.5")
        .max(5, "Maximum rating is 5")
        .required("Rating is required!"),
    experience:
        string()
        .min(10, "Minimum experience length must be 10")
        .max(250, "Maximum experience length must be 250")
        .required("Experience is required!"),
    dateOfOrder:
        date()
        .required("Date of order is required!"),
    timeOfOrder:
        string()
        .required("Time of order is required!"),
    feedbackOn:
        string()
        .matches(/hospitality|accuracy|speed|call_centre|product_quality|online_order/i, "Please choose feedback type")
        .required("Feedback type is required!"),
    feedbackOnChoice:
        string()
        .min(5, "Minimum feedback choice length must be 5")
        .max(150, "Maximum feedback choice length must be 150")
        .required("Feedback choice is required!"),
})

export {
    createDineInFeedbackSchema,
    createDeliveryFeedbackSchema
};