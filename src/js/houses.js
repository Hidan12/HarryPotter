import info from '../data/info.js';

const { createApp } = Vue;

createApp({
    data() {
        return {
            houseName: '', // Nombre de la casa seleccionada
            houseInfo: '', // Información de la casa seleccionada
            characters: [], // Array de personajes de la casa seleccionada
            defaultImage: 'https://i.pinimg.com/originals/70/2e/56/702e56ce4e70e4cb7f5eddc83fe8b40b.jpg', // Imagen por defecto para personajes sin imagen
            filterSearch: '', // Texto de búsqueda para filtrar personajes
            paginatedCharacters: [], // Personajes paginados que se muestran en la interfaz
            selectedCharacter: null, // Personaje actualmente seleccionado para mostrar detalles
            currentPage: 1, // Página actual en la paginación
            totalPages: 1, // Total de páginas en la paginación
            showModal: false, // Controla la visibilidad del modal de detalles del personaje
            quantityProductSaved: 0, // Cantidad de productos guardados en el carrito
            clickCarts: false, // Estado de visibilidad del carrito
            ProductSaved: [], // Array para almacenar productos añadidos al carrito
            bkProductSaved: [], // Array de respaldo para productos guardados antes de la compra
            btnRemove: false, // Estado de visibilidad del botón de eliminar productos
            deleteProduct: [], // Array para almacenar productos marcados para eliminación
            totalPrice: 0, // Precio total de los productos en el carrito
            BktotalPrice: 0, // Precio total de respaldo antes de la compra
            btnBuy: false, // Estado de visibilidad del botón de compra
        };
    },
    
    created() {
        // Recupera productos guardados desde localStorage al crear la aplicación
        let storage = JSON.parse(localStorage.getItem("productsaved"));
        if (storage) {
            let data = info.products.filter((product) => {
                if (storage.find(str => str.id == product.id)) {
                    product.add = true;
                    this.totalPrice += product.discount ? (product.price * (1 - (product.discount / 100))) : product.price;
                    return product;
                }
            });
            this.uploadinformation(data);
        }
        // Carga la información de la casa seleccionada
        this.loadHouseInfo();
    },
    
    computed: {
        // Filtra los personajes según el texto de búsqueda
        filteredCharacters() {
            return this.characters.filter(character => {
                return character.name.toLowerCase().includes(this.filterSearch.toLowerCase());
            });
        },
        
        // Genera números de página para la paginación
        pageNumbers() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
        }
    },
    
    watch: {
        // Actualiza la paginación cuando cambia el texto de búsqueda
        filterSearch() {
            this.currentPage = 1; // Reinicia la página actual cuando cambia el texto de búsqueda
            this.updatePagination();
        }
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
        
        // Alterna la visibilidad del botón de eliminar productos
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
        },
        
        // Carga la información de la casa seleccionada desde los parámetros de la URL
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
        
        // Obtiene personajes de la API y filtra según la casa seleccionada
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
        
        // Actualiza la paginación según el número de personajes filtrados
        updatePagination() {
            this.totalPages = Math.ceil(this.filteredCharacters.length / 10); // Ajusta el tamaño de la página según sea necesario
            this.paginate();
        },
        
        // Pagina los personajes para la página actual
        paginate() {
            if (this.filteredCharacters.length > 0) {
                const start = (this.currentPage - 1) * 10;
                const end = start + 10;
                this.paginatedCharacters = this.filteredCharacters.slice(start, end);
            } else {
                this.paginatedCharacters = [];
            }
        },
        
        // Cambia a una página específica
        goToPage(page) {
            this.currentPage = page;
            this.paginate();
        },
        
        // Cambia a la página anterior si es posible
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.paginate();
            }
        },
        
        // Cambia a la página siguiente si es posible
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.paginate();
            }
        },
        
        // Selecciona un personaje para mostrar en el modal
        selectCharacter(character) {
            this.selectedCharacter = character;
            this.showModal = true;
        },
        
        // Muestra la información de la casa seleccionada y actualiza la URL
        showHouse(house) {
            this.houseName = house;
            this.houseInfo = info.descriptionHouse[house]?.description || ''; // Actualiza houseInfo
            this.fetchCharacters(); // Actualiza los personajes según la casa seleccionada
            this.showModal = false; // Cierra el modal si estaba abierto
            history.pushState(null, '', `houses.html?house=${house}`); // Actualiza la URL sin recargar la página
        },
        
        // Cierra el modal de detalles del personaje
        closeModal() {
            this.selectedCharacter = null;
            this.showModal = false;
        }
    }
}).mount('#app');
