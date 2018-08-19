new Vue({
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
                price: 3,
            },
            {
                id: 3, 
                title: 'Item 3',
                price: 3,
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
            const item = this.cart.find( item => item.id === product.id)
            if ( item ) {
                item.quantity++;
                this.cart.map( x => (x.id === product.id)&&( x.quantity++ ) )
            } else {
                product.quantity = 1;
                this.cart.push(product);

            }
        },
    },
    computed: {
        total: function () {
            return this.cart.reduce( (sum, x) => sum += x.price * x.quantity, 0 );
        }

    }
})