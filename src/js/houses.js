import info from '../data/info.js';

const { createApp } = Vue;

createApp({
    data() {
        return {
            houseName: '', 
            houseInfo: '', 
            characters: [],
            defaultImage: 'https://i.pinimg.com/originals/70/2e/56/702e56ce4e70e4cb7f5eddc83fe8b40b.jpg',
            filterSearch: '',
            paginatedCharacters: [],
            selectedCharacter: null,
            currentPage: 1,
            totalPages: 1,
            showModal: false, // Controla la visibilidad del modal
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
        this.loadHouseInfo();
    },
    computed: {
        filteredCharacters() {
            return this.characters.filter(character => {
                return character.name.toLowerCase().includes(this.filterSearch.toLowerCase());
            });
        },
        pageNumbers() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
    },
    watch: {
        filterSearch() {
            this.updatePagination(); // filtro
        }
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
          },
      
        loadHouseInfo() {
            const urlParams = new URLSearchParams(window.location.search);
            this.houseName = urlParams.get('house') || '';
            this.houseInfo = this.houseName ? info.descriptionHouse[this.houseName]?.description : '';

            // Solo fetchCharacters si hay una casa seleccionada
            if (this.houseName) {
                this.fetchCharacters();
            } else {
                // Si no hay una casa seleccionada, limpia los personajes y ajusta la paginación
                this.characters = [];
                this.paginatedCharacters = [];
                this.totalPages = 0;
                this.currentPage = 1;
            }
        },
        fetchCharacters() {
            if (!this.houseName) {
                return;
            }

            fetch('https://hp-api.onrender.com/api/characters')
                .then(response => response.json())
                .then(data => {
                    this.characters = data
                        .filter(character => character.house === this.houseName)
                        .map(character => ({
                            ...character,
                            image: character.image || this.defaultImage
                        }));
                    this.updatePagination(); // Actualiza la paginación después de obtener los personajes
                })
                .catch(error => console.error('Error fetching characters:', error));
        },
        updatePagination() {
            this.totalPages = Math.ceil(this.filteredCharacters.length / 10); // Ajusta el tamaño de la página según sea necesario
            this.paginate();
        },
        paginate() {
            if (this.filteredCharacters.length > 0) {
                const start = (this.currentPage - 1) * 10;
                const end = start + 10;
                this.paginatedCharacters = this.filteredCharacters.slice(start, end);
            } else {
                this.paginatedCharacters = [];
            }
        },
        goToPage(page) {
            this.currentPage = page;
            this.paginate();
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.paginate();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.paginate();
            }
        },
        selectCharacter(character) {
            this.selectedCharacter = character;
            this.showModal = true;
        },
        showHouse(house) {
            this.houseName = house;
            this.houseInfo = info.descriptionHouse[house]?.description || ''; // Actualiza houseInfo
            this.fetchCharacters(); // Actualiza los personajes según la casa seleccionada
            this.showModal = false; // Cierra el modal si estaba abierto
            history.pushState(null, '', `houses.html?house=${house}`); // Actualiza la URL sin recargar la página
        },
        closeModal() {
            this.selectedCharacter = null;
            this.showModal = false;
        }
    }
}).mount('#app');