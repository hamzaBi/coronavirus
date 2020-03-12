import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Chart } from 'chart.js';
import { Country } from 'src/app/models/Country.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
})
export class CountryDetailsPage implements OnInit {

  @ViewChild("doughnutCanvas", { read: ElementRef, static: false }) doghnutCanvas: ElementRef;
  @ViewChild("totalDeathsCanvas", { read: ElementRef, static: false }) totalDeathsCanvas: ElementRef;
  @ViewChild("mixedCanvas1", { read: ElementRef, static: false }) mixedCanvas: ElementRef;
  @ViewChild("dailyNewCases", { read: ElementRef, static: false }) dailyNewCasesCanvas: ElementRef;
  @ViewChild("dailyDeaths", { read: ElementRef, static: false }) dailyDeathsCanvas: ElementRef;
  
  


  country: Country = {
    activeCases: 0,
    cases: 0,
    color: 'retrieving data',
    country: 'retrieving data',
    country_ar: 'retrieving data',
    country_fr: 'retrieving data',
    critical: 0,
    deathes: 0,
    newCases: 'retrieving data',
    newDeathes: 'retrieving data',
    recovered: 0,
    details: []
  };

  activeCases = [];
  labels = [];
  deaths = [];
  newDeaths = [];
  cases = [];
  newCases = [];
  lang = 'en';

  private doghChart: Chart;
  private totalDeathsCahrt: Chart;
  private mixedChart: Chart;
  private dailyNewCasesChart: Chart;
  private dailyDeathsChart: Chart;

  constructor(
    private activatedRoute: ActivatedRoute,
    private afd: AngularFireDatabase,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.lang = this.languageService.selected;
    this.languageService.selectedChange.subscribe(lan => {
      this.lang = lan;
    })
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('country')) {
        this.router.navigate(['tabs/tab1']);
      }
      const country = paramMap.get('country');
      this.afd.list('countries').valueChanges().subscribe((cn: Country[]) => {
        this.country = cn.find(function (c: Country) {
          return c.country.toLowerCase() === country.toLowerCase();
        });
        this.activeCases = this.country.details.map((c: any) => c.activeCases);
        this.cases = this.country.details.map((c: any) => c.cases);
        this.newCases = this.country.details.map((c: any) => c.newCases);
        this.deaths = this.country.details.map((c: any) => c.deaths);
        this.newDeaths = this.country.details.map((c: any) => c.newDeaths);
        this.labels = this.country.details.map((c: any) => c.date);
        this.doghChart = this.createChart(
          'doughnut',
          [this.country.critical, this.country.activeCases - this.country.critical, this.country.deathes, this.country.recovered],
          this.doghnutCanvas,
          ['comaprison'],
          [
            "rgba(252, 88, 88, 0.2)",
            "rgba(230, 170, 46, 0.2)",
            "rgba(97, 72, 72, 0.2)",
            "rgba(105, 255, 145, 0.2)",
          ],
          ["#fc5858", "#e8aa2e", "#614848", "#69ff91"]
        );

        this.totalDeathsCanvas = this.createChart(
          'line',
          this.deaths,
          this.totalDeathsCanvas,
          ['total cases'],
          ['rgba(199, 16, 40, 1)', 'rgba(199, 16, 40, 0.4)']
        );

        this.mixedChart = this.createChart(
          'mixed',
          this.cases,
          this.mixedCanvas,
          ['total cases', 'active cases'],
          ['rgba(52, 122, 235, 1)', 'rgba(52, 122, 235, 0.4)'],
          ['rgba(0, 163, 59, 1)', 'rgba(0, 163, 59, 0.4)'],
          this.activeCases
        );
        
       this.dailyNewCasesChart = this.createChart(
         'bar',
         this.get20LastElem(this.newCases),
         this.dailyNewCasesCanvas, 
         ['daily new cases'],
         ['rgba(232, 158, 46, 0.4)', 'rgba(0,0,0,0.1)', 'rgba(232, 158, 46, 1)']
       );
       this.dailyDeathsChart = this.createChart(
        'bar',
        this.get20LastElem(this.newDeaths) ,
        this.dailyDeathsCanvas, 
        ['daily deaths'],
        ['rgba(232, 46, 46, 0.4)', 'rgba(0,0,0,0.1)', 'rgba(232, 46, 46, 1)']
      );
      

      });
    });
  }


  createChart(type: string, dataset: number[], canvas: ElementRef, labels: string[], colors: string[], colors_2?: string[], dataset_2?: number[]) {
    let data = {};
    if (type === 'line') {
      data["labels"] = this.labels;
      data["datasets"] = [
        {
          label: labels[0],
          fill: false,
          lineTension: 0.1,
          backgroundColor: colors[1],
          borderColor: colors[0],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: colors[0],
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: colors[0],
          pointHoverBorderColor: colors[0],
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataset,
          spanGaps: true
        }
      ];
      return new Chart(canvas.nativeElement, {
        type: type,
        data: data
      });
    } else if (type === 'doughnut') {
      data["labels"] = ['critical', 'mild', 'deaths', 'recovered'];
      data["datasets"] = [
        {
          label: labels[0],
          data: dataset,
          backgroundColor: colors,
          hoverBackgroundColor: colors_2
        }
      ];
      return new Chart(canvas.nativeElement, {
        type: type,
        data: data
      });
    } else if (type == 'mixed') {
      data["labels"] = this.labels;
      data["datasets"] = [
        {
          label: labels[0],
          fill: false,
          lineTension: 0.1,
          backgroundColor: colors[1],
          borderColor: colors[0],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: colors[0],
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: colors[0],
          pointHoverBorderColor: colors[0],
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataset,
          spanGaps: true
        },
        {
          label: labels[1],
          fill: false,
          lineTension: 0.1,
          backgroundColor: colors_2[1],
          borderColor: colors_2[0],
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: colors_2[0],
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: colors_2[0],
          pointHoverBorderColor: colors_2[0],
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataset_2,
          spanGaps: true,
          type: 'line'
        }
      ];
      return new Chart(canvas.nativeElement, {
        type: 'line',
        data: data
      });
    }else if(type === 'bar') {
      data['labels'] = this.get20LastElem(this.labels);
      data['datasets']= [
        {
          label: labels[0],
          backgroundColor: colors[0],
          borderColor: colors[1],
          hoverBackgroundColor:colors[2],
          data: dataset
        },
      ]

      return new Chart(canvas.nativeElement, {
        type: 'bar',
        data: data,
        options: {
          barValueSpacing: 20
        }
      });
    }
  }

  private get20LastElem(arr: any[]){
    let newArr = [];
    for(let i = arr.length - 20; i < arr.length; i++){
      newArr.push(arr[i]);
    }
    return newArr;
  }

}
