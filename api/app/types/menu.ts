interface IDip {
    type: string;
    price: number;
    weight: number;
    vegan: boolean;
    nutritionalValue: string;
    categoryId: number;
}

interface INutritionalValue {
    calorie: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

interface IMenuItem {
    name: string;
    type: MenuItemType
    description: string;
    vegan: boolean;
    categoryId: string;
    calories: string;
    fats: string;
    proteins: string;
    carbohydrates: string;
    pieces: IPiece[];
}

interface IPiece {
    id: number;
    size: string;
    amount: string;
    price: number;
    weight: string;
    photo: string;
    photo_id: string;
}

enum Status {
    PENDING="PENDING",
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE"
}

enum MenuItemType {
    DRINKS="DRINKS",
    SNACKS="SNACKS",
    DESSERTS="DESSERTS",
    SALADS="SALADS"

}
  

export {IDip, INutritionalValue, Status, IMenuItem, IPiece, MenuItemType};