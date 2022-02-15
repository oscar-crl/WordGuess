import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { GameBoardComponent } from './game/game-board/game-board.component';
import { GameKeyboardComponent } from './game/game-keyboard/game-keyboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { LetterCardComponent } from './game/components/letter-card/letter-card.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { GameBoardRowComponent } from './game/game-board/game-board-row/game-board-row.component';
import { KeyComponent } from './game/game-keyboard/components/key/key.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GameBoardComponent,
    GameKeyboardComponent,
    LetterCardComponent,
    GameBoardRowComponent,
    KeyComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
