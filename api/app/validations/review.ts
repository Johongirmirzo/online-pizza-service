import {object, string, number} from "yup";

const review = object({
  reviewSubject:
    string()
    .matches(/driver|stuff|manager|restaurant|food|other/i)
    .required("Review subject is required"),
  message:
    string()
    .min(10, "Minimum message length must be 10")
    .max(250, "Maximum message length must be 250")
    .required("Message is required"),
  stars:
    number()
    .required("Review star is required")
})

export default review;