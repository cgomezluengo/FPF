
import { Player } from "../shared/player";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormsModule } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  formData: Player;
  playersUrl = "https://football-players-b31f2.firebaseio.com/players.json";  // URL to web api
  
  

  constructor(
    private http: HttpClient,
    ) {
    
  }

  
  getPlayers(): Observable<Player[]>{
    return this.http.get<Player[]>(this.playersUrl)
  }

 
}
