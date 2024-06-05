import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import PropTypes from 'prop-types';

Chart.register(...registerables);

const ChartComponent = ({ data }) => {
    const chartRef = useRef(null);

    console.log('ChartComponent data:', data);

    // Check if data is an array, if not, set it to an empty array
    const chartData = Array.isArray(data) ? data : [];

    const chartConfig = {
        labels: chartData.map(item => `User ${item.userId}`),
        datasets: [
            {
                label: 'Workout Count',
                data: chartData.map(item => item.workoutCount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 45,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        const chartInstance = chartRef.current;
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return <Bar ref={chartRef} data={chartConfig} options={options} />;
};

ChartComponent.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            userId: PropTypes.number.isRequired,
            workoutCount: PropTypes.number.isRequired
        })
    ).isRequired
};

ChartComponent.defaultProps = {
    data: []
};

export default ChartComponent;
