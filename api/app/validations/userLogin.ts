import {object, string} from "yup";

const userLogin = object({
    email:
        string().
        email("Email must contain @").
        required("Email can't be empty!"),
    password:
        string().
        required("Password can't be empty!")
})

export default userLogin;