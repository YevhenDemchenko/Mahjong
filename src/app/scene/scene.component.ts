import { Component, OnInit } from '@angular/core';
import { GameControllerService } from 'src/services/game-controller.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  constructor(public game: GameControllerService) {}

  ngOnInit(): void {
  }

}
