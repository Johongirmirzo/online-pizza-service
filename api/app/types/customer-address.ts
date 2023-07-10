interface ICustomerAddressFormData {
    streetName: string;
    approach: string;
    floor: string;
    doorCode: string;
    apartmentNumber: string;
    comment: string;
}
interface ICustomerAddress extends ICustomerAddressFormData {
    id: number;
    isDefault: boolean;
}

export {
    ICustomerAddressFormData,
    ICustomerAddress
}
