import {IPhotoFile} from "./user";
 
interface IDipFormData {
    type: string;
    price: number;
    weight: number;
    vegan: boolean;
    'dip-photo': IPhotoFile;
    calorie: number;
    fats: number;
    proteins: number;
    categoryId: number;
    carbohydrates: number;
}

interface IDip {
    id: number;
    photo: string;
    type: string;
    price: number;
    weight: number;
    soldAmount: number;
    status: Status; 
    vegan: boolean;
    'dip-photo': IPhotoFile
    nutritionalValue: INutritionalValue;
    categoryId: number;
    created: string;
}

interface INutritionalValue {
    calorie: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

interface IMenuItemFormData {
    name: string;
    type: MenuItemType;
    spiceLevel: SpiceLevel;
    description: string;
    vegan: boolean;
    categoryId: number;
    calories: number;
    fats: number;
    proteins: number;
    carbohydrates: number;
    pieces: IPieceFormData[];
}

interface IMenuItem extends IMenuItemFormData {
    id: number;
    type: MenuItemType;
    spiceLevel: SpiceLevel;
    soldAmount: number;
    status: Status;
    created: string;
    vegan: boolean;
    pieces: IPiece[];
}

interface IPieceFormData {
    id: string;
    size: string;
    amount: string;
    price: number;
    weight: string;
    photo: IPhotoFile;
    nutritionalValue: INutritionalValue;
}
interface IPiece extends IPieceFormData {
    photo_id: string;
    nutritionalValue: INutritionalValue;
}

enum Status {
    PENDING="PENDING",
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE"
}

enum SpiceLevel {
    NOT_SPICY="NOT_SPICY",
    MILD="MILD",
    HOT="HOT"
}

enum MenuItemType {
    DRINKS="DRINKS",
    SNACKS="SNACKS",
    DESSERTS="DESSERTS",
    SALADS="SALADS"
}

export {IDip, IDipFormData, IMenuItemFormData, INutritionalValue, Status, IMenuItem, IPiece, SpiceLevel, MenuItemType};