import info from '../data/info.js';

const { createApp } = Vue;

createApp({
  data() {
    return {
      homeText: info.home,
      quantityProductSaved: 0,
      clickCarts: false,
      ProductSaved: [],
      bkProductSaved: [],
      btnRemove: false,
      deleteProduct: [],
      totalPrice: 0,
      BktotalPrice: 0,
      btnBuy: false,
    };
  },
  created() {
    let storage = JSON.parse(localStorage.getItem("productsaved"))
    if (storage) {
      let data = info.products.filter((product) => {
        if (storage.find(str => str.id == product.id)) {
          product.add = true
          this.totalPrice += product.discount ? (product.price * (1 - (product.discount / 100))) : product.price
          return product
        }
      })
      this.uploadinformation(data)
    }
    console.log(this.message);
  },
  methods: {
    closeBuy() {
      this.btnBuy = !this.btnBuy
      this.bkProductSaved = []
      this.BktotalPrice = 0
    },
    buyProduct() {
      this.clickCarts = !this.clickCarts
      this.btnBuy = !this.btnBuy
      this.bkProductSaved = [...this.ProductSaved]
      this.ProductSaved = []
      this.quantityProductSaved = 0
      this.BktotalPrice = this.totalPrice
      this.totalPrice = 0
      localStorage.setItem("productsaved", JSON.stringify([]))
    },
    closeremuve() {
      this.btnRemove = !this.btnRemove
    },
    deleteProducts(product = []) {
      if (product.length > 0) {
        this.deleteProduct = product
      } else {
        this.deleteProduct = this.ProductSaved
      }
      this.btnRemove = !this.btnRemove
      this.clickCarts = !this.clickCarts
    },
    emptyProduct() {
      if (this.btnRemove) {
        this.btnRemove = false
      }
      this.ProductSaved = []
      this.quantityProductSaved = 0
      this.totalPrice = 0
      localStorage.setItem("productsaved", JSON.stringify([]))

    },
    removeProduct(card) {
      if (this.btnRemove) {
        this.btnRemove = false
      }
      const audio = new Audio("../../public/sound/transitional-swipe-3-211685.mp3")
      audio.play()
      let indexSaved = this.ProductSaved.findIndex(prod => prod.id === card.id);
      if (indexSaved >= 0) {
        this.totalPrice -= card.discount ? (card.price * (1 - (card.discount / 100))) : card.price
        this.ProductSaved[indexSaved].add = false
        this.ProductSaved.splice(indexSaved, 1)
        localStorage.setItem("productsaved", JSON.stringify(this.ProductSaved))
        this.quantityProductSaved = this.ProductSaved.length
      }
    },
    clickCart() {
      this.clickCarts = !this.clickCarts
      if (this.clickCarts) {
        const audio = new Audio("../../public/sound/wing-flap-heavy-prototype-36710.mp3")
        audio.play()
      } else {
        const audio = new Audio("../../public/sound/poof-of-smoke-87381.mp3")
        audio.play()
      }
    },
    uploadinformation(data) {
      this.quantityProductSaved = data.length
      if (this.quantityProductSaved != 0) this.ProductSaved = data
    }

  },
  computed: {}
}).mount('#app');
