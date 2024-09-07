import info from '../data/info.js';

const { createApp } = Vue;

createApp({
    data() {
        return {
            houseName: '', 
            houseInfo: '', 
            characters: [],
            defaultImage: 'https://i.pinimg.com/originals/70/2e/56/702e56ce4e70e4cb7f5eddc83fe8b40b.jpg',
            filterSearch: ''  // Propiedad para almacenar el texto de búsqueda
            
        };
    },
    created() {
        this.loadHouseInfo();
        this.fetchCharacters();
    },
    computed: {
        filteredCharacters() {
            // Filtra los personajes basándose en el texto de búsqueda
            return this.characters.filter(character => {
                return character.name.toLowerCase().includes(this.filterSearch.toLowerCase());
            });
        }
    },
    methods: {
        loadHouseInfo() {
            // Obtener el parámetro de la URL
            const urlParams = new URLSearchParams(window.location.search);
            const houseName = urlParams.get('house');
            
            if (houseName && info.descriptionHouse[houseName]) {
                this.houseName = houseName;
                this.houseInfo = info.descriptionHouse[houseName].description;
            } else {
                this.houseName = '';
                this.houseInfo = 'SELECT A HOUSE AND DISCOVER THE MEMBERS OF EACH HOUSE !';
            }
        },
        fetchCharacters() {
            fetch('https://hp-api.onrender.com/api/characters')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    this.characters = data
                        .filter(character => character.house && character.house === this.houseName) 
                        .map(character => ({
                            ...character,
                            image: character.image || this.defaultImage 
                        }));
                })
                .catch(error => {
                    console.error('Error fetching characters:', error);
                });
        }
    }
}).mount('#app');







