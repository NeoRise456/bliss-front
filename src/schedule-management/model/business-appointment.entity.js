export class User {
    constructor(
        id = 0,
        name = '',
        email = '',
        phone = '',
        address = '',
        serviceName = ''
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address
        this.serviceName = serviceName;

    }
}