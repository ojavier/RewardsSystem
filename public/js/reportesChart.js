// Función para obtener datos del servidor
async function fetchTopTenderos() {
    const response = await fetch('<%= process.env.PATH_SERVER %>reportes/topTenderos'); 
    if (!response.ok) {
        throw new Error('Error al obtener datos de los Tenderos');
    }
    return await response.json();
}
// Función para crear el gráfico
async function createTopTenderosChart() {
    const ctx = document.getElementById('topTenderosChart').getContext('2d');
    const data = await fetchTopTenderos();

    const labels = data.map(tendero => `${tendero.Nombre} ${tendero.Apellido}`);
    const totalSellos = data.map(tendero => tendero.total_sellos);

    const topTenderosChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total de Sellos',
                data: totalSellos,
                backgroundColor: 'rgba(16, 213, 177, 0.6)',
                borderColor: 'rgba(16, 213, 177, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', 
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Sellos'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tenderos'
                    }
                }
            }
        }
    });
}

// Llamar a la función para crear el gráfico cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createTopTenderosChart);
