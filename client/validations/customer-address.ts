import {object, string} from "yup";

const createCustomerAddressFormData = object({
    streetName: 
        string()
        .min(5, "Minimum street name must be at least 5 characters")
        .max(75, "Maximum allowed street name must be at most 75 characters")
        .required("Street name is required!"),
    approach: 
        string()
        .min(5, "Minimum approach name must be at least 5 characters")
        .max(75, "Maximum allowed approach name must be at most 75 characters")
        .required("Approach is required!"),
    floor: 
        string()
        .min(2, "Minimum floor name must be at least 2 characters")
        .max(15, "Maximum allowed floor name must be at most 15 characters")
        .required("Floor is required!"),
    apartmentNumber: 
        string()
        .min(2, "Minimum apartment number must be at least 2 characters")
        .max(15, "Maximum allowed apartment number must be at most 15 characters")
        .required("Apartment number is required!"),
    doorCode: 
        string()
        .min(1, "Minimum door code must be at least 1 characters")
        .max(15, "Maximum allowed door code must be at most 15 characters")
        .required("Door code is required!"),
    comment: 
        string()
        .min(5, "Minimum comment must be at least 5 characters")
        .max(150, "Maximum allowed comment must be at most 150 characters")
        .required("Comment is required!"),
});
const editCustomerAddressFormData = object({
    streetName: 
        string()
        .min(5, "Minimum street name must be at least 5 characters")
        .max(75, "Maximum allowed street name must be at most 75 characters"),
    approach: 
        string()
        .min(5, "Minimum approach name must be at least 5 characters")
        .max(75, "Maximum allowed approach name must be at most 75 characters"),
    floor: 
        string()
        .min(2, "Minimum floor name must be at least 2 characters")
        .max(15, "Maximum allowed floor name must be at most 15 characters"),
    apartmentNumber: 
        string()
        .min(2, "Minimum apartment number must be at least 2 characters")
        .max(15, "Maximum allowed apartment number must be at most 15 characters"),
    doorCode: 
        string()
        .min(1, "Minimum door code must be at least 1 characters")
        .max(15, "Maximum allowed door code must be at most 15 characters"),
    comment: 
        string()
        .min(5, "Minimum comment must be at least 5 characters")
        .max(150, "Maximum allowed comment must be at most 150 characters"),
});

export {
    createCustomerAddressFormData,
    editCustomerAddressFormData
}