let urlApi= "https://hp-api.onrender.com/api/spells"
const img = {
  aberto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv3VHGiPtsg5pKOeC9e38e12xUslxe2us5bw&s"
}



const { createApp } = Vue

const app = createApp({
    data() {
      return {
        spells:[],
        textSearch:"",
        currentPage: 1,
        itemsPerPage: 12,
        currentSpell: null,
        quantityProductSaved: 0,
        clickCarts: false,
        ProductSaved: [],
        bkProductSaved: [],
        btnRemove: false,
        deleteProduct: [],
        totalPrice: 0,
        BktotalPrice: 0,
        btnBuy: false,
      }
    },
    created(){
      this.getData(urlApi)
        
    },
    methods: {
        async getData(url){
          const response = await fetch(urlApi) 
          const data = await response.json()
          const spellImg = data.map(element => {
            return {
              id: element.id,
              name: element.name,
              description: element.description,
              img: img[element.name.toLowerCase()]
            }
          })
          this.spells = spellImg
          },

          previousPage() {
            if (this.currentPage > 1) {
              this.currentPage--;
            }
          },
        
          nextPage() {
            if (this.currentPage < this.spellPages) {
              this.currentPage++;
            }
          },
        
          goToPage(page) {
            this.currentPage = page;
          },

          showSpell(spellId){
            this.currentSpell = this.spells.find(spell => spell.id === spellId)
          },
          closeModal(){
            this.currentSpell = null
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
    computed:{
      searchSpells(){
        return this.spells.filter(spell => spell.name.toLowerCase().includes(this.textSearch.toLowerCase())  )
      },

      spellPages() {
        return Math.ceil(this.searchSpells.length / this.itemsPerPage);
      },
    
      pageNumbers() {
        return Array.from({ length: this.spellPages }, (_, i) => i + 1);
      },
    
      paginatedSpells() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = this.currentPage * this.itemsPerPage;
        return this.searchSpells.slice(start, end);

    },
    showSpells(){
      return this.searchSpells.length > 0 ? this.searchSpells : this.spells
    },
    showSpellModal(){
      console.log(this.currentSpell)
      return this.currentSpell !== null
    },
     }


  }).mount('#app')

  