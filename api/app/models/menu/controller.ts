import {Request, Response} from "express";
import MenuService from "./service";

const MenuController = {
    async getAllDips(req: Request, res: Response){
        const dips = await MenuService.getAllDips();
        return res.json({data: dips})
    },
    async getDip(req: Request, res: Response){
        const id = Number(req.params.id);
        const {dip, statusCode, error} = await MenuService.getDip(id);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({data: dip})
        }
    },
    async createDip(req: Request, res: Response){
        const {newDip, statusCode, error} = await MenuService.createDip(req.body, req.file);
        if(statusCode === 404 || statusCode === 400 || statusCode === 409){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({data: newDip})
        }
    },
    async editDip(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await MenuService.editDip(id, req.body, req.file);
        if(statusCode === 404 || statusCode === 400 || statusCode === 409){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({message: "Dip is edited successfully"})
        }
    },
    async changeDipStatus(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await MenuService.changeDipStatus(id, req.body.status);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({message: "Dip status is changed successfully"})
        }
    },
    async deleteDip(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await MenuService.deleteDip(id);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).end()
        }

    },


    async getAllMenuItems(req: Request, res: Response){
        const menuItems = await MenuService.getAllMenuItems();
        return res.json({data: menuItems});
    },  
    async getMenuItem(req: Request, res: Response){
        const id = Number(req.params.id);
        const {menuItem, statusCode, error} = await MenuService.getMenuItem(id);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: menuItem});
        }
    },  
    async createMenuItem(req: Request, res: Response){
        const {newMenuItem, statusCode, error} = await MenuService.createMenuItem(req.body, req.files)
        if(statusCode === 404 || statusCode === 400 || statusCode === 409){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({data: newMenuItem})
        }
    },
    async editMenuItem(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await MenuService.editMenuItem(id, req.body, req.files);
        if(statusCode === 400 || statusCode === 404 || statusCode === 409){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({message: "Menu item status is edited successfully!"})
        }
    },
    async changeMenuItemStatus(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await MenuService.changeMenuItemStatus(id, req.body.status);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({message: "Menu item status is changed successfully!"})
        }
    },
    async deleteMenuItem(req: Request, res: Response){
        const id = Number(req.params.id);
        const {error, statusCode} = await MenuService.deleteMenuItem(id);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).end()
        }
    },

    async getAllPizzas(req: Request, res: Response){
        const pizzas = await MenuService.getAllPizzas();
        return res.json({data: pizzas})
    },
    async getPizza(req: Request, res: Response){
        const id = Number(req.params.id);
        const {pizza, statusCode, error} = await MenuService.getPizza(id);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: pizza})
        }
    },
    async createPizza(req: Request, res: Response){
        const {newPizza, statusCode, error} = await MenuService.createPizza(req.body, req.files);
        if(statusCode === 404 || statusCode === 400 || statusCode === 409){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: newPizza})
        }
    },
    async editPizza(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await MenuService.editPizza(id, req.body, req.files);
        if(statusCode === 404 || statusCode === 400 || statusCode === 409){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: {message: "Pizza is updated successfully!"}});
        } 
    },
    async changePizzaStatus(req: Request, res: Response){
        const id = Number(req.params.id)
        const {statusCode, error} = await MenuService.changePizzaStatus(id, req.body.status);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: {message: "Pizza status is changed successfully!"}})
        }
    },
    async deletePizza(req: Request, res: Response){
        const id = Number(req.params.id)
        const {statusCode, error} = await MenuService.deletePizza(id);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).end()
        }
    },
}

export default MenuController;