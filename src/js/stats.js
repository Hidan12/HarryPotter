
import info from "../data/info.js"

export default { //se tranfiere al html
    template:
        `
        <main id="app" class="container-fluid d-flex justify-content-center align-items-center img-back p-3">
        <!-- table stats -->
        <div class="tables bg-light opacity-75 p-3">
            <h5 class="text-center">Statistics</h5>
            <div class="d-flex align-items-center justify-content-between col-6">
                <canvas id="tableStudents" width="400" height="200"></canvas>
                <canvas id="tableGender" width="400" height="200"></canvas>
            </div>
            <h5 class="text-center">Statistics Shop</h5>
            <canvas id="tableProducts" width="400" height="200"></canvas>
            

            <!-- imagen gif -->
            <img class="position-absolute col-2 bottom-0 end-0"
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXN5cm16cGJpajZxaDMxcnJ6OG4wcGhqMHplcmI5cjdodzRyb3JiZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SsrQT2Au2Wn54fRxal/giphy.webp"
                alt="">
        </div>
    
    </main>
         
     `,
    data() {
        return {
            message: "funciona"
        };
    },
    created() {
        console.log(this.message);
    },
    mounted() {
        this.fetchStudentData();
        this.fetchProductData();
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

            // Prepare data for Chart.js
            const tickets = Object.keys(countHouse);
            const values = Object.values(countHouse);

            // Create Chart.js instance
            this.createProductsChart(tickets, values);
        },
        createStudentsChart(labels, data) {
            let ctx = document.getElementById('tableStudents').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Students at Home',
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
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        createProductsChart(labels, data) {
            let ctx = document.getElementById('tableProducts').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Products for Home',
                        data: data,
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
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
};
