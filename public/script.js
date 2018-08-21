const app = new Vue({
    el: '#app',
    data: {
        test: "test text",
        products: [],
        cart: [],
        search: '',
        prevSearch: '',
    },
    methods: {
        onSubmit: function () {
            this.$http
                .get('/search/'+this.search)
                .then(
                    res => {
                        this.products = res.body
                            .map(({id,title,link}) => {
                                item = {id,title,link};
                                item.price = +(Math.random() * 10 + 1).toFixed(2);
                                return item;
                            });
                        console.log(this.products);
                        this.prevSearch = this.search
                    },
                    err => console.log(err),                    
                )
                .catch(err => console.log(err))  
        },
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
        cartTotal: function () {
            return this.cart.reduce( (sum, x) => sum += x.price * x.quantity, 0 );
        },
        searchResultCount: function () {
            return this.products.length
        }
    },
    filters: {
        currency: function (sum) {
            return `$${sum.toFixed(2)}`
            
        }
    }
})