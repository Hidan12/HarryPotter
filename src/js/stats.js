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
//................table students 

// Obtener datos de la API
fetch('https://hp-api.onrender.com/api/characters/students')
    .then(response => response.json())
    .then(data => {
        // Procesar los datos para el gráfico
        const names = data.map(student => student.name);
        const houses = data.map(student => student.house);

        const filterGenders = data.map(student => student.gender);
              // Contar el número de estudiantes por casa
              const countGender = filterGenders.reduce((acc, gender) => {
                acc[gender] = (acc[gender] || 0) + 1;
                return acc;
            }, {});
    

        // Contar el número de estudiantes por casa
        const countHouse = houses.reduce((acc, house) => {
            acc[house] = (acc[house] || 0) + 1;
            return acc;
        }, {});

        // Preparar los datos para Chart.js
        const tickets = Object.keys(countHouse);
        tickets[tickets.length - 1] = "Others"
        const valuess = Object.values(countHouse);

        const gender = Array.from(new Set(Object.values(filterGenders))) ;
        const valuesGenders = Object.values(countGender);
        console.log(gender);

        // Crear el gráfico
        let ctx = document.getElementById('tableStudents').getContext('2d');
         new Chart(ctx, {
            type: 'bar', // Tipo de gráfico
            data: {
                labels: tickets,
                datasets: [{
                    label: 'Students at Home',
                    data: valuess,
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
                        beginAtZero: true
                    }
                }
            }
        });

        let genderHtml = document.getElementById('tableGender').getContext('2d');
        new Chart(genderHtml, {
            type: 'bar', // Tipo de gráfico
            data: {
                labels: gender,
                datasets: [{
                    label: 'Genders',
                    data: valuesGenders,
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)'
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
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));

//.....................................table shop


// Tus datos de productos
const products = info.products

// Agrega más productos si es necesario


// Procesar los datos para el gráfico
const houses1 = products.map(product => product.house);

// Contar el número de productos por casa
const countHouse1 = houses1.reduce((acc, house1) => {
    acc[house1] = (acc[house1] || 0) + 1;
    return acc;
}, {});

// Preparar los datos para Chart.js
const tickets1 = Object.keys(countHouse1);
const values1 = Object.values(countHouse1);

// Crear el gráfico
let printTable1 = document.getElementById('tableProducts').getContext('2d');
let myTable1 = new Chart(printTable1, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: tickets1,
        datasets: [{
            label: 'Products for Home',
            data: values1,
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
                beginAtZero: true
            }
        }
    }
});

//..............table circle

