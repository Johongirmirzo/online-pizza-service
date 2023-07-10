import fs from 'fs';
import path from 'path';
import { prisma } from "../../config/prisma";
import cloudinary, {options} from '../../config/cloudinary';
import { ICategory, IEditCategory } from "../../types/category";
import {Status} from "../../types/menu";

const CategoryService = {
    async getAllCategories() {
        return await prisma.category.findMany({include: {pizzas: true, dips: true, menuItems: true}, orderBy: [{created: "desc"}]});
    },
    async getCategory(id: number) {
        return await prisma.category.findUnique({where: {id}, include: {pizzas: true, dips: true, menuItems: true}})
    },
    async createCategory(categoryData: ICategory, categoryPhotoFiles: any){
        try {
            const category = await prisma.category.findUnique({where: {name: categoryData.name}});
            if(category){
                if(categoryPhotoFiles){
                    fs.rmSync(path.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`))
                }
                return {newCategory: null, statusCode: 409, error: "Category with the given name already exists!"}
            } else {
                console.log(categoryPhotoFiles)

                const categoryPhoto = await cloudinary.v2.uploader.upload(categoryPhotoFiles.path, options)
                const newCategory = await prisma.category.create({data: {...categoryData, photo: categoryPhoto.secure_url, photo_id: categoryPhoto.public_id}});
                return {newCategory, statusCode: 201, error: ""};
            }
        } catch(err){
            if(categoryPhotoFiles){
                fs.rmSync(path.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`))
            }
            return {newCategory: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async editCategory(id: number, categoryData: IEditCategory, categoryPhotoFiles: any){
        try { 
            const category = await prisma.category.findUnique({where: {id}});
            const categoryWithGivenName = await prisma.category.findUnique({where: {name: categoryData?.name}})
           
            if(!category){
                if(categoryPhotoFiles){
                    fs.rmSync(path.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`))
                }
                return {statusCode: 404, error: "Category's not been found!"}
            } else {
                if(categoryWithGivenName){
                    if(categoryWithGivenName.name !== category.name){
                        if(categoryPhotoFiles){
                            fs.rmSync(path.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`))
                        }
                        return {statusCode: 409, error: "Category with the given name already exists!"}
                    }
                }
                let categoryPhoto;
                if(categoryPhotoFiles){
                    const imageSplit = category.photo.split("/") as [];
                    const imagePath = imageSplit[imageSplit.length - 1] as string;
                    
                    fs.rmSync(path.join(__dirname, `../../assets/images/${imagePath}`));
                    await cloudinary.v2.uploader.destroy(category.photo_id);
                    
                    categoryPhoto = await cloudinary.v2.uploader.upload(categoryPhotoFiles.path, options)
                }
                await prisma.category.update({
                    where: {id},
                    data: {
                        ...categoryData,
                        photo: categoryPhoto?.secure_url || category.photo,
                        photo_id: categoryPhoto?.public_id || category.photo_id,
                        updated: new Date()
                    }
                });
                return {statusCode: 200, error: ""};
            }
        } catch(err){
            if(categoryPhotoFiles){
                fs.rmSync(path.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`))
            }
            return {newCategory: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async deleteCategory(id: number){
        try {
            const category = await prisma.category.findUnique({where: {id}});
             
            if(!category){
                return {statusCode: 404, error: "Category's not been found!"}
            } else {
                const imageSplit = category.photo.split("/") as [];
                const imagePath = imageSplit[imageSplit.length - 1] as string;
                    
                fs.rmSync(path.join(__dirname, `../../assets/images/${imagePath}`));
                await cloudinary.v2.uploader.destroy(category.photo_id)
                await prisma.category.delete({where: {id}})
                return {statusCode: 204, error: ""}
            }
        }catch(err){
            return {statusCode: 400, error: "Bad request!"}
        }
    }
}


export default CategoryService;