
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
 // playersUrl = "../../assets/players.json";  // URL to web api
 playersUrl = "https://football-players-b31f2.firebaseio.com/players.json";  // URL to web api
  
  

  constructor(
    private http: HttpClient,
    ) {
    
  }

  getConfig() {
   // return this.http.get(this.playersUrl);
  }

  getPlayers(): Observable<Player[]>{
    return this.http.get<Player[]>(this.playersUrl)
  }

  searchPlayers(term: string,term2:string,term3:string): Observable<Player[]> {
    term = term.trim();
    term2 = term.trim();
    term3 = term.trim();
    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('age', term).set('position', term2).set('name',term3) } : {};

    return this.http.get<Player[]>(this.playersUrl, options)
  }
  
  
  searchPlayer(term: string): Observable<Player[]> {
    term = term.trim();
    
    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Player[]>(this.playersUrl, options)
  }
}
