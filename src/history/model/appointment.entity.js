export class Appointment {
    constructor(
        id = 0,
        userId = 0,
        serviceId = 0,
        company = 0,
        reservationDate = '',
        status = '',
        date = '',
        time = '',
        payment = { amount: 0, method: '', status: '' },
        schedule = { date: '', time: '' },
        serviceName = '',
        companyName = ''
    ) {
        this.id = id;
        this.userId = userId;
        this.serviceId = serviceId;
        this.company = company;
        this.reservationDate = reservationDate;
        this.status = status;
        this.date = date;
        this.time = time;
        this.payment = payment;
        this.schedule = schedule;
        this.serviceName = serviceName;
        this.companyName = companyName;
    }
}