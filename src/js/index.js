import info from '../data/info.js'; // Importa el archivo info.js

const { createApp } = Vue;

createApp({
  data() {
    return {
      homeText: info.home
    };
  },
  created() {
    console.log(this.message);
  },
  methods: {},
  computed: {}
}).mount('#app');
