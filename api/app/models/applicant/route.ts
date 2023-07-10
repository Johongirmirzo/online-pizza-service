import { Router } from "express";
import { verifyUser } from "../../middleware/verifyUser";
import { isUserAdmin } from "../../middleware/isAdmin";
import { uploadImage } from "../../middleware/uploadImage";
import { validateReqParamForId } from "../../middleware/validateReqParamForId";
import ApplicantController from "./controller";

const router = Router();


router.get("/get-all-applicants", verifyUser, isUserAdmin, ApplicantController.getAllApplicants);
router.get("/get-applicant/:id", verifyUser, isUserAdmin, validateReqParamForId, ApplicantController.getApplicant);
router.post("/create-applicant", uploadImage.fields([{name: "applicantPhoto"}, {name: "passportPhoto"}, {name: "resume"}, {name: "panPhoto"}]), ApplicantController.createApplicant);
router.patch("/change-applicant-status/:id", verifyUser, isUserAdmin, validateReqParamForId, ApplicantController.changeApplicantStatus);
router.delete("/delete-applicant/:id", verifyUser, isUserAdmin, validateReqParamForId, ApplicantController.deleteApplicant);


export default router;