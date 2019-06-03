import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Player } from './player';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PlayerService', () => {
  let playerService:PlayerService; 
  let http:HttpClient
  
  beforeEach(async() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      HttpClientModule,
      HttpClientTestingModule,
    ],
    providers: [
      HttpClient,
      HttpTestingController,
    ]
  }).compileComponents());

  beforeEach(() => {
    
    
    playerService = new PlayerService(http); 
  });


  it('should be created', () => {
    const service: PlayerService = TestBed.get(PlayerService);
    expect(service).toBeTruthy();
  });

  it('player create', () =>{
   playerService.playersUrl = "https://football-players-b31f2.firebaseio.com/players.json"
   
   
   
   //expect(playerService.getPlayers()[0].name).toEqual("Romelu Lukaku");
  } )
});
