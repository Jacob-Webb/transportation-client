export class User {
    id: any;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    zipCode: string;
    role: string;

    constructor(userName: string, password: string, firstName: string, lastName: string, 
        email: string, phone: string, address1: string, address2: string = "", 
        city: string, zipCode: string, role: string = "USER") {
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.zipCode = zipCode;
        this.role = role;
    }
}
