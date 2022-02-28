import {Component, Input, OnInit } from '@angular/core';
import {KeyService} from "./key.service";
import {LetterService} from "../../../components/letter.service";
import {LetterObject} from "../../../components/letter-object";

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {

  @Input() key!: string;
  letter: LetterObject = {letter: '', state: '', confirmed: false};

  constructor(private data: KeyService, private dataLetter: LetterService) {
    this.dataLetter.currentLetter.subscribe(letter => this.handleLetter(letter))
  }

  ngOnInit(): void {
  }

  handleKey = (key: string) => {
    this.data.typeKey(key);
  }

  handleLetter = (letter: LetterObject) => {
    if (letter.letter !== this.key)
      return;
    this.letter = letter;
  }

}
