import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: Card;
  @Output() flip = new EventEmitter<Card>();

  @HostListener('click')
  onClick() {
    this.item.canBeFlipped
    && !this.item.isFlipped
    && this.flip.emit(this.item);
  }

  constructor() {
  }

  ngOnInit() {
  }

}

export interface Card {
  id: number;
  value: number;
  isFlipped: boolean;
  canBeFlipped: boolean;
}
