export class Service {
    constructor(
        id = 0,
        category_id = 0,
        company_id = 0,
        name = '',
        description = '',
        price = 0,
        duration = 0,
        rating = 0,
        sales = 0,
        imgUrl = '',
    ) {
        this.id = id;
        this.category_id = category_id;
        this.company_id = company_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.rating = rating;
        this.sales = sales;
        this.imgUrl = imgUrl;
    }
}
