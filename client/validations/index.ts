import { editCustomer, loginCustomer, registerCustomer } from "./customer";
import { createCustomerAddressFormData, editCustomerAddressFormData } from "./customer-address";
import message from "./contact";
import {createDineInFeedbackSchema, createDeliveryFeedbackSchema} from "./feedback"
import {createTeamMember, createDriver, createManagerCoach} from "./career";

export {
    editCustomer,
    loginCustomer,
    registerCustomer,
    createCustomerAddressFormData, 
    editCustomerAddressFormData,
    message,
    createDineInFeedbackSchema, 
    createDeliveryFeedbackSchema,
    createTeamMember,
    createDriver,
    createManagerCoach
}