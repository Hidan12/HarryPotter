import info from "../data/info.js" // Importa los datos de los productos desde un archivo externo.

const { createApp } = Vue // Importa el método createApp de Vue.

createApp({
    data() {
        return {
            quantityProductSaved: 0, // Cantidad de productos guardados en el carrito.
            clickCarts: false, // Estado del carrito (abierto/cerrado).
            btnBuy: false, // Estado del botón de compra (activo/inactivo).
            btnRemove: false, // Estado del botón de eliminar producto (activo/inactivo).
            deleteProduct: [], // Array de productos a eliminar.
            bkProductSaved: [], // Backup del array de productos guardados en el carrito.
            ProductSaved: [], // Array de productos guardados en el carrito.
            totalPrice: 0, // Precio total de los productos en el carrito.
            BktotalPrice: 0, // Backup del precio total de los productos en el carrito.
            detailProduct: {}, // Detalle del producto seleccionado.
            bkProducts: [], // Copia de seguridad de todos los productos.
            products: [], // Array de productos a mostrar.
            filterProducts: [], // Array de productos filtrados.
            discountProduct: [], // Array de productos con descuento.
            productSlider: [], // Array de productos para el slider.
            addCart: [], // Array de productos añadidos al carrito.
            categorys: [], // Array de categorías de productos.
            filterCategory: "", // Filtro de categoría.
            filterSearch: "", // Filtro de búsqueda.
            filterCheck: [], // Array de filtros seleccionados.
        }
    },
    created() {
        // Obtiene los productos guardados del localStorage.
        let storage = JSON.parse(localStorage.getItem("productsaved"))
        if (storage) {
            // Si hay productos guardados, actualiza los datos.
            let data = info.products.map((product) => {
                if (storage.find(str => str.id == product.id)) {
                    product.add = true
                    this.totalPrice += product.discount ? (product.price * (1 - (product.discount / 100))) : product.price
                }
                return product
            })
            this.uploadinformation(data, storage.length, storage)
        } else {
            // Si no hay productos guardados, carga la información inicial.
            this.uploadinformation(info.products)
        }
    },
    methods: {
        // Cierra la compra y reinicia los datos del carrito.
        closeBuy() {
            this.btnBuy = !this.btnBuy
            this.bkProductSaved = []
            this.BktotalPrice = 0
        },
        // Abre o cierra el modal de compra.
        buyProduct() {
            this.clickCarts = !this.clickCarts
            this.btnBuy = !this.btnBuy
            this.products = this.products.map(product => {
                if (product.add) {
                    product.add = false
                }
                return product
            })
            this.bkProductSaved = [...this.ProductSaved]
            this.ProductSaved = []
            this.quantityProductSaved = 0
            this.BktotalPrice = this.totalPrice
            this.totalPrice = 0
            localStorage.setItem("productsaved", JSON.stringify([]))
        },
        // cierra el modal de eliminación.
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
        // Vacía el carrito de productos.
        emptyProduct() {
            if (this.btnRemove) {
                this.btnRemove = false
            }
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
        // Añade un producto al carrito.
        addProduct(card) {
            const audio = new Audio("../../public/sound/protego-105518.mp3")
            audio.play()
            card.add = !card.add
            this.totalPrice += card.discount ? (card.price * (1 - (card.discount / 100))) : card.price
            if (!this.ProductSaved.includes(card)) {
                this.ProductSaved.push(card)
                this.quantityProductSaved += 1
                localStorage.setItem("productsaved", JSON.stringify(this.ProductSaved))
            }
        },
        // Elimina un producto del carrito.
        removeProduct(card) {
            if (this.btnRemove) {
                this.btnRemove = false
            }
            const audio = new Audio("../../public/sound/transitional-swipe-3-211685.mp3")
            audio.play()
            this.totalPrice -= card.discount ? (card.price * (1 - (card.discount / 100))) : card.price
            let indexSaved = this.ProductSaved.findIndex(prod => prod.id === card.id)
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
        // Abre o cierra el carrito.
        clickCart(location = "") {
            if (!this.btnBuy && !this.btnRemove && location == "") {
                this.clickCarts = !this.clickCarts
                if (this.clickCarts) {
                    const audio = new Audio("../../public/sound/wing-flap-heavy-prototype-36710.mp3")
                    audio.play()
                } else {
                    const audio = new Audio("../../public/sound/poof-of-smoke-87381.mp3")
                    audio.play()
                }
            } else {
                if (this.clickCarts) this.clickCarts = !this.clickCarts
            }
        },
        // Muestra el detalle de un producto.
        clickDetail(card) {
            this.detailProduct = card
        },
        // Cierra el detalle de un producto.
        closeDetail() {
            this.detailProduct = {}
        },
        // Actualiza la información de los productos.
        uploadinformation(data, size = 0, prodSave = []) {
            this.quantityProductSaved = size
            this.products = data
            this.bkProducts = data
            this.discountProduct = this.bkProducts.filter(product => product.discount)
            this.discountProduct.forEach((product, index) => {
                if (index % 2 == 0 && index != 0) {
                    this.productSlider.push([
                        this.discountProduct[index - 1],
                        product
                    ])
                } else if (index == this.discountProduct.length && index / 2 != 0) {
                    this.productSlider.push([
                        product,
                        this.discountProduct[0]
                    ])
                }
            })
            this.categorys = Array.from(new Set(this.products.map(product => product.category)))
            if (size != 0) this.ProductSaved = prodSave
        }
    },
    computed: {
        // Filtra los productos según la búsqueda y la categoría seleccionada.
        allFilters() {
            let searchProduct = this.bkProducts.filter(product => product.name.toLowerCase().includes(this.filterSearch))
            if (this.filterCategory != "") {
                let categoryproduct = searchProduct.filter(product => product.category.includes(this.filterCategory))
                this.products = categoryproduct
                this.modal = categoryproduct[0]
                console.log(this.modal)
            } else {
                this.products = searchProduct
            }
        },
    }
}).mount('#app') // Monta la aplicación en el elemento con el id 'app'.

