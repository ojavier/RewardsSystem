
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


// Función para crear el gráfico de calor
async function createHeatmapChart() {
    const ctx = document.getElementById('heatmapChart').getContext('2d');
    const data = await fetchSellosPorHora();


    const horas = Array.from({ length: 24 }, (_, i) => i); // Horas de 0 a 23
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']; // Días de la semana


    // Inicializar un array de datos para cada hora y día
    const heatmapData = Array.from({ length: 24 }, () => Array(7).fill(0));


    // Población de datos desde la base de datos
    data.forEach((sello) => {
        const hora = new Date(sello.Hora_Sello).getHours();
        const dia = new Date(sello.Fecha_Sello).getDay();
        if (hora >= 0 && hora < 24 && dia >= 0 && dia < 7) {
            heatmapData[hora][dia]++;
        }
    });


    // Transformar los datos para Chart.js
    const chartData = [];
    horas.forEach((hora) => {
        dias.forEach((dia, diaIndex) => {
            chartData.push({
                x: hora,
                y: dia,
                v: heatmapData[hora][diaIndex]
            });
        });
    });


    // Configurar el gráfico de calor
    const heatmapChart = new Chart(ctx, {
        type: 'matrix', // Asegúrate de que estás usando Chart.js con el plugin adecuado
        data: {
            datasets: [{
                label: 'Sellos por Hora y Día',
                data: chartData,
                backgroundColor(context) {
                    const value = context.dataset.data[context.dataIndex].v;
                    const alpha = value / 10; // Ajustar valor alfa según la cantidad
                    return `rgba(16, 213, 177, ${alpha})`;
                },
                width: ({ chart }) => (chart.chartArea || {}).width / horas.length,
                height: ({ chart }) => (chart.chartArea || {}).height / dias.length
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'category',
                    labels: horas,
                    title: {
                        display: true,
                        text: 'Horas del Día'
                    }
                },
                y: {
                    type: 'category',
                    labels: dias,
                    title: {
                        display: true,
                        text: 'Día de la Semana'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `Sellos: ${context.raw.v}`
                    }
                }
            }
        }
    });
}


// Llamar a la función para crear el gráfico de calor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createHeatmapChart);

