import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import PropTypes from 'prop-types';

Chart.register(...registerables);

const ChartComponent = ({ data }) => {
    const chartRef = useRef(null);

    console.log('ChartComponent data:', data);

    
    const chartData = Array.isArray(data) ? data : [];

    const chartConfig = {
        labels: chartData.map(item => `User ${item.userId}`),
        datasets: [
            {
                label: 'Workout Count',
                data: chartData.map(item => item.workoutCount),
                backgroundColor: 'rgba(255, 215, 0, 0.7)', 
                borderColor: 'rgba(255, 165, 0, 1)', 
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, 
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 45,
                    color: '#FFFACD', 
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#FFFACD', 
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#FFFACD', 
                },
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

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Bar ref={chartRef} data={chartConfig} options={options} />
        </div>
    );
};

ChartComponent.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            userId: PropTypes.number.isRequired,
            workoutCount: PropTypes.number.isRequired,
        })
    ).isRequired,
};

ChartComponent.defaultProps = {
    data: [],
};

export default ChartComponent;
