import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Tooltip,
  Legend
);

const PokemonBarChart = ({ stats }) => {
  const labels  = stats.map((s) => s.stat.name);
  const value = stats.map((s) => s.base_stat);

  const data = {
    labels,
    datasets: [
      {
        label: 'stats',
        data: value,
        backgroundColor: ['rgba(144, 238, 144, 1', 'red', 'blue', 'orange', 'purple', 'green'],
        borderColor: 'rgba(59, 130, 246, 1)',       
        borderWidth: 1,
      }
    ],   
  };

  const options = {
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 200,
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
           maxTicksLimit: false,
          autoSkip: false,
          includeBounds: true,
        },
      },
    },
    plugins: {
    legend: {
      display: false, // ⛔ ini akan menyembunyikan label 'stats' di UI
    },
  },
  };

  return (<Bar data={data} options={options}/>);
}
 
export default PokemonBarChart;