import {IPhotoFile} from "./user";

interface ICreateCategoryFormData {
    'category-photo': IPhotoFile;
    name: string;
    description: string;
}
interface ICategory {
    id: number;
    name: string;
    description: string;
    photo: string;
    created: string;
}
export {
    ICreateCategoryFormData,
    ICategory
}