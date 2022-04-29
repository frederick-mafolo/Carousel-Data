import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5xy from '@amcharts/amcharts5/xy';
 import * as am4core from "@amcharts/amcharts5/";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import SwiperCore, { Navigation } from 'swiper';

import DATA from '../../../mock/data.json';
// install Swiper modules
SwiperCore.use([Navigation]);


export interface GRAPH{
  title:any,
  percentage:any,
  cost:any
}
@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent implements OnInit, AfterViewInit {
  graphData: GRAPH[] = [];
  graphRemainData: GRAPH[] = [];
  data = DATA;

  constructor() {
  }

  ngOnInit(): void {
    this.multipleChart();
  }

  ngAfterViewInit() {
    this.pieChart();
  }
  navigateToAction(item: any) { }

  // onSwiper(swiper:any) {
  //   console.log(swiper);
  // }
  onSlideChange() {
  }

  onSwiper(swiper: any) {
  }

  private pieChart() {
    var index=0
    for ( index; index < this.graphData.length; index++) {
     for( index;index< this.graphRemainData.length; index++) {
      // document.getElementById('chartdiv').innerText = res.results[0].value;
      let root = am5.Root.new('chartdiv' + index);
      const absaTheme = am5.Theme.new(root);

      // absaTheme.rule('Label').setAll({
      //     fill: am5.color('#192A3E'),
      //     fontSize: '0.8em',
      // });

      absaTheme
        .rule('ColorSet')
        .set('colors', [am5.color('#FF780F'), am5.color('#CAC7C7')]);

      // Set themes
      root.setThemes([am5themes_Animated.new(root), absaTheme]);
      // root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          radius: am5.percent(65),
          innerRadius: am5.percent(75),
        })
      );

      // Create series
      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: 'percentage',
          categoryField: 'title',
          alignLabels: false,
        })
      );
      //  let percent = this.graphData[index]
      let centerLabel = chart.seriesContainer.children.push(
        am5.Label.new(root, {
          textAlign: 'center',
          centerY: am5.p50,
          centerX: am5.p50,
          fill: am5.color('#FF780F'),
          fontWeight: '600',
          fontSize: '37px',
          text: this.graphData[index].percentage.toString() + '%',
        })
      );

      // Set data
      series.data.setAll([this.graphData[index],this.graphRemainData[index]]);

      series.appear(1000, 100);
      series.labels.template.set('visible', false);
      series.ticks.template.set('visible', false);
   }
   }
  }

  multipleChart() {
    let array = this.data[2019];
    let newCost;
    let costLenght;
    let costPercentage;
    let costRemain;

    for (let index = 0; index < array.length; index++) {
      costPercentage = Number(array[index][1])*100;
      costRemain = 100 - costPercentage;

      this.graphData.push({
        title: array[index][0],
        percentage: costPercentage.toFixed(0),
        cost: array[index][2],
      });
      this.graphRemainData.push({
        title: '',
        percentage: costRemain,
        cost: array[index][2],
      });
    }

    for (let index = 0; index < this.graphData.length; index++) {
      costLenght = this.graphData[index].cost.toString().length;

      if (costLenght >= 4 && costLenght <= 6)
        newCost = this.graphData[index].cost / Math.pow(1000, 1) + '' + 'k';
      else if (costLenght >= 7 && costLenght <= 9)
        newCost = this.graphData[index].cost / Math.pow(1000, 2) + '' + 'm';
      else if (costLenght >= 10 && costLenght <= 12)
        newCost = this.graphData[index].cost / Math.pow(1000, 3) + '' + 'b';
      else if (costLenght >= 13 && costLenght <= 15)
        newCost = this.graphData[index].cost / Math.pow(1000, 4) + '' + 't';
      else newCost = this.graphData[index].cost;

      this.graphData[index].cost = newCost;
    }
    // console.log(this.graphData)
  }
}

