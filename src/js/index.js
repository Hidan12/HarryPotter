import info from "../data/info.js"
const { createApp } = Vue


createApp({
  data() {
    return {
      message: "funciona"
    }
  },
  created() {
    console.log(this.message);
  },
  methods: {

  },
  computed: {

  }

}).mount('#app')