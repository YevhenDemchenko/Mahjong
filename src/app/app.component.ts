import { Component } from '@angular/core';
import { GameControllerService } from 'src/services/game-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mahjong';
  
  constructor(public game: GameControllerService) {
    this.game.init();
  }
}
