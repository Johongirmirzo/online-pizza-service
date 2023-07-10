import {object, string} from "yup";

const message = object({
  firstname: 
    string()
    .min(2, "Minimum firstname length must be 2")
    .max(25, "Maximum firstname length must be 25")
    .required("Firstname is required!"),
  lastname: 
    string()
    .min(2, "Minimum lastname length must be 2")
    .max(25, "Maximum lastname length must be 25")
    .required("Lastname is required!"),
  phoneNumber:
    string()
    .length(12, "Please provide valid phone number e.g 998991001101")
    .required("Phone number is required!"),
  email:
    string()
    .email("Email must contain @")
    .min(10, "Minimum email length must be 10")
    .max(50, "Maximum email length must be 50")
    .required("Email is required!"),
  subject:
    string()
    .min(5, "Minimum subject length must be 5")
    .max(50, "Maximum subject length must be 50")
    .required("Subject is required!"),
  message: 
    string()
    .min(20, "Minimum message length must be 20")
    .max(250, "Maximum message length must be 250")
    .required("Message is required!"),
})

export default message;