import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private keySource = new BehaviorSubject('');
  currentMessage = this.keySource.asObservable();

  constructor() { }

  typeKey(message: string) {
    this.keySource.next(message)
  }

}
