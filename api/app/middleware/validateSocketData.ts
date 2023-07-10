export const validateSocketData = async (validation: any, data: any)=>{
    try {
        await validation.validate(data, {abortEarly: false});
        return null;
    }catch(err: any){
        return err.errors
    }
}