import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/card/card.component';
import { DialogEndOfTheGameComponent } from 'src/app/dialog-end-of-the-game/dialog-end-of-the-game.component';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  stamp: any;
  deck: Card[];
  prevCard: Card;

  constructor(public dialog: MatDialog) {}

  init() {
    this.stamp = 0;
    this.deck = this.getNewDeck();
    this.cardsShowPreview(3000);
    this.prevCard = null;
  }

  getNewDeck() {
    return getPrimesWithPair(50)
      .map((value, index) => ({
        value,
        id: index,
        isFlipped: true,
        canBeFlipped: false
      }));
  }

  cardsShowPreview(ms = 3000) {
    !!this.stamp && clearTimeout(this.stamp);
    this.stamp = setTimeout(() => this.deck.forEach(card => {
      card.isFlipped = false;
      card.canBeFlipped = true;
    }), ms);
  }

  checkConditionOfPair(card: Card) {
    card.isFlipped = true;

    if (!this.prevCard) {
      this.prevCard = card;
      return;
    }

    if (this.prevCard.value === card.value) {
      card.canBeFlipped = false;
      this.prevCard.canBeFlipped = false;
    } else {
      const prevCardId = this.prevCard.id;
      this.stamp = setTimeout(() => {
        card.isFlipped = false;
        this.deck[prevCardId].isFlipped = false;
      }, 1000);
    }
    this.checkIsEndGame();
    this.prevCard = null;
  }

  checkIsEndGame() {
    const countFlipped = this.deck.filter(e => e.isFlipped).length;
    
    if(countFlipped === 30) {
      setTimeout(() => {
        this.openDialog();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogEndOfTheGameComponent, {
      width: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.init();
      }
    });
  }
}

export const getPrimesWithPair = (maxNum = 50) => {
  const primes = findPrimesFaster(maxNum);
  return shuffleArray([...primes, ...primes]);
};

export const shuffleArray = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export const findPrimesFaster = (target) => {
  if (target && Number.isInteger(target) && target > 2) {
    let record = [];
    let primes = [2];
    let max = Math.sqrt(target);

    for (let number = 0; number < target; number++) {
      record.push(1);
    }

    for (let prime = 3; prime <= max; prime += 2) {
      if (record[prime]) {
        for (let multiple = prime * prime; multiple < target; multiple += prime * 2) {
          record[multiple] = 0;
        }
      }
    }

    for (let sievedNumber = 3; sievedNumber < target; sievedNumber += 2) {
      if (record[sievedNumber]) {
        primes.push(sievedNumber);
      }
    }

    return primes;
  }

  return [];
};