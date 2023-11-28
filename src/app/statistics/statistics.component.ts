import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Fin del proceso exitoso',
          'Fin del proceso por cancelación'
        ],
        datasets: [{
          data: [50, 50],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Eventos de fin',
            font: {
              size: 36,
              weight: 'bold',
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            },
            padding: {
              top: 10,
              bottom: 20
            }
          },
          legend: {  
            display: true,
            labels: {
              font: {
                size: 20,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          },
          datalabels: {
            color: 'white',
            font: {
              size: 20
            },
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map((data: any) => {
                sum += data;
              });
              let percentage = (value * 100 / sum).toFixed(0) + "%";
              return percentage;
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }
}