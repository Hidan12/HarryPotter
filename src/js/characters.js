import descriptions from '../data/info.js'; // Importar el módulo de descripciones desde un archivo externo.
let url = "https://hp-api.onrender.com/api/characters"; // URL de la API que proporciona los caracteres.

const { createApp } = Vue // Desestructuración para extraer la función `createApp` del objeto `Vue`.

const app_characters = createApp({
  data() {
    return {
      Characters: [],  // Lista de personajes cargados desde la API
      CharactersBK: [],  // Copia de respaldo de la lista de personajes para filtrado
      search: '',  // Búsqueda del usuario
      selectedCharacter: null,  // Personaje seleccionado para mostrar detalles
      uniqueSpecies: [],  // Lista de especies únicas extraídas de los personajes
      uniqueGenders: [],  // Lista de géneros únicos extraídos de los personajes
      uniqueHouses: [],  // Lista de casas únicas extraídas de los personajes
      selectedSpecies: '',  // Especie seleccionada en el filtro
      selectedGender: '',  // Género seleccionado en el filtro
      selectedHouse: '',  // Casa seleccionada en el filtro
      currentPage: 1,  // Página actual en la paginación
      itemsPerPage: 30,  // Número de personajes por página
      descriptioncharacter: descriptions.characterPage,  // Descripción del personaje
      quantityProductSaved: 0,  // Cantidad de productos guardados
      clickCarts: false,  // Estado del carrito de compras (abierto/cerrado)
      ProductSaved: [],  // Lista de productos guardados en el carrito
      bkProductSaved: [],
      btnRemove: false,
      deleteProduct: [],
      totalPrice: 0,  // Precio total de los productos en el carrito
      BktotalPrice: 0,
      btnBuy: false,  // Estado del botón de compra (activo/inactivo)
    }
  },
  created() {
    // Cargar productos guardados desde localStorage si existen
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

    // Obtener datos de los personajes desde la API
    this.getData(url)
  },
  methods: {
    getData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.Characters = data;  // Guardar personajes obtenidos
          this.CharactersBK = data;  // Guardar copia de respaldo

          // Obtener valores únicos de species, gender y house
          this.uniqueSpecies = [...new Set(data.map(character => character.species))];
          this.uniqueGenders = [...new Set(data.map(character => character.gender))];
          this.uniqueHouses = [...new Set(data.map(character => character.house))];
        })
    },
    selectCharacter(character) {
      this.selectedCharacter = character;  // Establecer el personaje seleccionado
    },
    previousPage() {
      // Retroceder una página en la paginación
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      // Avanzar una página en la paginación
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;  // Ir a una página específica en la paginación
    },
    handleWheel(event) {
      const modalBody = event.currentTarget;

      // Verifica si el scroll ha llegado al final del contenido
      const isAtBottom = modalBody.scrollTop + modalBody.clientHeight >= modalBody.scrollHeight;

      // Prevenir el scroll adicional en el modal si está en la parte superior o inferior
      if (
        (modalBody.scrollTop === 0 && event.deltaY < 0) ||
        (isAtBottom && event.deltaY > 0)
      ) {
        event.preventDefault();
      }
    },
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

  computed: {
    filteredCharacters() {
      // Filtrar personajes según búsqueda y filtros seleccionados
      let filteredBySearch = this.CharactersBK.filter(character =>
        character.name.toLowerCase().includes(this.search.toLowerCase())
      );

      if (this.selectedSpecies) {
        filteredBySearch = filteredBySearch.filter(character => character.species === this.selectedSpecies);
      }
      if (this.selectedGender) {
        filteredBySearch = filteredBySearch.filter(character => character.gender === this.selectedGender);
      }
      if (this.selectedHouse) {
        filteredBySearch = filteredBySearch.filter(character => character.house === this.selectedHouse);
      }

      return filteredBySearch;
    },
    totalPages() {
      // Calcular el número total de páginas según el número de personajes filtrados
      return Math.ceil(this.filteredCharacters.length / this.itemsPerPage);
    },
    pageNumbers() {
      // Calcular los números de página para la paginación
      let start = Math.max(1, this.currentPage - 1);
      let end = Math.min(this.currentPage + 1, this.totalPages);

      if (end - start < 2) {
        if (start === 1) {
          end = Math.min(start + 2, this.totalPages);
        } else if (end === this.totalPages) {
          start = Math.max(end - 2, 1);
        }
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    paginatedCharacters() {
      // Obtener personajes para la página actual
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.filteredCharacters.slice(start, end);
    }
  }
}).mount('#app_characters');
