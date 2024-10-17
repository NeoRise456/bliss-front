export class Appointment {
    constructor(
        id = 0,
        userId = 0,
        serviceId = 0,
        company = 0,
        reservationDate = '',
        status = '',
        payment = { amount: 0, method: '', status: '' },
        schedule = { date: '', time: '' }
    ) {
        this.id = id;
        this.userId = userId;
        this.serviceId = serviceId;
        this.company = company;
        this.reservationDate = reservationDate;
        this.status = status;
        this.payment = payment;
        this.schedule = schedule;
    }
}