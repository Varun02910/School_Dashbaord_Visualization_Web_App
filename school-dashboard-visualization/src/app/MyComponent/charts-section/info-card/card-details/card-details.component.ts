import { Component, input } from '@angular/core';
import { CardData } from '../../card-data-class';

@Component({
  selector: 'app-card-details',
  imports: [],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  data= input<CardData>();
}
