import fs from "fs";
import path from "path";
import { prisma } from "../../config/prisma";
import { IApplicant, ApplicantRole, EmploymentType, DrivingLicense, ITeamMember, IDriver, IManager, ApplicantStatus } from "../../types/applicant";
import cloudinary, {options} from "../../config/cloudinary";

const ApplicantService = {
    async getAllApplicants(){
        return await prisma.application.findMany({include: {teamMembers: true, drivers: true, managers: true}})
    },
    async getApplicant(id: number){
        try {
            const applicant = await prisma.application.findUnique({where: {id}});
            if(!applicant) {
                return {applicant: null, statusCode: 404, error: "Applicant's not been found!"}
            } else {
                return {applicant, statusCode: 200, error: ""}
            }

        }catch(err){
            return {applicant: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async createApplicant(data: any, files: any){
        try {
            let applicantData;
            
            const applicationData = Object.entries(data).filter(d => d[0] !== "applicant").reduce((obj, el) =>{
                const encodedData = el[1] as string
                if(/experiences|languages|computerSkills/i.test(el[0])){
                    console.log(el[1], encodedData)
                    const parsedData = JSON.parse(encodedData);
                    
                    const key = el[0];
                    return {...obj, [key]: parsedData}
                }
                return {...obj, [el[0]]: el[0] == "hasBankAccount" ? JSON.parse(encodedData) : el[1]}
            }, {}) as IApplicant;
            
            
            const applicantPhoto = await cloudinary.v2.uploader.upload(files.applicantPhoto[0].path, options);
            const passportPhoto = await cloudinary.v2.uploader.upload(files.passportPhoto[0].path, options);
            const resume = await cloudinary.v2.uploader.upload(files.resume[0].path, options);
            switch(data.role){
                case "TEAM_MEMBER":
                    applicantData = JSON.parse(data.applicant) as ITeamMember;
                    const newTeamMember = await prisma.application.create({
                        data: {
                            ...applicationData,
                            birthDate: new Date(applicationData.birthDate),
                            dateOfJoining: new Date(applicationData.dateOfJoining),
                            photoUrl: applicantPhoto.secure_url,
                            photoId: applicantPhoto.public_id,
                            passportPhotoUrl: passportPhoto.secure_url,
                            passportPhotoId: applicantPhoto.public_id,
                            resumeUrl: resume.secure_url,
                            resumeId: applicantPhoto.public_id,
                            role: ApplicantRole[applicationData.role],
                            teamMembers: {
                                create: {
                                    ...applicantData,
                                    employmentType: EmploymentType[applicantData.employmentType]
                                }
                            }                            
                        }
                    })
                    return {newApplicant: newTeamMember, statusCode: 201, error: ""}
                case "DRIVER":
                    applicantData = JSON.parse(data.applicant) as IDriver;
                     
                    const newDriver = await prisma.application.create({
                        data: {
                            ...applicationData,
                            birthDate: new Date(applicationData.birthDate),
                            dateOfJoining: new Date(applicationData.dateOfJoining),
                            photoUrl: applicantPhoto.secure_url,
                            photoId: applicantPhoto.public_id,
                            passportPhotoUrl: passportPhoto.secure_url,
                            passportPhotoId: applicantPhoto.public_id,
                            resumeUrl: resume.secure_url,
                            resumeId: applicantPhoto.public_id,
                            role: ApplicantRole[applicationData.role],
                            drivers: {
                                create: {
                                    ...applicantData,
                                    drivingLicence: DrivingLicense[applicantData.drivingLicence],
                                    employmentType: EmploymentType[applicantData.employmentType]
                                }
                            }                            
                        }
                    })
                    return {newApplicant: newDriver, statusCode: 201, error: ""}
                case "MANAGER":
                case "AREA_COACH":
                    const panPhoto = await cloudinary.v2.uploader.upload(files.panPhoto[0].path, options);
                    applicantData = JSON.parse(data.applicant) as IManager;
                    
                    const newManager = await prisma.application.create({
                        data: {
                            ...applicationData,
                            birthDate: new Date(applicationData.birthDate),
                            dateOfJoining: new Date(applicationData.dateOfJoining),
                            photoUrl: applicantPhoto.secure_url,
                            photoId: applicantPhoto.public_id,
                            passportPhotoUrl: passportPhoto.secure_url,
                            passportPhotoId: applicantPhoto.public_id,
                            resumeUrl: resume.secure_url,
                            resumeId: applicantPhoto.public_id,
                            role: ApplicantRole[applicationData.role],
                            managers: {
                                create: {
                                    ...applicantData,
                                    panPhoto: panPhoto.secure_url,
                                    panPhotoId: panPhoto.public_id
                                }
                            }                            
                        }
                    })
                    return {newApplicant: newManager, statusCode: 201, error: ""}
                default:
                    return {newApplicant: null, statusCode: 400, error: "Bad Request"}
                }  
        }catch(err: any){
            console.log(err);
            fs.rm(path.join(__dirname, `../../assets/images/${files.applicantPhoto[0].path}`), ()=>{})
            fs.rm(path.join(__dirname, `../../assets/images/${files.passportPhoto[0].path}`), ()=>{})
            fs.rm(path.join(__dirname, `../../assets/images/${files.resume[0].path}`), ()=>{})
            return {newApplicant: null, statusCode: 400, error: "Bad Request"}
        }
    },
    
    async changeApplicantStatus(id: number, status: ApplicantStatus){
        const applicant = await prisma.application.findUnique({where: {id: id}});
        if(!applicant){
            return {error: "Applicant has not been found!", statusCode: 404}
        } else {
            await prisma.application.update({
                where: {id},
                data: {
                    applicationStatus: ApplicantStatus[status]
                }
            });
            return {error: "", statusCode: 200}
        }

    },
    async deleteApplicant(id: number){
        const applicant = await prisma.application.findUnique({where: {id}});
        if(!applicant){
            return {error: "User has not been found!", statusCode: 404}
        } else {
            if(/manager|area_coach/i.test(applicant.role)){
                const manager = await prisma.manager.findFirst({where: {applicantId: applicant.id}})
                if(manager){
                    await cloudinary.v2.uploader.destroy(manager.panPhotoId)
                }
            }
            await cloudinary.v2.uploader.destroy(applicant.photoId);
            await cloudinary.v2.uploader.destroy(applicant.passportPhotoId);
            await cloudinary.v2.uploader.destroy(applicant.resumeId);
            await prisma.application.delete({where: {id}});
            return {error: "", statusCode: 204}
        }
    },
}

export default ApplicantService