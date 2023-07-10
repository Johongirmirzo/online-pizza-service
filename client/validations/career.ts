import {object, string, date, array, boolean, number} from "yup";

const createTeamMember = object({
    applicantPhoto:
        string()
        .required("Applicant photo is required!"),
    passportPhoto:
        string()
        .required("Passport photo is required!"),
    resume:
        string()
        .required("Resume photo is required!"),
    firstname: 
        string()
        .min(2, "Minimum firstname characters length must be 2")
        .max(25, "Maximum firstname characters length must be 25")
        .required("Firstname is required!"),
    lastname: 
        string()
        .min(2, "Minimum lastname characters length must be 2")
        .max(25, "Maximum lastname characters length must be 25")
        .required("Lastname is required!"),
    email: 
        string()
        .email("Email must contain @")
        .min(10, "Minimum email characters length must be 10")
        .max(50, "Maximum email characters length must be 50")
        .required("Email is required!"),
    phoneNumber: 
        string()
        .length(12, "Phone number length must be 12. e.g. 998991002030")
        .required("Phone Number is required"),
    gender: 
        string()
        .matches(/male|female/i, "Please choose either male or female")
        .required("Gender is required!"),
    birthDate: 
        date()
        .typeError("Please provide a value")
        .required("Birth date is required!"),
    passportNumber: 
        string()
        .min(5, "Minimum passport number characters length must be 5")
        .max(15, "Maximum passport number characters length must be 15")
        .required("Passport number is required!"),
    noticePeriod: 
        string()
        .min(5, "Minimum notice period characters length must be 5")
        .max(25, "Maximum notice period characters length must be 25")
        .required("Notice period is required!"),
    dateOfJoining: 
        date()
        .typeError("Please provide a value")
        .required("Date of joining is required!"),
    education:
        string()
        .matches(/no_education|high_school|graduate|post_graduate/i, "Please choose education")
        .required("Education is required!"),
    martialStatus: 
        string()
        .matches(/married|single/i, "Please choose marital status")
        .required("Marital status is required"),
    experiences: array().of(object({
        jobTitle: 
            string()
            .min(2, "Minimum job title length must be 2")
            .max(20, "Maximum job title length must be 20"),
        companyName: 
            string()
            .min(5, "Minimum company name length must be 5")
            .max(30, "Maximum company name length must be 30"),
        startDate: 
            date(),
        endDate: 
           date()
    })),
    languages: object({
        uzbek: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("Uzbek language level is required!"),
        english: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("English language level is required!"),
        russian: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("Russian language level is required!"),
    }),
    computerSkills: array(),
    source: 
        string()
        .min(5, "Minimum source name must be 5")
        .max(50, "Maximum source name must be 50")
        .required("Source is required!"),
    hasBankAccount: 
        boolean()
        .required("Value is required!"),
    bankAccountName:
        string()
        .min(5, "Minimum bank account name must be 5")
        .max(50, "Maximum bank account name must be 50"),
    employmentType:
        string()
        .matches(/part_time|full_time/i, "Please choose employment type")
        .required("Employment type is required!")
})
const createDriver = object({
    applicantPhoto:
        string()
        .required("Applicant photo is required!"),
    passportPhoto:
        string()
        .required("Passport photo is required!"),
    resume:
        string()
        .required("Resume photo is required!"),
    firstname: 
        string()
        .min(2, "Minimum firstname characters length must be 2")
        .max(25, "Maximum firstname characters length must be 25")
        .required("Firstname is required!"),
    lastname: 
        string()
        .min(2, "Minimum lastname characters length must be 2")
        .max(25, "Maximum lastname characters length must be 25")
        .required("Lastname is required!"),
    email: 
        string()
        .email("Email must contain @")
        .min(10, "Minimum email characters length must be 10")
        .max(50, "Maximum email characters length must be 50")
        .required("Email is required!"),
    phoneNumber: 
        string()
        .length(12, "Phone number length must be 12. e.g. 998991002030")
        .required("Phone Number is required"),
    gender: 
        string()
        .matches(/male|female/i, "Please choose either male or female")
        .required("Gender is required!"),
    birthDate: 
        date()
        .typeError("Please provide a value")
        .required("Birth date is required!"),
    passportNumber: 
        string()
        .min(5, "Minimum passport number characters length must be 5")
        .max(15, "Maximum passport number characters length must be 15")
        .required("Passport number is required!"),
    noticePeriod: 
        string()
        .min(5, "Minimum notice period characters length must be 5")
        .max(25, "Maximum notice period characters length must be 25")
        .required("Notice period is required!"),
    dateOfJoining: 
        date()
        .typeError("Please provide a value")
        .required("Date of joining is required!"),
    education:
        string()
        .matches(/no_education|high_school|graduate|post_graduate/i, "Please choose education")
        .required("Education is required!"),
    martialStatus: 
        string()
        .matches(/married|single/i, "Please choose marital status")
        .required("Marital status is required"),
    drivingLicence: 
        string()
        .matches(/a1|a|b|c/i, "Please choose a driving license")
        .required("Driviing licence is required!"),
    licenseNumber:
        string()
        .min(5, "Minimum licence number characters length must be 5")
        .max(25, "Maximum licence number characters length must be 25")
        .required("Licence number is required!"),   
    experiences: array().of(object({
        jobTitle: 
            string()
            .min(2, "Minimum job title length must be 2")
            .max(20, "Maximum job title length must be 20"),
        companyName: 
            string()
            .min(5, "Minimum company name length must be 5")
            .max(30, "Maximum company name length must be 30"),
        startDate: 
            date(),
        endDate: 
           date()
    })),
    languages: object({
        uzbek: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("Uzbek language level is required!"),
        english: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("English language level is required!"),
        russian: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("Russian language level is required!"),
    }),
    computerSkills: array(),
    source: 
        string()
        .min(5, "Minimum source name must be 5")
        .max(50, "Maximum source name must be 50")
        .required("Source is required!"),
    hasBankAccount: 
        boolean()
        .required("Value is required!"),
    bankAccountName:
        string()
        .min(5, "Minimum bank account name must be 5")
        .max(50, "Maximum bank account name must be 50"),
    employmentType:
        string()
        .matches(/part_time|full_time/i, "Please choose employment type")
        .required("Employment type is required!")
})
const createManagerCoach = object({
    applicantPhoto:
        string()
        .required("Applicant photo is required!"),
    passportPhoto:
        string()
        .required("Passport photo is required!"),
    resume:
        string()
        .required("Resume photo is required!"),
    panPhoto:
        string()
        .required("Pan Photo is required!"),
    firstname: 
        string()
        .min(2, "Minimum firstname characters length must be 2")
        .max(25, "Maximum firstname characters length must be 25")
        .required("Firstname is required!"),
    lastname: 
        string()
        .min(2, "Minimum lastname characters length must be 2")
        .max(25, "Maximum lastname characters length must be 25")
        .required("Lastname is required!"),
    email: 
        string()
        .email("Email must contain @")
        .min(10, "Minimum email characters length must be 10")
        .max(50, "Maximum email characters length must be 50")
        .required("Email is required!"),
    phoneNumber: 
        string()
        .length(12, "Phone number length must be 12. e.g. 998991002030")
        .required("Phone Number is required"),
    gender: 
        string()
        .matches(/male|female/i, "Please choose either male or female")
        .required("Gender is required!"),
    birthDate: 
        date()
        .typeError("Please provide a value")
        .required("Birth date is required!"),
    passportNumber: 
        string()
        .min(5, "Minimum passport number characters length must be 5")
        .max(15, "Maximum passport number characters length must be 15")
        .required("Passport number is required!"),
    noticePeriod: 
        string()
        .min(5, "Minimum notice period characters length must be 5")
        .max(25, "Maximum notice period characters length must be 25")
        .required("Notice period is required!"),
    dateOfJoining: 
        date()
        .typeError("Please provide a value")
        .required("Date of joining is required!"),
    education:
        string()
        .matches(/no_education|high_school|graduate|post_graduate/i, "Please choose education")
        .required("Education is required!"),
    martialStatus: 
        string()
        .matches(/married|single/i, "Please choose marital status")
        .required("Marital status is required"),
    panNumber: 
        string()
        .min(5, "Minimum Pan number characters length must be 5")
        .max(15, "Maximum Pan number characters length must be 15")
        .required("Pan number is required!"),
    currentEmployer: 
        string()
        .min(5, "Minimum current employer characters length must be 5")
        .max(15, "Maximum current employer characters length must be 15")
        .required("Current employer is required!"),
    currentRole: 
        string()
        .min(5, "Minimum current role characters length must be 5")
        .max(15, "Maximum current role characters length must be 15")
        .required("Current role is required!"),
    currentLocation: 
        string()
        .min(5, "Minimum current location characters length must be 5")
        .max(15, "Maximum current location characters length must be 15")
        .required("Current location is required!"),
    currentCTC: 
        string()
        .min(5, "Minimum current ctc characters length must be 5")
        .max(15, "Maximum current ctc characters length must be 15")
        .required("Current ctc is required!"),
    experiences: array().of(object({
        jobTitle: 
            string()
            .min(2, "Minimum job title length must be 2")
            .max(20, "Maximum job title length must be 20"),
        companyName: 
            string()
            .min(5, "Minimum company name length must be 5")
            .max(30, "Maximum company name length must be 30"),
        startDate: 
            date(),
        endDate: 
           date()
    })),
    languages: object({
        uzbek: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("Uzbek language level is required!"),
        english: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("English language level is required!"),
        russian: 
            string()
            .matches(/basic|intermediate|fluent|native/i, "Please choose language level")
            .required("Russian language level is required!"),
    }),
    computerSkills: array(),
    source: 
        string()
        .min(5, "Minimum source name must be 5")
        .max(50, "Maximum source name must be 50")
        .required("Source is required!"),
    hasBankAccount: 
        boolean()
        .required("Value is required!"),
    bankAccountName:
        string()
        .min(5, "Minimum bank account name must be 5")
        .max(50, "Maximum bank account name must be 50"),
    employmentType:
        string()
        .matches(/part_time|full_time/i, "Please choose employment type")
        .required("Employment type is required!")
})

export {createTeamMember, createDriver, createManagerCoach}