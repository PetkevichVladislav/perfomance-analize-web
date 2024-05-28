'use client'

import { Line, Radar } from "react-chartjs-2";
import { Chart, RadialLinearScale, PointElement, LinearScale, CategoryScale, LineElement, Title, Filler, Tooltip, Legend } from 'chart.js';
import "./RadarChart.scss";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'My Second Dataset',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  // Define options for the radar chart
  const options = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };


const ChartBlock: React.FC = () => {
    return (
      <>
    <section className="chart__container">
        <article className="chart__block--single">
            <div className="chart__title">Signle block</div>
            <hr/>
            <Radar className="chart__object" data={data} options={options} />
        </article>
        <article className="chart__block--single">
            <div className="chart__title">Signle block</div>
            <hr/>
            <Radar className="chart__object" data={data} options={options} />
        </article>
    </section>
    <section className="chart__container">
    <article className="chart__block--single">
            <div className="chart__title">Signle block</div>
            <hr/>
            <Line data={data} options={options} />
        </article>|
        <article className="chart__block--single">
            <div className="chart__title">Signle block</div>
            <hr/>
            <Line data={data} options={options} />
        </article>
        <article className="chart__block--single">
            <div className="chart__title">Signle block</div>
            <hr/>
            <Line data={data} options={options} />
        </article>
    </section>
    </>
    );
}

export default ChartBlock;