class Cart {
    constructor(oldCart) {
        this.items = oldCart.items || {};
        this.totalQty = oldCart.totalQty || 0;
        this.totalPrice = oldCart.totalPrice || 0;

        this.add = function (item, id) {
            const existItem = item._id.toHexString() === this.items[id]?.item._id;
            if (existItem) {
                this.items[id].qty++;
                this.items[id].price = item.price * this.items[id].qty;
                this.totalQty++;
                this.totalPrice += item.price;
            }
            else {
                this.items[id] = { item: item, qty: 1, price: item.price };
                this.totalQty++;
                this.totalPrice += item.price;
            }
        };

        this.reduceOne = function(id) {
            this.items[id].qty--;
            this.items[id].price -= this.items[id].item.price;
            this.totalQty--;
            this.totalPrice -= this.items[id].item.price;
            if (this.items[id].qty <= 0) {
                delete this.items[id];
            }
        }

        this.deleteFromCart = function(id) {
            this.totalQty -= this.items[id].qty;
            this.totalPrice -= this.items[id].price;
            delete this.items[id];
        }
    }
}

module.exports = Cart;