export class Schedule {
    constructor(
        img = '',
        id = 0,
        title = '',
        date = '',
        time = '',
        place = '',
        userId = 0
    ) {
        this.img = img;
        this.id = id;
        this.title = title;
        this.date = date;
        this.time = time;
        this.place = place;
        this.userId = userId;
    }
}