import {Component, OnInit} from '@angular/core';
import {KeyService} from "../game-keyboard/components/key/key.service";
import {AttemptsObject} from "./attempts-object";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  word = 'elder'
  attempts: AttemptsObject[] = []

  constructor(private data: KeyService) {
    this.data.currentMessage.subscribe(key => this.writeLetter(key));
  }

  ngOnInit(): void {
    for (let i = this.attempts.length; i < 6; i++) {
      this.attempts = [...this.attempts, {content: "", confirmed: false}];
    }
  }

  findAttempt = () => {
    console.log(this.attempts)
    for (let i = 0; i < this.attempts.length; i++) {
      if (!this.attempts[i].confirmed)
        return i;
    }
    return this.attempts.length;
  }

  writeLetter = (letter: string) => {

    if (letter === '') { return }

    const attemptIndex = this.findAttempt();
    let attemptObject = this.attempts[attemptIndex];

    if (letter === 'DEL') {
      attemptObject.content = attemptObject.content.slice(0, -1);
      this.attempts[attemptIndex] = {...attemptObject, content: attemptObject.content};
      return;
    }
    else if (letter === 'ENTER') {
      if (attemptObject.content.length === 5) {
        this.attempts[attemptIndex] = {...attemptObject, confirmed: true};
        console.log("OK!");
      }
      return;
    }

    if (attemptObject.content.length < 5) {
      attemptObject.content = attemptObject.content.concat(letter);
      this.attempts[attemptIndex] = {...attemptObject, content: attemptObject.content};
    }
  }

}
