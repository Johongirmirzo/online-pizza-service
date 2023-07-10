interface ICustomer {
    id: number;
    phone: string;
    status: CustomerStatus;
    name: string;
    email: string;
    gender: Gender;
    birthDate: string;
}

enum CustomerStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}
enum Gender {
    MALE="MALE",
    FEMALE="FEMALE"
}

export {
    ICustomer,
    CustomerStatus
}