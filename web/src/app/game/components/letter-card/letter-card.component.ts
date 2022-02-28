import {Component, Input, OnInit} from '@angular/core';
import {LetterObject} from "../letter-object";

@Component({
  selector: 'letter-card',
  templateUrl: './letter-card.component.html',
  styleUrls: ['./letter-card.component.scss']
})
export class LetterCardComponent implements OnInit {

  @Input() letter!: LetterObject;

  constructor() { }

  ngOnInit(): void {
  }

}
