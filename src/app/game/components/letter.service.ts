import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LetterObject} from "./letter-object";

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  private letterSource = new BehaviorSubject({letter: '', state: '', confirmed: false});
  currentLetter = this.letterSource.asObservable();

  constructor() { }

  sendLetter(letter: LetterObject) {
    console.log(letter);
    this.letterSource.next(letter);
  }
}
