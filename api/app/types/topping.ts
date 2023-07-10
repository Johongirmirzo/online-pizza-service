interface ITopping {
    type: ToppingCategoryType;
    forPizzaSize: ToppingForPizzaSize
    name: string;
    light: number;
    standard: number;
    double: number;
    extra: number;
    
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
    ITopping,
    ToppingCategoryType,
    ToppingForPizzaSize
}