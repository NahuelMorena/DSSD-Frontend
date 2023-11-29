import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BonitaService } from '../services/bonita-service';
import { ArchivedCaseDTO } from '../modelos/archived-case-dto';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  public chart: any;
  archivedCases:ArchivedCaseDTO[]=[];
  completedCases=0;
  meanMin=0;
  meanSeg=0;

  constructor(private bonitaService:BonitaService) {}

  ngOnInit(): void {
    this.getArchivedCases().then(()=>{
      this.calculateEvents();
      this.createChart();
      this.calculateTime();
    })
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: [
          'Fin del proceso exitoso',
          'Fin del proceso por cancelación'
        ],
        datasets: [{
          data: [this.completedCases, this.archivedCases.length-this.completedCases],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)'
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
            color: 'rgb(0, 0, 0)',
            font: {
              size: 20,
              weight:'bold'
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

  getArchivedCases():Promise<void>{
    return new Promise<void>((resolve,reject)=>{
      this.bonitaService.getArchivedCases().subscribe(
        (response)=>{
          this.archivedCases=response;
          resolve();
        },
        (error:HttpErrorResponse)=>{
          reject();
        }
      )
    })
  }

  calculateEvents(){
    this.completedCases = this.archivedCases.reduce((count, archivedCase) => {
      if (archivedCase.state === 'completed') {
          return count + 1;
      }
      return count;
  }, 0);
  }

  calculateTime(){
    var timeCases = this.archivedCases.map(caseItem => {
      var endString=caseItem.end_date.toLocaleString();
      var endObject = new Date(endString.replace(' ', 'T'));
      var startString=caseItem.start.toLocaleString();
      var startObject=new Date(startString.replace(" ","T"));
      return Math.floor(Math.abs(endObject.getTime() - startObject.getTime())/(1000 * 60));
  });
  console.log(timeCases[0]);
  console.log(timeCases[1]);
  console.log(timeCases[2]);
  var sum = timeCases.reduce((acumulador, numero) => acumulador + numero, 0);
  this.meanMin =Math.floor( sum / timeCases.length);
  this.meanSeg=((sum/timeCases.length) % 1)*60;
  }
}