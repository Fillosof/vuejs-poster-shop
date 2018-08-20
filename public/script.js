const app = new Vue({
    el: '#app',
    data: {
        test: "test text",
        products: [
            {
                id: 1, 
                title: 'Item 1',
                price: 3,
            },
            {
                id: 2, 
                title: 'Item 2',
                price: 9.9999,
            },
            {
                id: 3, 
                title: 'Item 3',
                price: 9.88888,
            },
            {
                id: 4, 
                title: 'Item 4',
                price: 3,
            },
            {
                id: 5, 
                title: 'Item 5',
                price: 3,
            },
        ],
        cart: [],
    },
    methods: {
        addItem: function(product) {
            const index = this.cart.findIndex( item => item.id === product.id)
            if ( index === -1 ) {
                product.quantity = 1;
                this.cart.push(product);
            } else {
                const item = this.cart[index];
                item.quantity++
                Vue.set(this.cart, index, item);
            }
        },
        incrementCartItem: function(item, index) {
            item.quantity++
            Vue.set(this.cart, index, item);
        },   
        decrementCartItem: function(item, index) {
            if (item.quantity > 1 ) {
                item.quantity--
                Vue.set(this.cart, index, item);
            } else {
                this.cart.splice( this.cart.indexOf(item), 1)
            }
        },   
    },
    computed: {
        total: function () {
            return this.cart.reduce( (sum, x) => sum += x.price * x.quantity, 0 );
        }
    },
    filters: {
        currency: function (sum) {
            return `$${sum.toFixed(2)}`
            
        }
    }
})