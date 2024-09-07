let urlApi= "https://hp-api.onrender.com/api/spells"
const img = {
  aberto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv3VHGiPtsg5pKOeC9e38e12xUslxe2us5bw&s"
}

const { createApp } = Vue

const app = createApp({
    data() {
      return {
        spells:[],
        textSearch:""
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
          }
        
    },
    computed:{
      searchSpells(){
        return this.spells.filter(spell => spell.name.toLowerCase().includes(this.textSearch.toLowerCase())  )
      }

    }


  }).mount('#app')

  