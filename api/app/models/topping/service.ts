import { prisma } from "../../config/prisma";
import { ITopping } from "../../types/topping";

const ToppingService = {
    async getAllToppings() {
        return await prisma.topping.findMany({orderBy: [{created: "desc"}]})
    },
    async getTopping(id: number) {
        try {
            const topping = await prisma.topping.findUnique({where: {id}});
            if(!topping){
                return {topping: null, statusCode: 404, error: "Topping has not been found!"}
            } else {
                return {topping, statusCode: 200, error: ""}
            }
        }catch(err){
            return {topping: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async createTopping(toppingData: ITopping) {
        try {
           const toppingExistWithGivenData = await prisma.topping.findFirst({
            where: {
                AND: [
                    {type: toppingData.type},
                    {forPizzaSize: toppingData.forPizzaSize},
                    {name: toppingData.name},
                ]
            }
           });
           if(toppingExistWithGivenData){
            return {newTopping: null, statusCode: 409, error: `Topping with name: [${toppingExistWithGivenData.name}] and type [${toppingExistWithGivenData.type}] and pizza size [${toppingExistWithGivenData.forPizzaSize}] already exists!`}
           } 
           const newTopping = await prisma.topping.create({
            data: {
                ...toppingData
            }
           })
           return {newTopping, statusCode: 201, error: ""}
        } catch(err: any){
            return {newTopping: null, statusCode: 400, error: "Bad Request"}
        }
    },
    async editTopping(id: number, toppingData: ITopping) {
        try {
            const toppingExistWithGivenData = await prisma.topping.findFirst({
                where: {
                    AND: [
                        {type: toppingData?.type},
                        {forPizzaSize: toppingData?.forPizzaSize},
                        {name: toppingData?.name},
                    ]
                }
            });
            const topping = await prisma.topping.findUnique({where: {id}});
            console.log("TOpping with given data",toppingExistWithGivenData)
            if(!topping) {
                return {statusCode: 404, error: "Topping's not been found"}
            } else {
                if(toppingExistWithGivenData && topping.id !== toppingExistWithGivenData.id){
                    return {statusCode: 409, error: `Topping with name: [${toppingExistWithGivenData.name}] and type [${toppingExistWithGivenData.type}] and pizza size [${toppingExistWithGivenData.forPizzaSize}] already exists!`}
                }
                await prisma.topping.update({
                    where: {id},
                    data: {
                        ...toppingData,
                        updated: new Date()
                    }
                });

                return {statusCode: 200, error: ""}
            }
        } catch(err: any){
            console.log(err.message)
            return {statusCode: 400, error: "Bad Request"}
        }
    },
    async deleteTopping(id: number) {
        try {
            const topping = await prisma.topping.findUnique({where: {id}});
            if(!topping){
                return {statusCode: 404, error: "Current topping does not exist!"}
            } else {
                await prisma.topping.delete({where: {id}})
                return {statusCode: 204, error: ""}
            }
        }catch(err){
            return {statusCode: 400, error: "Bad Request"}
        }
    },

}

export default ToppingService;