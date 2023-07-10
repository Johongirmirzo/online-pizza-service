import {API} from "./index";
import {ENDPOINTS} from "~/config/endpoints";

export const createApplicant = async (applicantData: any)=>{
    return await API.post(ENDPOINTS.CREATE_APPLICANT, applicantData);
}
