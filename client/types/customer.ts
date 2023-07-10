interface ILoginCustomerFormData {
    email: string;
    phone: string;
    password: string
}
interface IRegisterFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    c_password: string;
}
interface IEditCustomerFormData {
    name: string;
    email: string;
    gender: Gender;
    birthdate: string;
}

interface ICustomer {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: Gender;
    status: CustomerStatus;
    birthdate: string;
    password: string;
}

enum Gender {
    MALE="MALE",
    FEMALE="FEMALE",
}
enum CustomerStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}
export {
    ICustomer,
    ILoginCustomerFormData,
    IRegisterFormData,
    IEditCustomerFormData,
    Gender,
    CustomerStatus
}