export default class TicketDTO {
    constructor(userId, amount, items,) {
        this.user = userId;
        this.amount = amount;
        this.items = items.map(item => ({
            product: item.productId,
            quantity: item.quantity
        }));
    }
}
