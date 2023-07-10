import { Router } from "express";
import { isUserAdmin } from "../../middleware/isAdmin";
import { verifyUser } from "../../middleware/verifyUser";
import { verifyCustomer } from "../../middleware/verifyCustomer";
import { validateData } from "../../middleware/validations";
import { validateReqParamForId } from "../../middleware/validateReqParamForId"
import { 
    loginCustomer, 
    registerCustomer, 
    editCustomer,  
    createCustomerAddressFormData, 
    editCustomerAddressFormData
} from "../../validations";
import CustomerController from "./controller";

const router = Router();


router.get("/get-all-customers", CustomerController.getAllCustomers);
router.get("/get-customer/:id", validateReqParamForId, CustomerController.getCustomer);
router.post("/login", validateData(loginCustomer), CustomerController.loginCustomer);
router.post("/register", validateData(registerCustomer), CustomerController.registerCustomer);
router.patch("/update-customer/:id", verifyCustomer, validateData(editCustomer), validateReqParamForId, CustomerController.updateCustomer)
router.patch("/change-customer-status/:id", verifyUser, isUserAdmin, validateReqParamForId, CustomerController.changeCustomerStatus);
router.delete("/delete-customer/:id", verifyUser, isUserAdmin, validateReqParamForId, CustomerController.deleteCustomer);

router.get("/get-all-customer-addresses/:id", validateReqParamForId, CustomerController.getAllCustomerAddresses);
router.patch("/update-customer-address/:addressId/:customerId", validateData(editCustomerAddressFormData), CustomerController.updateCustomerAddress);
router.post("/create-customer-address/:id", validateData(createCustomerAddressFormData), CustomerController.createCustomerAddress);
router.delete("/delete-customer-address/:id", validateReqParamForId, CustomerController.deleteCustomerAddress);



export default router;