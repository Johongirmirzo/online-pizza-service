"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCustomerAddressFormData = exports.createCustomerAddressFormData = void 0;
const yup_1 = require("yup");
const createCustomerAddressFormData = (0, yup_1.object)({
    streetName: (0, yup_1.string)()
        .min(5, "Minimum street name must be at least 5 characters")
        .max(75, "Maximum allowed street name must be at most 75 characters")
        .required("Street name is required!"),
    approach: (0, yup_1.string)()
        .min(5, "Minimum approach name must be at least 5 characters")
        .max(75, "Maximum allowed approach name must be at most 75 characters")
        .required("Approach is required!"),
    floor: (0, yup_1.string)()
        .min(2, "Minimum floor name must be at least 2 characters")
        .max(15, "Maximum allowed floor name must be at most 15 characters")
        .required("Floor is required!"),
    apartmentNumber: (0, yup_1.string)()
        .min(2, "Minimum apartment number must be at least 2 characters")
        .max(15, "Maximum allowed apartment number must be at most 15 characters")
        .required("Apartment number is required!"),
    doorCode: (0, yup_1.string)()
        .min(1, "Minimum door code must be at least 1 characters")
        .max(15, "Maximum allowed door code must be at most 15 characters")
        .required("Door code is required!"),
    comment: (0, yup_1.string)()
        .min(5, "Minimum comment must be at least 5 characters")
        .max(150, "Maximum allowed comment must be at most 150 characters")
        .required("Comment is required!"),
});
exports.createCustomerAddressFormData = createCustomerAddressFormData;
const editCustomerAddressFormData = (0, yup_1.object)({
    streetName: (0, yup_1.string)()
        .min(5, "Minimum street name must be at least 5 characters")
        .max(75, "Maximum allowed street name must be at most 75 characters"),
    approach: (0, yup_1.string)()
        .min(5, "Minimum approach name must be at least 5 characters")
        .max(75, "Maximum allowed approach name must be at most 75 characters"),
    floor: (0, yup_1.string)()
        .min(2, "Minimum floor name must be at least 2 characters")
        .max(15, "Maximum allowed floor name must be at most 15 characters"),
    apartmentNumber: (0, yup_1.string)()
        .min(2, "Minimum apartment number must be at least 2 characters")
        .max(15, "Maximum allowed apartment number must be at most 15 characters"),
    doorCode: (0, yup_1.string)()
        .min(1, "Minimum door code must be at least 1 characters")
        .max(15, "Maximum allowed door code must be at most 15 characters"),
    comment: (0, yup_1.string)()
        .min(5, "Minimum comment must be at least 5 characters")
        .max(150, "Maximum allowed comment must be at most 150 characters"),
});
exports.editCustomerAddressFormData = editCustomerAddressFormData;
