import info from "../data/info.js"


const { createApp } = Vue

createApp({
    data() {
      return {
        quantityProductSaved: 0,
        clickCarts: false,
        btnBuy: false,
        ProductSaved:[],
        totalPrice: 0,
        bkProducts: [],
        products: [],
        filterProducts: [],
        discountProduct: [],
        productSlider:[],
        addCart: [],
        categorys: [],
        filterCategory: "",
        filterSearch: "",
        filterCheck: [],
      }
    },
    created(){
        let storage = JSON.parse(localStorage.getItem("productsaved")) 
        if (storage) {
            let data = info.products.map((product) =>{
                if (storage.find(str => str.id == product.id)) {
                    product.add = true
                    this.totalPrice += product.discount ? (product.price * (1 - (product.discount /100))) : product.price
                }
                return product
            })
            this.uploadinformation(data , storage.length, storage)
        }else{
            this.uploadinformation(info.products)
        }
        
    },
    methods: {
        closeBuy(){
            this.btnBuy = !this.btnBuy
            this.products = this.products.map(product => {
                if (product.add) {
                    product.add = false
                }
                return product
            })
            this.ProductSaved = []
            this.quantityProductSaved = 0
            this.totalPrice = 0
            localStorage.setItem("productsaved", JSON.stringify([]))
        },

        buyProduct(){
            this.clickCarts = !this.clickCarts
            this.btnBuy = !this.btnBuy
        },
        emptyProduct (){
            this.products = this.products.map(product => {
                if (product.add) {
                    product.add = false
                }
                return product
            })
            this.ProductSaved = []
            this.quantityProductSaved = 0
            this.totalPrice = 0
            localStorage.setItem("productsaved", JSON.stringify([]))

        },
        addProduct(card){
            const audio = new Audio("../../public/sound/protego-105518.mp3")
            audio.play()
            card.add = !card.add
            this.totalPrice += card.discount ? (card.price * (1 - (card.discount /100))) : card.price
            if (!this.ProductSaved.includes(card)) {
                this.ProductSaved.push(card)
                this.quantityProductSaved += 1
                localStorage.setItem("productsaved", JSON.stringify(this.ProductSaved))
            }
        },
        removeProduct(card){
            const audio = new Audio("../../public/sound/transitional-swipe-3-211685.mp3")
            audio.play()
            this.totalPrice -= card.discount ? (card.price * (1 - (card.discount /100))) : card.price
            let indexSaved = this.ProductSaved.findIndex(prod => prod.id === card.id);
            let indexbkProduct = this.bkProducts.findIndex(prod => prod.id === card.id)
            let indexProduct = this.products.findIndex(prod => prod.id === card.id)
            
            if (indexSaved >= 0) {
                this.ProductSaved.splice(indexSaved, 1)
                this.products[indexProduct].add = false
                if (this.bkProducts[indexbkProduct].add) {
                    this.bkProducts[indexbkProduct].add = !this.bkProducts[indexbkProduct].add
                }
                localStorage.setItem("productsaved", JSON.stringify(this.ProductSaved))
                this.quantityProductSaved = this.ProductSaved.length
            }

        },
        clickCart(){
            this.clickCarts = !this.clickCarts
            if (this.clickCarts) {
                const audio = new Audio("../../public/sound/wing-flap-heavy-prototype-36710.mp3")
                audio.play()
            }else{
                const audio = new Audio("../../public/sound/poof-of-smoke-87381.mp3")
                audio.play()
            }
        },
        uploadinformation(data, size = 0, prodSave=[]){
            this.quantityProductSaved = size      
            this.products = data
            this.bkProducts = data
            this.discountProduct = this.bkProducts.filter(product => product.discount)
            this.discountProduct.forEach((product, index) => {
                if (index % 2 == 0 && index != 0) {
                    this.productSlider.push([
                        this.discountProduct[index-1],
                        product
                    ])
                }else if (index == this.discountProduct.length && index / 2 != 0) {
                    this.productSlider.push([
                        product,
                        this.discountProduct[0]
                    ])
                }
            });
            this.categorys = Array.from(new Set(this.products.map(product => product.category)))
            if(size != 0) this.ProductSaved = prodSave 
            
        }
    },
    computed:{
        allFilters(){      
            
            let searchProduct = this.bkProducts.filter(product => product.name.toLowerCase().includes(this.filterSearch))
            if (this.filterCategory != "") {
                let categoryproduct = searchProduct.filter(product => product.category.includes(this.filterCategory))
                this.products = categoryproduct
                this.modal = categoryproduct[0]
                console.log(this.modal);
                
            }else{
                this.products = searchProduct
            }
        },
        

    }

  }).mount('#app')
