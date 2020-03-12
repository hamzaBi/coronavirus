import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild("doughnutCanvas", { read: ElementRef, static: false }) myChart: ElementRef;
  @ViewChild("casesCanvas", { read: ElementRef, static: false }) casesChart: ElementRef;
  @ViewChild("deathesCanvas", { read: ElementRef, static: false }) deathesChart: ElementRef;
  

  data = [];
  labels = [];
  cases = [];
  deathes = [];
  private chart: Chart;
  private line: Chart;
  private deathesLine: Chart;

  casesVisibility = 'visible';
  deathesVisibility = 'invisible';


  constructor(
    private platform: Platform,
    private afd: AngularFireDatabase
  ) {
    this.platform.ready().then(() => {
      this.afd.list('analytics').valueChanges().subscribe((v: any) => {
        this.data = v[0];
        this.createChart({
          labels: ["Critical", "Mild", "deathes", "Recovered"],
          datasets: [
            {
              label: "# of Votes",
              
              data: [v[0].critical, v[0].mild, v[0].totalDeathes, v[0].recovered],
              backgroundColor: [
                "rgba(252, 88, 88, 0.2)",
                "rgba(230, 170, 46, 0.2)",
                "rgba(97, 72, 72, 0.2)",
                "rgba(105, 255, 145, 0.2)",
              ],
              hoverBackgroundColor: ["#fc5858", "#e8aa2e", "#614848", "#69ff91"]
            }
          ],
          options: {
            cutoutpercentage : 0
          }
        });
      });
      this.afd.list('cases').valueChanges().subscribe((v: any) => {
        this.cases = [];
        this.labels = [];
        for(let i = v.length - 20 ; i < v.length; i++) {
          const item = v[i];
          this.cases.push(item.cases);
          this.labels.push(item.date);
          this.deathes.push(item.deathes);
        }
        this.createLineChart();
      });
      
    });
  }

  ngOnInit() {}

  createChart(data) {
    this.chart = new Chart(this.myChart.nativeElement, {
      type: "doughnut",
      data: data,
    });
  }

  createLineChart(){
    this.line = new Chart(this.casesChart.nativeElement, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "total cases",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.cases,
            spanGaps: true
          }, 
        ]
      }
    });

    this.deathesLine = new Chart(this.deathesChart.nativeElement, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "total deathes",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(175,92,92,0.4)",
            borderColor: "rgba(175,92,92,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(175,92,92,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(175,92,92,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.deathes,
            spanGaps: true
          }, 
        ]
      }
    });

  }


}
