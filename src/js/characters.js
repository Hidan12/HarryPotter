let url = "https://hp-api.onrender.com/api/characters" 


const { createApp } = Vue

const app_characters = createApp({
    data() {
      return {
        Characters: [],
        CharactersBK: [],
        search: '',
        selectedCharacter: null,
        uniqueSpecies: [],
        uniqueGenders: [],
        uniqueHouses: [],
        selectedSpecies: '',
        selectedGender: '',
        selectedHouse: '',
        currentPage: 1,     
        itemsPerPage: 30, 

      }
    },
    created() {
        this.getData(url)
    },
    methods: {
        getData(url) {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.Characters = data;
                this.CharactersBK = data;
                
                // Obtener valores únicos de species, gender y house
                this.uniqueSpecies = [...new Set(data.map(character => character.species))];
                this.uniqueGenders = [...new Set(data.map(character => character.gender))];
                this.uniqueHouses = [...new Set(data.map(character => character.house))];
            })
        },
        selectCharacter(character) {
            this.selectedCharacter = character;
            
            
          },

          previousPage() {
            if (this.currentPage > 1) {
              this.currentPage--;
            }
          },
        
          nextPage() {
            if (this.currentPage < this.totalPages) {
              this.currentPage++;
            }
          },
        
          goToPage(page) {
            this.currentPage = page;
          }

    },
    computed: {
        filteredCharacters() {
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
            return Math.ceil(this.filteredCharacters.length / this.itemsPerPage);
          },
        
          pageNumbers() {
            return Array.from({ length: this.totalPages }, (_, i) => i + 1);
          },
        
          paginatedCharacters() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = this.currentPage * this.itemsPerPage;
            return this.filteredCharacters.slice(start, end);
          }
    }
}).mount('#app_characters')