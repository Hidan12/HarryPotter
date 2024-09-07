import info from "../data/info.js"
const { createApp } = Vue


createApp({
    data() {
      return {
        quantityProductSaved: 0,
        clickCarts: false,
        ProductSaved:[],
        message: "funciona"
      }
    },
    created(){
      let storage = JSON.parse(localStorage.getItem("productsaved"))
      if (storage) {
        let data = info.products.filter((product) =>{
            if (storage.find(str => str.id == product.id)) {
                product.add = true
                return product
            }
        })
        this.uploadinformation(data)
    }

        console.log(this.message);
    },
    methods: {
      removeProduct(card){
        const audio = new Audio("../../public/sound/transitional-swipe-3-211685.mp3")
        audio.play()
        let indexSaved = this.ProductSaved.findIndex(prod => prod.id === card.id);
        if (indexSaved >= 0) {
          this.ProductSaved[indexSaved].add = false
            this.ProductSaved.splice(indexSaved, 1)
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
    uploadinformation(data){
      this.quantityProductSaved = data.length
      if(this.quantityProductSaved != 0) this.ProductSaved = data 
  }

        
    },
    computed:{

    }

  }).mount('#app')