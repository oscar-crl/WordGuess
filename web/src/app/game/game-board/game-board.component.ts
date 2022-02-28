import {Component, OnInit} from '@angular/core';
import {KeyService} from "../game-keyboard/components/key/key.service";
import {AttemptsObject} from "./attempts-object";
import {Key} from "../game-keyboard/components/key/key";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  word = ''
  attempts: AttemptsObject[] = []

  constructor(private data: KeyService, private http: HttpClient) {

    this.data.currentMessage.subscribe(key => this.writeLetter(key));

  }

  async requestAction(): Promise<void> {
    this.http.get<any>("http://localhost:8000/requestAction").subscribe(data => {
      this.writeLetter(data.letter);
      console.log("letter:", data.letter);
      this.requestAction();
    });
  }

  ngOnInit(): void {
    for (let i = this.attempts.length; i < 6; i++) {
      this.attempts = [...this.attempts, {content: "", confirmed: false}];
    }
  }

  findAttempt = () => {
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

    if (letter === 'RESTART') {
      this.attempts = []
      for (let i = this.attempts.length; i < 6; i++) {
        this.attempts = [...this.attempts, {content: "", confirmed: false}];
      }
      return;
    }
    if (letter === 'RESET') {
      attemptObject.content = "";
      this.attempts[attemptIndex] = {...attemptObject, content: attemptObject.content};
      return;
    }
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
