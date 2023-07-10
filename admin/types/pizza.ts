
interface IPizzaFormData {
    name: string;
    spiceLevel: string;
    categoryId: number;
    vegan: boolean;
    pizzaSizes: IPizzaSize[];
}
interface IPizza extends IPizzaFormData {
    id: number;
}

interface IPizzaSize {
    size: string;
    price: number;
    photo: string;
    circumfarance: string;
    weight: number;
    nutritionalValue: INutritionalValue;
    slices: {
      regularCut: number;
      squareCut: number;
      doubleCut: number;
    };
    crusts: {
      classicCrust: number;
      thinCrust: number;
      thinnestCrust: number;
      duplexCrustMozarella: number;
      duplexCrustCheddar: number;
    };
    edges: {
      mozarellaEdge: number;
      saucageEdge: number;
      parmesanEdge: number;
      garlicSaucageEdge: number;
    };
    standardToppings: [];
    extraToppings: [];
}

interface INutritionalValue {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

enum Status {
    PENDING="PENDING",
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE"
}

export {IPizzaFormData, IPizza}