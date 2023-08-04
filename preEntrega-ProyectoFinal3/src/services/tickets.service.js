import ticketsModel from "../dao/models/ticket.model.js";

class TicketService {
    constructor() {
        this.model = ticketsModel;
    }

    async createTicket(userName, cart) {

        let items = cart.map(item => ({
            product: item.productId,
            quantity: item.quantity,
        }));

        return await this.model.insertMany({ user: userName, items: items });
    }

    async getById(id) {
        return await this.model.findById(id);
    }


}

const ticketService = new TicketService();
export default ticketService;
