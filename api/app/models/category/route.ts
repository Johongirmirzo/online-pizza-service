import { Router } from "express";
import CategoryController from "./controller";
import { validateData } from "../../middleware/validations";
import { category } from "../../validations";
import { validateReqParamForId } from "../../middleware/validateReqParamForId";
import { uploadImage } from "../../middleware/uploadImage";
import { verifyUser } from "../../middleware/verifyUser";
import { isUserAdmin } from "../../middleware/isAdmin";


const router = Router();

router.get('/get-all-categories', CategoryController.getAllCategories);
router.get("/get-category/:id", validateReqParamForId, validateReqParamForId, CategoryController.getCategory);
router.post('/create-category', verifyUser, uploadImage.single("category-photo"), validateData(category), CategoryController.createCategory);
router.patch('/edit-category/:id', verifyUser, uploadImage.single("category-photo"), validateReqParamForId, validateReqParamForId, CategoryController.editCategory);
router.delete('/delete-category/:id', verifyUser, isUserAdmin, validateReqParamForId, validateReqParamForId, CategoryController.deleteCategory);

export default router;