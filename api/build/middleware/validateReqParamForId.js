"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqParamForId = void 0;
const validateReqParamForId = (req, res, next) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ errors: "Please provide only integer for url paramater of id" });
    }
    next();
};
exports.validateReqParamForId = validateReqParamForId;
