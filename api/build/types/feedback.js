"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitAmount = exports.FeedbackOn = exports.FeedbackStatus = exports.Gender = void 0;
var FeedbackOn;
(function (FeedbackOn) {
    FeedbackOn["HYGIENE"] = "HYGIENE";
    FeedbackOn["HOSPITALITY"] = "HOSPITALITY";
    FeedbackOn["ACCURACY"] = "ACCURACY";
    FeedbackOn["SPEED"] = "SPEED";
    FeedbackOn["CALL_CENTRE"] = "CALL_CENTRE";
    FeedbackOn["PRODUCT_QUALITY"] = "PRODUCT_QUALITY";
    FeedbackOn["ONLINE_ORDER"] = "ONLINE_ORDER";
})(FeedbackOn || (exports.FeedbackOn = FeedbackOn = {}));
var VisitAmount;
(function (VisitAmount) {
    VisitAmount["WEEKLY"] = "WEEKLY";
    VisitAmount["MONTHLY"] = "MONTHLY";
    VisitAmount["OCCASIONALY"] = "OCCASIONALY";
    VisitAmount["FIRST_TIME"] = "FIRST_TIME";
})(VisitAmount || (exports.VisitAmount = VisitAmount = {}));
var FeedbackType;
(function (FeedbackType) {
    FeedbackType["DINE_INE"] = "DINE_IN";
    FeedbackType["DELIVERY"] = "DELIVERY";
})(FeedbackType || (FeedbackType = {}));
var FeedbackStatus;
(function (FeedbackStatus) {
    FeedbackStatus["NOT_EXAMINED"] = "NOT_EXAMINED";
    FeedbackStatus["EXAMINED"] = "EXAMINED";
})(FeedbackStatus || (exports.FeedbackStatus = FeedbackStatus = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
