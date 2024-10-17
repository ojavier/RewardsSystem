
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

//Funcion para sellos por dia
async function createSellosPorDiaChart() {
    const ctx = document.getElementById('sellosDiasChart').getContext('2d');
    const data = await fetchSellosPorDia();
    console.log(data); //muestra lo obtenido
    //Agarra los valores para usarlos en el chart
    const labels = data.map(item => item.DiaSemana);
    const valores = data.map(item => item.total_sellos);

    // Configuración del chart
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total de Sellos',
                data: valores,
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
                        text: 'Sellos'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Día de la semana'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', createSellosPorDiaChart);

// Función para crear el gráfico de calor
async function createHeatmapChart() {
    const ctx = document.getElementById('heatmapChart').getContext('2d');
    const data = await fetchSellosPorHora();
    console.log(data); // Asegúrate de que estás obteniendo lo que esperas

    const horas = Array.from({ length: 24 }, (_, i) => i); // Horas de 0 a 23
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']; // Días de la semana

    // Inicializar un array de datos para cada hora y día
    const heatmapData = Array.from({ length: 24 }, () => Array(7).fill(0));

    const diaArbitrario = 0; // 0 para Lunes

    // Población de datos desde la base de datos
    data.forEach((sello) => {
        const hora = sello.hora; // Obtén la hora
        const totalSellos = sello.total_sellos; // Obtén el total de sellos
        if (hora >= 0 && hora < 24) {
            heatmapData[hora][diaArbitrario] = totalSellos; // Asignar total de sellos a la hora y el día
        }
    });

    // Transformar los datos para Chart.js
    const chartData = [];
    horas.forEach((hora) => {
        dias.forEach((dia, diaIndex) => {
            chartData.push({
                x: hora,
                y: dia,
                v: heatmapData[hora][diaIndex] // usa el total de sellos
            });
        });
    });

    // Configurar el gráfico de calor
    const heatmapChart = new Chart(ctx, {
        type: 'matrix',
        data: {
            datasets: [{
                label: 'Sellos por Hora y Día',
                data: chartData,
                backgroundColor(context) {
                    const value = context.dataset.data[context.dataIndex].v;
                    if (value > 20) return 'rgba(255, 0, 0, 0.8)'; // Rojo para valores altos
                    if (value > 10) return 'rgba(255, 165, 0, 0.6)'; // Naranja
                    if (value > 5) return 'rgba(255, 255, 0, 0.4)'; // Amarillo
                    return 'rgba(16, 213, 177, 0.2)'; // Verde claro para valores bajos
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
                        label: (context) => `Sellos: ${context.raw.v}` // Muestra el total de sellos en el tooltip
                    }
                }
            }
        }
    });
}

// Llamar a la función para crear el gráfico de calor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createHeatmapChart);


// Función para crear el gráfico
async function createTopClientesSellos() {
    const ctx = document.getElementById('topClientesSellos').getContext('2d');
    const data = await fetchTopClientesSellos();

    const labels = data.map(item => item.Telefono);
    const total_sellos = data.map(item => item.total_sellos);

    const topTenderosChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total de Sellos',
                data: total_sellos,
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
                        text: 'Total sellos'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Telefono del cliente'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', createTopClientesSellos);
