import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface WordyGame {
  activeVowels: string[];
  activeConsonants: string[];
  redCards: string[];
  blueCards: string[];
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public currentGame: WordyGame = {
      activeVowels: [],
      activeConsonants: [],
      redCards: [],
      blueCards: []
  };
  public playerId: number = 1;
  public gameId: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getGame();
  }

  getUserData() {
    this.getGame();
  }

  getGame() {
    let headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "True",
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': '*',
      'Content-type': 'application/json'
    });
    let options = { headers: headers };


    console.log("get gamw");
    this.http.get<WordyGame>(`https://alittlewordyserver20240301163310.azurewebsites.net/gameapp/${this.gameId}/player/${this.playerId}`, options).subscribe(
      (result) => {
        console.log(JSON.stringify(result))
        this.currentGame = result;
      },
      (error) => {
        console.log("in error");
        console.error(error);
      }
    );
  }

  title = 'alittlewordy.client';
}
