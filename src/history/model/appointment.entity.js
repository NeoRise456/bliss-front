export class Appointment {
    constructor(
        id = 0,
        userId = 0,
        serviceId = 0,
        companyId = 0,
        reservationDate = '',
        status = '',
        date = '',
        time = '',

    ) {
        this.id = id;
        this.user_Id = userId;
        this.service_Id = serviceId;
        this.company_Id = companyId;
        this.reservation_Date = reservationDate;
        this.status = status;
        this.date = date;
        this.time = time;

    }
}



