// Importa datos desde un archivo local de información
import info from "../data/info.js";

// Define la URL de la API que proporciona datos sobre hechizos
let urlApi = "https://hp-api.onrender.com/api/spells";

// Define un objeto con imágenes asociadas a ciertos hechizos
const img = {
  aberto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv3VHGiPtsg5pKOeC9e38e12xUslxe2us5bw&s"
}

// Importa la función createApp de Vue para crear la aplicación Vue
const { createApp } = Vue

// Crea una instancia de la aplicación Vue
const app = createApp({
  // Define los datos reactivos de la aplicación
  data() {
    return {
      spells: [], // Lista de hechizos
      textSearch: "", // Texto de búsqueda para filtrar hechizos
      currentPage: 1, // Página actual en la paginación
      itemsPerPage: 12, // Número de elementos por página
      currentSpell: null, // Hechizo actualmente seleccionado
      quantityProductSaved: 0, // Cantidad de productos guardados
      clickCarts: false, // Estado del carrito (abierto o cerrado)
      ProductSaved: [], // Lista de productos guardados
      bkProductSaved: [], // Backup de productos guardados para la compra
      btnRemove: false, // Estado del botón de eliminar productos (visible o no)
      deleteProduct: [], // Productos a eliminar
      totalPrice: 0, // Precio total de los productos guardados
      BktotalPrice: 0, // Precio total de productos en el carrito (backup)
      btnBuy: false, // Estado del botón de compra (visible o no)
    }
  },
  // Se ejecuta al crear la instancia de Vue
  created() {
    // Llama a la función para obtener los datos de la API
    this.getData(urlApi);

    // Intenta obtener los productos guardados desde localStorage
    let storage = JSON.parse(localStorage.getItem("productsaved"));
    if (storage) {
      // Filtra los productos que están en localStorage
      let data = info.products.filter((product) => {
        if (storage.find(str => str.id == product.id)) {
          product.add = true; // Marca el producto como añadido
          // Actualiza el precio total
          this.totalPrice += product.discount ? (product.price * (1 - (product.discount / 100))) : product.price;
          return product;
        }
      });
      // Actualiza la información de productos guardados
      this.uploadinformation(data);
    }
  },
  // Define los métodos de la aplicación
  methods: {
    // Obtiene datos de la API y los procesa
    async getData(url) {
      // Realiza una solicitud a la API
      const response = await fetch(url);
      // Convierte la respuesta en JSON
      const data = await response.json();
      // Mapea los datos para incluir una imagen asociada
      const spellImg = data.map(element => {
        return {
          id: element.id,
          name: element.name,
          description: element.description,
          img: img[element.name.toLowerCase()] // Obtiene la imagen correspondiente
        }
      });
      // Asigna los hechizos procesados a la propiedad spells
      this.spells = spellImg;
    },

    // Navega a la página anterior en la paginación
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    // Navega a la siguiente página en la paginación
    nextPage() {
      if (this.currentPage < this.spellPages) {
        this.currentPage++;
      }
    },

    // Navega a una página específica en la paginación
    goToPage(page) {
      this.currentPage = page;
    },

    // Muestra la información de un hechizo específico en un modal
    showSpell(spellId) {
      this.currentSpell = this.spells.find(spell => spell.id === spellId);
    },

    // Cierra el modal del hechizo
    closeModal() {
      this.currentSpell = null;
    },

    // Alterna el estado del botón de compra y limpia el carrito
    closeBuy() {
      this.btnBuy = !this.btnBuy;
      this.bkProductSaved = [];
      this.BktotalPrice = 0;
    },

    // Maneja la compra de productos guardados
    buyProduct() {
      this.clickCarts = !this.clickCarts;
      this.btnBuy = !this.btnBuy;
      this.bkProductSaved = [...this.ProductSaved];
      this.ProductSaved = [];
      this.quantityProductSaved = 0;
      this.BktotalPrice = this.totalPrice;
      this.totalPrice = 0;
      // Limpia los productos guardados en localStorage
      localStorage.setItem("productsaved", JSON.stringify([]));
    },

    // Alterna el estado del botón de eliminar productos
    closeremuve() {
      this.btnRemove = !this.btnRemove;
    },

    // Maneja la eliminación de productos (ya sea todos o los seleccionados)
    deleteProducts(product = []) {
      if (product.length > 0) {
        this.deleteProduct = product;
      } else {
        this.deleteProduct = this.ProductSaved;
      }
      this.btnRemove = !this.btnRemove;
      this.clickCarts = !this.clickCarts;
    },

    // Vacía la lista de productos guardados y restablece los valores
    emptyProduct() {
      if (this.btnRemove) {
        this.btnRemove = false;
      }
      this.ProductSaved = [];
      this.quantityProductSaved = 0;
      this.totalPrice = 0;
      // Limpia los productos guardados en localStorage
      localStorage.setItem("productsaved", JSON.stringify([]));
    },

    // Elimina un producto específico de la lista de productos guardados
    removeProduct(card) {
      if (this.btnRemove) {
        this.btnRemove = false;
      }
      // Reproduce un sonido al eliminar el producto
      const audio = new Audio("../../public/sound/transitional-swipe-3-211685.mp3");
      audio.play();
      let indexSaved = this.ProductSaved.findIndex(prod => prod.id === card.id);
      if (indexSaved >= 0) {
        // Actualiza el precio total al eliminar el producto
        this.totalPrice -= card.discount ? (card.price * (1 - (card.discount / 100))) : card.price;
        this.ProductSaved[indexSaved].add = false;
        this.ProductSaved.splice(indexSaved, 1);
        // Actualiza localStorage con la lista de productos modificada
        localStorage.setItem("productsaved", JSON.stringify(this.ProductSaved));
        this.quantityProductSaved = this.ProductSaved.length;
      }
    },

    // Alterna el estado del carrito y reproduce un sonido basado en su estado
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

    // Actualiza la información de productos guardados y el precio total
    uploadinformation(data) {
      this.quantityProductSaved = data.length;
      if (this.quantityProductSaved != 0) this.ProductSaved = data;
    }
  },
  // Define propiedades computadas para cálculos derivados
  computed: {
    // Filtra los hechizos según el texto de búsqueda
    searchSpells() {
      return this.spells.filter(spell => spell.name.toLowerCase().includes(this.textSearch.toLowerCase()));
    },

    // Calcula el número total de páginas para la paginación
    spellPages() {
      return Math.ceil(this.searchSpells.length / this.itemsPerPage);
    },

    // Genera un array con los números de página para la paginación
    pageNumbers() {
      return Array.from({ length: this.spellPages }, (_, i) => i + 1);
    },

    // Obtiene un subconjunto de hechizos para la página actual
    paginatedSpells() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      const result = this.searchSpells.slice(start, end);
      if (result.length === 0 && this.currentPage > 1) {
        // Si no hay resultados, regresa a la primera página
        this.currentPage = 1;
        return this.searchSpells.slice(0, this.itemsPerPage);
      }
      return result;
    },

    // Determina qué hechizos mostrar (filtrados o todos)
    showSpells() {
      return this.searchSpells.length > 0 ? this.searchSpells : this.spells;
    },

    // Determina si se debe mostrar el modal del hechizo
    showSpellModal() {
      console.log(this.currentSpell); // Imprime el hechizo actual en la consola
      return this.currentSpell !== null;
    }
  }
}).mount('#app'); // Monta la aplicación Vue en el elemento con id 'app'
