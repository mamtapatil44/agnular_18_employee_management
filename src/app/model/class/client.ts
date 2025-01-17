export class Client {
    clientId: number;
    contactPersonName: string;
    companyName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    employeeStrength: number;
    gstNo: string;
    regNo: string;
    contactNo: string

    
    constructor() {
        this.clientId = 0,
            this.contactPersonName = '',
            this.companyName = '',
            this.address = '',
            this.city = '',
            this.state = '',
            this.pincode = '',
            this.employeeStrength = 0,
            this.gstNo = '',
            this.regNo = '',
            this.contactNo = '';
    }
}