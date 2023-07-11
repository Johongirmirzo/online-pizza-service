import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma";
import { IDip, Status, IMenuItem, IPiece } from "../../types/menu";
import cloudinary, { options } from "../../config/cloudinary";


const MenuService = {
    async getAllDips() {
        return await prisma.dip.findMany({orderBy: [{created: "desc"}]});
    },
    async getDip(id: number) {
        try {
            const dip = await prisma.dip.findUnique({ where: { id } });
            if (!dip) {
                return { dip: null, statusCode: 404, error: "Dip has not been found" }
            } else {
                return { dip, statusCode: 200, error: "" }
            }
        } catch (err) {
            return { dip: null, statusCode: 400, error: "Bad Request!" }
        }
    },
    async createDip(dipData: IDip, dipPhotoFile: any) {
        try {      
            const dip = await prisma.dip.findUnique({where: {type: dipData.type}})
            if(dip) {
                if (dipPhotoFile) {
                    fs.rm(path.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), ()=>{});
                }
                return { newDip: null, statusCode: 409, error: `Current dip: [${dipData.type}] already exists!` }
            } else {
                const nutritionalValue = JSON.parse(dipData.nutritionalValue)
                const dipPhoto = await cloudinary.v2.uploader.upload(dipPhotoFile.path, options);
                const newDip = await prisma.dip.create({
                    data: {
                        ...dipData,
                        price: Number(dipData.price),
                        vegan: Boolean(dipData.vegan),
                        weight: Number(dipData.weight),
                        categoryId: Number(dipData.categoryId),
                        photo: dipPhoto.secure_url,
                        photo_id: dipPhoto.public_id,
                        nutritionalValue
                    }
                });
                return { newDip, statusCode: 201, error: "" }
            }
        }
        catch (err: any) {
            console.log(err)
            if (dipPhotoFile) {
                fs.rm(path.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), ()=>{});
            }
            return { newDip: null, statusCode: 400, error: "Bad Request!" }
        }
    },
    async editDip(id: number, data: IDip, dipPhotoFile: any) {
        try {
            let dipData = {};
            const dipWithGivenData = await prisma.dip.findUnique({where: {type: data.type}})
            const dip = await prisma.dip.findUnique({ where: { id } });
            if (!dip) {
                if (dipPhotoFile) {
                    fs.rm(path.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), ()=>{});
                }
                return {statusCode: 404, error: "Dip's not been found!"}
            } else {
                 
                if(dipWithGivenData){
                    if(dipWithGivenData.id !== dip.id &&
                       dipWithGivenData.type === data.type ){
                        return {statusCode: 409, error: `Dip type ${dip.type} is already exists!`}
                    }
                }
                
                dipData = Object.entries(data).reduce((obj, el) => {
                    return el[0] === "type" ? { ...obj, [el[0]]: el[1] } : { ...obj, [el[0]]: JSON.parse(el[1]) }
                }, {});
               
                if (dipPhotoFile) {
                    const imageSplit = dip.photo.split("/") as [];
                    const imgPath = imageSplit[imageSplit.length - 1] as string;
                    console.log(imgPath)
                    fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`));        
                    await cloudinary.v2.uploader.destroy(dip.photo_id);
                    const dipPhoto = await cloudinary.v2.uploader.upload(dipPhotoFile.path, options);
                    await prisma.dip.update({
                        where: { id },
                        data: {
                            ...dipData,
                            photo: dipPhoto.secure_url,
                            photo_id: dipPhoto.public_id,
                            updated: new Date(),
                        }
                    })
                    
                    return { statusCode: 200, error: "" }
                } else {
                    await prisma.dip.update({
                        where: { id },
                        data: {
                            ...dipData,
                            updated: new Date(),
                        }
                    });
                    return {statusCode: 200, error: "" }
                }
            }
        } catch (err: any) {
            console.log(err)
            if (dipPhotoFile) {
                fs.rm(path.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), ()=>{});
            }
            return { statusCode: 400, error: "Bad Request!" }
        }
    },
    async changeDipStatus(id: number, status: Status) {
        try {
            const dip = await prisma.dip.findUnique({ where: { id } });
            if (!dip) {
                return { statusCode: 404, error: "Dip has not been found!" }
            } else {
                await prisma.dip.update({
                    where: { id },
                    data: {
                        status,
                        updated: new Date()
                    }
                })
                return { statusCode: 200, error: "" }
            }
        } catch (err) {
            return { statusCode: 400, error: "Bad Request!" }
        }
    },
    async deleteDip(id: number) {
        try {
            const dip = await prisma.dip.findUnique({ where: { id } });
            if (!dip) {
                return { statusCode: 404, error: "Dip has not been found!" }
            } else {
                const imageSplit = dip.photo.split("/") as [];
                const imgPath = imageSplit[imageSplit.length - 1] as string
                fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`));
                await cloudinary.v2.uploader.destroy(dip.photo_id);
                await prisma.dip.delete({ where: { id } });
                return { statusCode: 204, error: "" }
            }
        } catch (err) {
            return { statusCode: 400, error: "Bad Request!" }
        }
    },


    async getAllMenuItems() {
        return await prisma.menuItem.findMany({orderBy: [{created: "desc"}]});
    },
    async getMenuItem(menuItemId: number) {
        try {
            const menuItem = await prisma.menuItem.findUnique({where: {id: menuItemId}});
            return menuItem ? {menuItem, statusCode: 200, error: ""} : {menuItem: null, statusCode: 404, error: "Menu Item's not been found"}
        }catch(err){
            return {menuItem: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async createMenuItem(data: IMenuItem, menuItemPhotos: any) {
        const menuItemData = Object
            .entries(data)
            .reduce((obj, el) =>
                /pieces/i.test(el[0]) ? ({ ...obj, [el[0]]: JSON.parse(el[1]) }) : ({ ...obj, [el[0]]: el[1] }), {}) as IMenuItem
              
        const removePhoto = ()=>{
            if (menuItemPhotos.small) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${menuItemPhotos.small[0].filename}`))
            }
            if (menuItemPhotos.medium) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${menuItemPhotos.medium[0].filename}`))
            }
            if (menuItemPhotos.large) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${menuItemPhotos.large[0].filename}`))
            }
        }
        const isThereDuplicateMenuItemSize = (parsedMenuItemSizes: any)=>{
            for(let i = 0; i < parsedMenuItemSizes.length; i++) {
                for(let j = i + 1; j < parsedMenuItemSizes.length; j++) {
                    if(parsedMenuItemSizes[i].size === parsedMenuItemSizes[j].size) {
                        return parsedMenuItemSizes[i].size
                    }
                }
            }
        }

        try {
            const menuItem = await prisma.menuItem.findFirst({ where: { name: data.name } });
            if (menuItem) {
                removePhoto();
                return { newMenuItem: null, statusCode: 409, error: `Current menu item ${menuItem.name} already in the menu!` }
            } else {
                if(isThereDuplicateMenuItemSize(menuItemData.pieces)){
                    const menuItemSize = isThereDuplicateMenuItemSize(menuItemData.pieces)
                    return {newPizza: null, statusCode: 400, error: `There can't be duplicate menu item sizes. Menu item size ${menuItemSize} is duplicated!`}
                }

                let smallPhoto, mediumPhoto, largePhoto;

                if (menuItemPhotos.small) {
                    smallPhoto = await cloudinary.v2.uploader.upload(menuItemPhotos.small[0].path, options);
                }
                if (menuItemPhotos.medium) {
                    mediumPhoto = await cloudinary.v2.uploader.upload(menuItemPhotos.medium[0].path, options);
                }
                if (menuItemPhotos.large) {
                    largePhoto = await cloudinary.v2.uploader.upload(menuItemPhotos.large[0].path, options);
                };

                const setPhoto = (index: number, cloudinaryPhoto: any)=>{
                    menuItemData.pieces[index].photo = cloudinaryPhoto?.secure_url;
                    menuItemData.pieces[index].photo_id = cloudinaryPhoto?.public_id;
                }
                for (let i = 0; i < menuItemData.pieces.length; i++) {                    
                    switch (menuItemData.pieces[i].size.toLowerCase()) {
                        case "small":
                            if (smallPhoto) {
                                setPhoto(i, smallPhoto);
                            }
                            break;
                        case "medium":
                            if (mediumPhoto) {
                                setPhoto(i, mediumPhoto);
                            }
                            break;
                        case "large":
                            if (largePhoto) {
                                setPhoto(i, largePhoto);
                            }
                            break;
                    }
                }
                console.log(menuItemData)
                const newItem = await prisma.menuItem.create({
                    data: {
                        ...menuItemData,
                        vegan: JSON.parse(`${menuItemData.vegan}`),
                        categoryId: Number(menuItemData.categoryId),
                        pieces: JSON.stringify(menuItemData.pieces)
                    }
                });
                return { newMenuItem: newItem, statusCode: 201, error: "" }
            }
        } catch (err: any) {
            console.log(err)
            removePhoto();
            return { newMenuItem: null, statusCode: 400, error: "Bad Request!" }
        }
    },
    async editMenuItem(menuItemId: number, data: IMenuItem, menuItemPhotos: any) {
        const menuItemData = Object
            .entries(data)
            .reduce((obj, el) =>
                /pieces/i.test(el[0]) ? ({ ...obj, [el[0]]: JSON.parse(el[1]) }) : ({ ...obj, [el[0]]: el[1] }), {}) as IMenuItem

        const removePhoto = ()=>{
            if (menuItemPhotos.small) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${menuItemPhotos.small[0].filename}`))
            }
            if (menuItemPhotos.medium) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${menuItemPhotos.medium[0].filename}`))
            }
            if (menuItemPhotos.large) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${menuItemPhotos.large[0].filename}`))
            }
        };
        const isThereDuplicateMenuItemSize = (parsedMenuItemSizes: any)=>{
            for(let i = 0; i < parsedMenuItemSizes.length; i++) {
                for(let j = i + 1; j < parsedMenuItemSizes.length; j++) {
                    if(parsedMenuItemSizes[i].size === parsedMenuItemSizes[j].size) {
                        return parsedMenuItemSizes[i].size
                    }
                }
            }
        }

        try {
            const menuItemWithGivenData = await prisma.menuItem.findUnique({where: {name: data.name}})
            const menuItem = await prisma.menuItem.findUnique({where: {id: menuItemId}});
            
            if(!menuItem) {
                removePhoto();
                return { statusCode: 404, error: `Menu item has not been found!` }
            } else {
                const menuItemParsedPieces = JSON.parse(`${menuItem.pieces}` as string)
                let modifiedPieces;

                if(menuItemWithGivenData) {
                    if(menuItem.id !== menuItemWithGivenData.id &&
                        menuItemWithGivenData.name === menuItemData.name) {
                            removePhoto();
                            return { statusCode: 409, error: `Current menu item ${menuItemData.name} already in the menu!` }
                        }
                }
                
                if(isThereDuplicateMenuItemSize(menuItemData.pieces)){
                    const menuItemSize = isThereDuplicateMenuItemSize(menuItemData.pieces)
                    removePhoto();
                    return {newPizza: null, statusCode: 400, error: `There can't be duplicate menu item sizes. Menu item size ${menuItemSize} is duplicated!`}
                }
                
                let smallPhoto, mediumPhoto, largePhoto;

                if (menuItemPhotos.small) {
                    smallPhoto = await cloudinary.v2.uploader.upload(menuItemPhotos.small[0].path, options);
                }
                if (menuItemPhotos.medium) {
                    mediumPhoto = await cloudinary.v2.uploader.upload(menuItemPhotos.medium[0].path, options);
                }
                if (menuItemPhotos.large) {
                    largePhoto = await cloudinary.v2.uploader.upload(menuItemPhotos.large[0].path, options);
                };
                 
                const removeImgFromDirectory = async (index: number)=>{
                    const imageSplit = menuItemParsedPieces[index].photo.split("/") as [];
                    const imgPath = imageSplit[imageSplit.length - 1] as string;
                    fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`));
                    await cloudinary.v2.uploader.destroy(menuItemParsedPieces[index].photo_id);
                }
                 
                const updateMenuItemPhoto = (index: number, cloudinaryPhoto: any)=>{
                    menuItemData.pieces[index].photo = cloudinaryPhoto?.secure_url;
                    menuItemData.pieces[index].photo_id = cloudinaryPhoto?.public_id;
                }

                if((menuItemParsedPieces.length > menuItemData.pieces.length) && menuItemData.pieces.length > 0) {
                    for(let i = 0; i < menuItemParsedPieces.length; i++){
                        let isThereMatch = false;

                       for(let j = 0; j < menuItemData.pieces.length; j++){
                            if(menuItemParsedPieces[i].photo_id === menuItemData.pieces[j]?.photo_id){
                                isThereMatch = true;
                                break;   
                            }
                            switch (menuItemData.pieces[j].size.toLowerCase()) {
                                case "small":
                                    if (smallPhoto) {                                    
                                        updateMenuItemPhoto(j, smallPhoto);
                                    }
                                    break;
                                case "medium":
                                    if (mediumPhoto) {
                                        updateMenuItemPhoto(j, mediumPhoto);
                                    }
                                    break;
                                case "large":
                                    if (largePhoto) {
                                        updateMenuItemPhoto(j, largePhoto);
                                    }
                                    break;
                                }
                       }
                       if(!isThereMatch){
                        await removeImgFromDirectory(i)
                       }
                       
                    }
                    modifiedPieces = menuItemData.pieces
                } else if(menuItemData.pieces.length){
                    for (let i = 0; i < menuItemData?.pieces?.length; i++) {
                        switch (menuItemData.pieces[i].size.toLowerCase()) {
                        case "small":
                            if (smallPhoto) {
                                console.log(menuItemParsedPieces[i]?.size)
                                if(menuItemParsedPieces[i]){
                                    await removeImgFromDirectory(i);
                                }
                                updateMenuItemPhoto(i, smallPhoto);
                            }
                            break;
                        case "medium":
                            if (mediumPhoto) {
                                console.log(menuItemParsedPieces[i]?.size)
                                if(menuItemParsedPieces[i]){
                                    await removeImgFromDirectory(i);
                                }
                                updateMenuItemPhoto(i, mediumPhoto);
                            }
                            break;
                        case "large":
                            if (largePhoto) {
                                console.log(menuItemParsedPieces[i]?.size)
                                if(menuItemParsedPieces[i]){
                                    await removeImgFromDirectory(i);                          
                                }
                                updateMenuItemPhoto(i, largePhoto);
                            }
                            break;
                        }
                    }
                    modifiedPieces = menuItemData.pieces
                } else if(!menuItemData.pieces.length && menuItemParsedPieces.length){
                    for(let i = 0; i < menuItemParsedPieces.length; i++){
                        await removeImgFromDirectory(i);
                    }
                    modifiedPieces = [] 
                }
                
                await prisma.menuItem.update({
                    where: {id: menuItemId},
                    data: {
                        ...menuItemData,
                        vegan: menuItemData?.vegan ? JSON.parse(`${menuItemData.vegan}`) : menuItem?.vegan,
                        categoryId: menuItemData?.categoryId ? Number(menuItemData.categoryId) : menuItem?.categoryId,
                        pieces: JSON.stringify(modifiedPieces),
                        updated: new Date()
                    }
                });
                return {statusCode: 200, error: "" }
            }
        } catch (err: any) {
            console.log(err.message)
            removePhoto();
            return {statusCode: 400, error: "Bad Request!" }
        }
    },
    async changeMenuItemStatus(menuItemId: number, status: Status) {
        try {
            const menuItem = await prisma.menuItem.findUnique({where: {id: menuItemId}});
            if(!menuItem) {
                return {statusCode: 404, error: "Menu item has not been found"}
            } else {
                await prisma.menuItem.update({
                    where: {id: menuItemId},
                    data: {
                        status
                    }
                })
                return {statusCode: 200, error: ""}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },
    async deleteMenuItem(menuItemId: number) {
        try {
            const menuItem = await prisma.menuItem.findUnique({where: {id: menuItemId}});
            
            if(!menuItem) {
                return {statusCode: 404, error: "Menu item has not been found"}
            } else {
                const pieces = JSON.parse(menuItem.pieces[0] as string);

                for(const piece of pieces) {
                    const imageSplit = piece.photo.split("/") as [];
                    const imgPath = imageSplit[imageSplit.length - 1] as string;
                    fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`));
                    await cloudinary.v2.uploader.destroy(piece.photo_id);
                }
                await prisma.menuItem.delete({where: {id: menuItemId}})
                return {statusCode: 204, error: ""}
            }
        }catch(err){
            console.log("Delete Menu Item Errorr", err)
            return {statusCode: 400, error: "Bad Request!"}
        }
    },


    async getAllPizzas(){
        return await prisma.pizza.findMany({include: {pizzaSizes: true}, orderBy: [{created: "desc"}]})
    },
    async getPizza(id: number){
        try {
            const pizza = await prisma.pizza.findUnique({where: {id}, include: {pizzaSizes: true}})
            if(!pizza){
                return {pizza: null, statusCode: 404, error: "Pizza's not been found!"}
            } else {
                return {pizza, statusCode: 200, error: ""}
            }
        }catch(err){
            return {pizza: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async createPizza(pizzaData: any, pizzaPhotoFiles: any){
        const removePhoto = ()=>{
            if (pizzaPhotoFiles.small) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${pizzaPhotoFiles.small[0].filename}`))
            }
            if (pizzaPhotoFiles.medium) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${pizzaPhotoFiles.medium[0].filename}`))
            }
            if (pizzaPhotoFiles.large) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${pizzaPhotoFiles.large[0].filename}`))
            }
        };
        const isThereDuplicatePizzaSize = (parsedPizzaSizes: any)=>{
            for(let i = 0; i < parsedPizzaSizes.length; i++) {
                for(let j = i + 1; j < parsedPizzaSizes.length; j++) {
                    if(parsedPizzaSizes[i].size === parsedPizzaSizes[j].size) {
                        return parsedPizzaSizes[i].size
                    }
                }
            }
        }
        try {
            const pizza = await prisma.pizza.findUnique({where: {name: pizzaData.name}});
            if(pizza) {
                removePhoto();
                return {newPizza: null, statusCode: 409, error: `Pizza with the given name: ${pizzaData.name} already exists!`}
            } else {
                const parsedPizzaSizes = JSON.parse(pizzaData.pizzaSizes)
                    .map((pizzaSize: any) => ({...pizzaSize, price: pizzaSize.price ? pizzaSize.price : "", weight: pizzaSize.weight ? pizzaSize.weight : ""}))
                
                if(isThereDuplicatePizzaSize(parsedPizzaSizes)){
                    const pizzaSize = isThereDuplicatePizzaSize(parsedPizzaSizes)
                    return {newPizza: null, statusCode: 400, error: `There can't be duplicate pizza sizes. Pizza size ${pizzaSize} is duplicated!`}
                }

                let smallPhoto, mediumPhoto, largePhoto;
                
                if (pizzaPhotoFiles.small) {
                    smallPhoto = await cloudinary.v2.uploader.upload(pizzaPhotoFiles.small[0].path, options);
                }
                if (pizzaPhotoFiles.medium) {
                    mediumPhoto = await cloudinary.v2.uploader.upload(pizzaPhotoFiles.medium[0].path, options);
                }
                if (pizzaPhotoFiles.large) {
                    largePhoto = await cloudinary.v2.uploader.upload(pizzaPhotoFiles.large[0].path, options);
                };

                 
                const setPhoto = (index: number, cloudinaryPhoto: any)=>{
                    parsedPizzaSizes[index].photo = cloudinaryPhoto?.secure_url;
                    parsedPizzaSizes[index].photo_id = cloudinaryPhoto?.public_id;
                }
                for (let i = 0; i < parsedPizzaSizes.length; i++) {                    
                    switch (parsedPizzaSizes[i].size.toLowerCase()) {
                        case "small":
                            if (smallPhoto) {
                                setPhoto(i, smallPhoto);
                            }
                            break;
                        case "medium":
                            if (mediumPhoto) {
                                setPhoto(i, mediumPhoto);
                            }
                            break;
                        case "large":
                            if (largePhoto) {
                                setPhoto(i, largePhoto);
                            }
                            break;
                    }
                }
                console.log(parsedPizzaSizes)
                const newPizza = await prisma.pizza.create({
                    data: {
                        name: pizzaData.name,
                        spiceLevel: pizzaData.spiceLevel,
                        categoryId: Number(pizzaData.categoryId),
                        vegan: JSON.parse(`${pizzaData.vegan}`),
                        pizzaSizes: {
                            create: [
                                ...parsedPizzaSizes.map((pizzaSize: any) => ({...pizzaSize, price: `${pizzaSize.price}`, weight: `${pizzaSize.weight}`}))
                            ]
                        }
                    }
                });
                return {newPizza, statusCode: 200, error: ""}
            }
        }catch(err: any){
            removePhoto();
            console.log(err)
            return {newPizza: null, statusCode: 400, error: "Bad Request!" }
        }
    },
    async editPizza(pizzaId: number, pizzaData: any, pizzaPhotoFiles: any){
        const removePhoto = ()=>{
            if (pizzaPhotoFiles.small) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${pizzaPhotoFiles.small[0].filename}`))
            }
            if (pizzaPhotoFiles.medium) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${pizzaPhotoFiles.medium[0].filename}`))
            }
            if (pizzaPhotoFiles.large) {
                fs.rmSync(path.join(__dirname, `../../assets/images/${pizzaPhotoFiles.large[0].filename}`))
            }
        };
        const isThereDuplicatePizzaSize = (parsedPizzaSizes: any)=>{
            for(let i = 0; i < parsedPizzaSizes.length; i++) {
                for(let j = i + 1; j < parsedPizzaSizes.length; j++) {
                    if(parsedPizzaSizes[i].size === parsedPizzaSizes[j].size) {
                        return parsedPizzaSizes[i].size
                    }
                }
            }
        }
        try {
            const pizza = await prisma.pizza.findUnique({where: {id: pizzaId}, include: {pizzaSizes: true}})
            const pizzaWithGivenData = await prisma.pizza.findUnique({where: {name: pizzaData.name}});
            if(!pizza) {
                removePhoto();
                return {statusCode: 404, error: "Pizza's not been found!"}
            } else {
                if(pizzaWithGivenData){
                    console.log(pizzaWithGivenData.id, pizza.id)
                    if(pizzaWithGivenData.id !== pizza.id &&
                       pizzaWithGivenData.name === pizzaData.name){
                        return {statusCode: 409, error: `Pizza with the given name: ${pizzaData.name} already exists!`}
                    }
                }
                const parsedPizzaSizes = JSON.parse(pizzaData.pizzaSizes)
                    .map((pizzaSize: any) => ({...pizzaSize, price: pizzaSize.price ? pizzaSize.price : "" , weight: pizzaSize.weight ? pizzaSize.weight: ""}))

                if(isThereDuplicatePizzaSize(parsedPizzaSizes)){
                    const pizzaSize = isThereDuplicatePizzaSize(parsedPizzaSizes)
                    return {newPizza: null, statusCode: 400, error: `There can't be duplicate pizza sizes. Pizza size ${pizzaSize} is duplicated!`}
                }

                let smallPhoto, mediumPhoto, largePhoto;
                
                if (pizzaPhotoFiles.small) {
                    smallPhoto = await cloudinary.v2.uploader.upload(pizzaPhotoFiles.small[0].path, options);
                }
                if (pizzaPhotoFiles.medium) {
                    mediumPhoto = await cloudinary.v2.uploader.upload(pizzaPhotoFiles.medium[0].path, options);
                }
                if (pizzaPhotoFiles.large) {
                    largePhoto = await cloudinary.v2.uploader.upload(pizzaPhotoFiles.large[0].path, options);
                };

                const removeImgFromDirectory = async (index: number)=>{
                     
                    const imageSplit = pizza.pizzaSizes[index].photo.split("/") as [];
                    const imgPath = imageSplit[imageSplit.length - 1] as string;
                    fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`));
                    await cloudinary.v2.uploader.destroy(pizza.pizzaSizes[index].photo_id);
                }
                const setPhoto = (index: number, cloudinaryPhoto: any)=>{
                    parsedPizzaSizes[index].photo = cloudinaryPhoto?.secure_url;
                    parsedPizzaSizes[index].photo_id = cloudinaryPhoto?.public_id;
                }
                for (let i = 0; i < parsedPizzaSizes.length; i++) {                    
                    switch (parsedPizzaSizes[i].size.toLowerCase()) {
                        case "small":
                            if (smallPhoto) {
                                await removeImgFromDirectory(i)
                                setPhoto(i, smallPhoto);
                            }
                            break;
                        case "medium":
                            if (mediumPhoto) {
                                await removeImgFromDirectory(i)
                                setPhoto(i, mediumPhoto);
                            }
                            break;
                        case "large":
                            if (largePhoto) {
                                await removeImgFromDirectory(i)
                                setPhoto(i, largePhoto);
                            }
                            break;
                    }
                }
                await prisma.pizza.update({
                    where: {id: pizzaId},
                    data: {
                        name: pizzaData.name,
                        spiceLevel: pizzaData.spiceLevel,
                        categoryId: Number(pizzaData.categoryId),
                        vegan: JSON.parse(`${pizzaData.vegan}`)
                    }
                });

                for(const pizzaSize of parsedPizzaSizes){
                    await prisma.pizzaSize.update({
                        where: {id: pizzaSize.id},
                        data: {
                            ...pizzaSize,
                             
                        }
                    })
                }
                
                return {statusCode: 200, error: ""}
            }
        }catch(err: any){
            removePhoto();
            console.log(err)
            return {statusCode: 400, error: "Bad Request!" }
        }
    },
    async changePizzaStatus(id: number, status: Status){
        try {
            const pizza = await prisma.pizza.findUnique({where: {id}});
            if(!pizza) {
                return {statusCode: 404, error: "Pizza has not been found!"}
            } else {
                await prisma.pizza.update({
                    where: {id},
                    data: {
                        status,
                        updated: new Date()
                    }
                })
                return {statusCode: 200, error: ""}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },
    async deletePizza(id: number){
        try {
            const pizza = await prisma.pizza.findUnique({where: {id}, include: {pizzaSizes: true}});
            if(!pizza) {
                return {statusCode: 404, error: "Pizza has not been found!"}
            } else {
                const pizzaSizes = pizza.pizzaSizes;
                for(const pizzaSize of pizzaSizes) {
                    const imageSplit = pizzaSize.photo.split("/") as [];
                    const imgPath = imageSplit[imageSplit.length - 1] as string;
                    fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`));
                    await cloudinary.v2.uploader.destroy(pizzaSize.photo_id);
                }
                await prisma.pizza.delete({
                    where: {id}
                })
                return {statusCode: 204, error: ""}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },
}

export default MenuService;