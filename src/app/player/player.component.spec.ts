import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { PlayerComponent } from './player.component';
import { Player, SearchModel } from "../shared/player";
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('PlayerComponent', () => {
  let http:HttpClient
  let playerService :PlayerService
  let component: PlayerComponent
  let fixture: ComponentFixture<PlayerComponent>;

  let player1 = new Player();
  player1.dateOfBirth = "1993-05-13";
  player1.name = "Romelu Lukaku";
  player1.position = "Centre-Forward";

  let player2 = new Player();
  player2.dateOfBirth = "1987-02-22";
  player2.name = "Sergio Romero";
  player2.position = "Keeper";
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule
      ],
      declarations: [
        AppComponent,
        PlayerComponent,
      ],
      providers: [
        PlayerService,
      ],
    }).compileComponents();
  }));

   beforeEach(() => {
    playerService = new PlayerService(http);
    component = new PlayerComponent(playerService);
    component.allPlayers = [player1, player2];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("calculateAge should return '26' years", async(()=>{   
    expect(component.calculateAge("02/02/1993")).toEqual(26);
  }));

  it("ageError should be false from validateAge(26)", async(()=>{   
    component.validateAge(26)
    expect(component.ageError).toEqual(false);
  }));
  
  it("ageError should be true from validateAge(12)", async(()=>{   
    component.validateAge(12)
    expect(component.ageError).toEqual(true);
  }));
  
  it("ageError should be true from validateAge(-1)", async(()=>{   
    component.validateAge(-1)
    expect(component.ageError).toEqual(true);
  }));

  it("nameError should be false from validateName('Luk')", async(()=>{   
    component.validateName("Luk")
    expect(component.nameError).toEqual(false);
  }));

  it("nameError should be true from validateName('Luk2')", async(()=>{   
    component.validateName("Luk2")
    expect(component.nameError).toEqual(true);
  }));

  it("nameError should be false from empty validateName('')", async(()=>{   
    component.validateName("")
    expect(component.nameError).toEqual(false);
  }));
  
  it("nameError should be true from validateName('2Luk')", async(()=>{   
    component.validateName("2Luk")
    expect(component.nameError).toEqual(true);
  }));
  
  it("the ages of the players are well calculated", async(()=>{   
    component.calculateAges()
    expect(component.allPlayers[0].age).toEqual(26);
    expect(component.allPlayers[1].age).toEqual(32);
  }));

  it("the search method finds the correct players", async(()=>{   
    component.calculateAges();
    component.search("Ser", "Keeper", 32);
    expect(component.visiblePlayers[0].age).toEqual(32);
    expect(component.visiblePlayers[0].name).toEqual("Sergio Romero");
    component.calculateAges();
    component.search("Luk", "Centre-Forward", 26);
    expect(component.visiblePlayers[0].age).toEqual(26);
    expect(component.visiblePlayers[0].name).toEqual("Romelu Lukaku");
  }));
});
