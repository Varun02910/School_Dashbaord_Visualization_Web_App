import { Component} from '@angular/core';
import { InfoCardComponent } from "./info-card/info-card.component";
import { CardData } from './card-data-class';
import { CardsData } from './cards-data-class';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from "./bar-chart/bar-chart.component";

@Component({
  selector: 'app-charts-section',
  imports: [InfoCardComponent, CommonModule, BarChartComponent],
  templateUrl: './charts-section.component.html',
  styleUrl: './charts-section.component.scss'
})


export class ChartsSectionComponent{

    data1 = new CardData("Urban", "20");
    data2 = new CardData("Rural", "50");
    dataList: CardData[] = [this.data1, this.data2];
    cardsDataList = [
      new CardsData("No. of schools", "255087", this.dataList, ""), 
      new CardsData("No. of teachers", "1538479", this.dataList, ""), 
      new CardsData("No. of students", "41662794", this.dataList, ""),
    ];
}



