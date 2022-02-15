import {Component, Input, OnInit} from '@angular/core';
import {LetterObject} from "../../components/letter-object";
import {AttemptsObject} from "../attempts-object";
import {LetterService} from "../../components/letter.service";

@Component({
  selector: 'app-game-board-row',
  templateUrl: './game-board-row.component.html',
  styleUrls: ['./game-board-row.component.scss']
})
export class GameBoardRowComponent implements OnInit {

  @Input() attempt!: AttemptsObject;
  @Input() word!: String;
  letterObject: LetterObject[] = [];

  letterState = () => {
    console.log(this.attempt)
    let res: LetterObject[] = [];
    for (let i = 0; i < this.attempt.content.length; i++) {
      if (this.attempt.content[i] === this.word[i])
        res.push({letter: this.attempt.content[i], state: "valid", confirmed: this.attempt.confirmed});
      else if (this.word.includes(this.attempt.content[i]))
        res.push({letter: this.attempt.content[i], state: 'present', confirmed: this.attempt.confirmed});
      else
        res.push({letter: this.attempt.content[i], state: 'absent', confirmed: this.attempt.confirmed});
    }
    for (let i = this.attempt.content.length; i < 5; i++) {
      res.push({letter: '', state: 'empty', confirmed: false});
    }
    res.forEach(x => this.dataLetter.sendLetter(x));
    return res;
  }

  constructor(private dataLetter: LetterService) {}

  ngOnInit(): void {
    this.letterObject = this.letterState();
  }
}
