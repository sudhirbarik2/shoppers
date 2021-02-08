class Order {
    constructor(obj) {
        this.orderId = obj.orderId;
        this.orders = obj.orders;
        this.totalPrice=obj.totalPrice;
    }
}


module.exports = Order;