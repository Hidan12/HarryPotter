import info from "../data/info.js"
const { createApp } = Vue


createApp({
  data() {
    return {
      quantityProductSaved: 0,
      clickCarts: false,
      ProductSaved: [],
      bkProductSaved: [],
      totalPrice: 0,
      BktotalPrice: 0,
      btnBuy: false,
      countHouseName: [],
      coutnHouseValue: [],
      message: "funciona"
    }
  },
  created() {
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
    this.fetchStudentData();

  },
  methods: {
    fetchStudentData() {
      fetch('https://hp-api.onrender.com/api/characters/students')
        .then(response => response.json())
        .then(data => {
          if (data && data.length) {
            // Process student data
            const houses = data.map(student => student.house);
            const countHouse = houses.reduce((acc, house) => {
              acc[house] = (acc[house] || 0) + 1;
              return acc;
            }, {});

            // Prepare data for Chart.js (houses)
            const tickets = Object.keys(countHouse);
            tickets[tickets.length - 1] = "Others";
            const values = Object.values(countHouse);

            // Create House Chart.js instance
            this.createStudentsChart(tickets, values);

            // Process gender data
            const filterGenders = data.map(student => student.gender);
            const countGender = filterGenders.reduce((acc, gender) => {
              acc[gender] = (acc[gender] || 0) + 1;
              return acc;
            }, {});

            // Prepare data for Chart.js (genders)
            const genderLabels = Object.keys(countGender);
            const genderValues = Object.values(countGender);

            // Create Gender Chart.js instance
            this.createGenderChart(genderLabels, genderValues);
            this.fetchProductData()
          } else {
            alert("No student data found!");
          }
        })
        .catch(error => {
          console.error('Error fetching student data:', error);
          alert("An error occurred while fetching student data.");
        });

    },
    fetchProductData() {
      // Process product data
      const houses = info.products.map(product => product.house);
      const countHouse = houses.reduce((acc, house) => {
        acc[house] = (acc[house] || 0) + 1;
        return acc;
      }, {});
      const categorys = info.products.map(product => product.category);
      const countCategorys = categorys.reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});


      // Prepare data for Chart.js
      this.countHouseName = Object.keys(countHouse);
      this.coutnHouseValue = Object.values(countHouse);
      const nameCategorys = Object.keys(countCategorys)
      const dataCategorys = Object.values(countCategorys)

      // Create Chart.js instance
      this.createProductsChart();
      this.createCategoryProductsChart(nameCategorys, dataCategorys)
    },
    createStudentsChart(labels, data) {
      let ctx = document.getElementById('tableStudents').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Students',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 2)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 2)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: 22,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            title: {
              display: true,
              text: 'Students at Home',
              font: {
                size: 23,
                weight: 'bold'
              }
            }
          }
        }
      });
    },
    createProductsChart() {
      const canvas = document.getElementById('tableProducts')
      let product = canvas.getContext('2d');

      new Chart(product, {
        type: 'bar',
        data: {
          labels: this.countHouseName,
          datasets: [{
            label: 'Products',
            data: this.coutnHouseValue,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: 22,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            title: {
              display: true,
              text: 'Products for Home',
              font: {
                size: 23,
                weight: 'bold'
              }
            }
          }
        }
      });
    },
    createGenderChart(labels, data) {
      let ctx = document.getElementById('tableGender').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Genders',
            data: data,
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 2)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: 22,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            title: {
              display: true,
              text: 'Genres of students',
              font: {
                size: 23,
                weight: 'bold'
              }
            }
          }
        }
      });
    },
    createCategoryProductsChart(labels, data) {
      let ctx = document.getElementById('tableCategorys').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Category',
            data: data,
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 2)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            x: {
              ticks: {
                font: {
                  size: 22,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 20,
                  weight: 'bold'
                }
              }
            },
            title: {
              display: true,
              text: 'Store categories',
              font: {
                size: 23,
                weight: 'bold'
              }
            }
          }
        }
      });
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
    emptyProduct() {
      const audio = new Audio("../../public/sound/transitional-swipe-3-211685.mp3")
      audio.play()
      this.ProductSaved = []
      this.quantityProductSaved = 0
      this.totalPrice = 0
      localStorage.setItem("productsaved", JSON.stringify([]))

    },
    removeProduct(card) {
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

  }

}).mount('#app')
