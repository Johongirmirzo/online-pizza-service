import {API} from "./index";
import { ENDPOINTS } from "~/config/endpoints";

const getAllApplicants = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_APPLICANTS)
}
const getApplicant = async (applicantId: number)=>{
    return await API.get(`${ENDPOINTS.GET_APPLICANT}/${applicantId}`)
}
const changeApplicantStatus = async (applicantId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_APPLICANT_STATUS}/${applicantId}`, {status})
}
const deleteApplicant = async (applicantId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_APPLICANT}/${applicantId}`)
}

export {
    getAllApplicants,
    getApplicant,
    changeApplicantStatus,
    deleteApplicant
}