interface IToppingFormData {
    type: ToppingCategoryType;
    forPizzaSize: ToppingForPizzaSize;
    name: string;
    light: number;
    standard: number;
    double: number;
    extra: number;
}

interface ITopping extends IToppingFormData {
    id: number;
}

enum ToppingCategoryType {
    STANDARD="STANDARD",
    EXTRA="EXTRA"
}  
enum ToppingForPizzaSize {
   SMALL="SMALL",
   MEDIUM="MEDIUM",
   LARGE="LARGE",
}
  
export {
    IToppingFormData,
    ITopping,
    ToppingCategoryType,
    ToppingForPizzaSize
}
