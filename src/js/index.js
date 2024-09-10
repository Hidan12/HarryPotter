import info from '../data/info.js';

const { createApp } = Vue;

createApp({
  // Función de datos para configurar el estado inicial de la aplicación
  data() {
    return {
      homeText: info.home, // Texto para la página de inicio, si lo hay
      quantityProductSaved: 0, // Cantidad de productos guardados en el carrito
      clickCarts: false, // Estado de visibilidad del carrito
      ProductSaved: [], // Array para almacenar productos añadidos al carrito
      bkProductSaved: [], // Array de respaldo para productos guardados antes de la compra
      btnRemove: false, // Estado de visibilidad del botón de eliminar producto
      deleteProduct: [], // Array para almacenar productos marcados para eliminación
      totalPrice: 0, // Precio total de los productos en el carrito
      BktotalPrice: 0, // Precio total de respaldo antes de la compra
      btnBuy: false, // Estado de visibilidad del botón de compra
      founders: info.founders // Información sobre los fundadores, desde info.js
    };
  },
  
  created() {
    // Recuperar productos guardados desde localStorage
    let storage = JSON.parse(localStorage.getItem("productsaved"));
    if (storage) {
      // Filtrar productos que están guardados y actualizar el precio total
      let data = info.products.filter((product) => {
        if (storage.find(str => str.id == product.id)) {
          product.add = true;
          this.totalPrice += product.discount ? (product.price * (1 - (product.discount / 100))) : product.price;
          return product;
        }
      });
      // Actualizar la información del carrito con los productos filtrados
      this.uploadinformation(data);
    }
    console.log(this.message);
  },
  
  methods: {
    // Alterna la visibilidad del botón de compra y restablece los datos de respaldo
    closeBuy() {
      this.btnBuy = !this.btnBuy;
      this.bkProductSaved = [];
      this.BktotalPrice = 0;
    },
    
    // Alterna la visibilidad del carrito, restablece los datos del carrito y borra localStorage
    buyProduct() {
      this.clickCarts = !this.clickCarts;
      this.btnBuy = !this.btnBuy;
      this.bkProductSaved = [...this.ProductSaved];
      this.ProductSaved = [];
      this.quantityProductSaved = 0;
      this.BktotalPrice = this.totalPrice;
      this.totalPrice = 0;
      localStorage.setItem("productsaved", JSON.stringify([]));
    },
    
    // Alterna la visibilidad del botón de eliminar
    closeremuve() {
      this.btnRemove = !this.btnRemove;
    },
    
    // Marca productos para eliminación o limpia la lista de eliminación si no se proporcionan productos
    deleteProducts(product = []) {
      if (product.length > 0) {
        this.deleteProduct = product;
      } else {
        this.deleteProduct = this.ProductSaved;
      }
      this.btnRemove = !this.btnRemove;
      this.clickCarts = !this.clickCarts;
    },
    
    // Limpia todos los productos del carrito y restablece los datos relevantes
    emptyProduct() {
      if (this.btnRemove) {
        this.btnRemove = false;
      }
      this.ProductSaved = [];
      this.quantityProductSaved = 0;
      this.totalPrice = 0;
      localStorage.setItem("productsaved", JSON.stringify([]));
    },
    
    // Elimina un producto específico del carrito y actualiza el precio total y localStorage
    removeProduct(card) {
      if (this.btnRemove) {
        this.btnRemove = false;
      }
      // Reproduce un efecto de sonido al eliminar el producto
      const audio = new Audio("../../public/sound/transitional-swipe-3-211685.mp3");
      audio.play();
      let indexSaved = this.ProductSaved.findIndex(prod => prod.id === card.id);
      if (indexSaved >= 0) {
        this.totalPrice -= card.discount ? (card.price * (1 - (card.discount / 100))) : card.price;
        this.ProductSaved[indexSaved].add = false;
        this.ProductSaved.splice(indexSaved, 1);
        localStorage.setItem("productsaved", JSON.stringify(this.ProductSaved));
        this.quantityProductSaved = this.ProductSaved.length;
      }
    },
    
    // Alterna la visibilidad del carrito y reproduce efectos de sonido basados en la visibilidad
    clickCart() {
      this.clickCarts = !this.clickCarts;
      if (this.clickCarts) {
        const audio = new Audio("../../public/sound/wing-flap-heavy-prototype-36710.mp3");
        audio.play();
      } else {
        const audio = new Audio("../../public/sound/poof-of-smoke-87381.mp3");
        audio.play();
      }
    },
    
    // Actualiza la información del carrito con nuevos datos
    uploadinformation(data) {
      this.quantityProductSaved = data.length;
      if (this.quantityProductSaved != 0) this.ProductSaved = data;
    }
  },
  
  computed: {}
}).mount('#app');

