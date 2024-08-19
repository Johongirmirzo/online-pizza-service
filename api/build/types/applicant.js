"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantStatus = exports.DrivingLicense = exports.EmploymentType = exports.ApplicantRole = exports.MarriageStatus = exports.Education = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
var Education;
(function (Education) {
    Education["NO_EDUCATION"] = "NO_EDUCATION";
    Education["HIGH_SCHOOL"] = "HIGH_SCHOOL";
    Education["GRADUATE"] = "GRADUATE";
    Education["POST_GRADUATE"] = "POST_GRADUATE";
})(Education || (exports.Education = Education = {}));
var MarriageStatus;
(function (MarriageStatus) {
    MarriageStatus["MARRIED"] = "MARRIED";
    MarriageStatus["SINGLE"] = "SINGLE";
})(MarriageStatus || (exports.MarriageStatus = MarriageStatus = {}));
var ApplicantRole;
(function (ApplicantRole) {
    ApplicantRole["TEAM_MEMBER"] = "TEAM_MEMBER";
    ApplicantRole["DRIVER"] = "DRIVER";
    ApplicantRole["MANAGER"] = "MANAGER";
    ApplicantRole["AREA_COACH"] = "AREA_COACH";
})(ApplicantRole || (exports.ApplicantRole = ApplicantRole = {}));
var EmploymentType;
(function (EmploymentType) {
    EmploymentType["FULL_TIME"] = "FULL_TIME";
    EmploymentType["PART_TIME"] = "PART_TIME";
})(EmploymentType || (exports.EmploymentType = EmploymentType = {}));
var DrivingLicense;
(function (DrivingLicense) {
    DrivingLicense["A1"] = "A1";
    DrivingLicense["A"] = "A";
    DrivingLicense["B"] = "B";
    DrivingLicense["C"] = "C";
})(DrivingLicense || (exports.DrivingLicense = DrivingLicense = {}));
var ApplicantStatus;
(function (ApplicantStatus) {
    ApplicantStatus["PENDING"] = "PENDING";
    ApplicantStatus["ACCEPTED"] = "ACCEPTED";
    ApplicantStatus["REJECTED"] = "REJECTED";
})(ApplicantStatus || (exports.ApplicantStatus = ApplicantStatus = {}));
