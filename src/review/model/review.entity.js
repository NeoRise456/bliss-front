

// src/review/model/review.entity.js
export class Review {
    constructor({ id, rating, comment, createdDate, appointmentId, userId, images }) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.createdDate = createdDate;
        this.appointmentId = appointmentId;
        this.userId = userId;
        this.images = images;
    }
}