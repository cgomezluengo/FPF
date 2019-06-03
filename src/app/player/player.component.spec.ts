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
  //let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,HttpClientModule,BrowserModule,ReactiveFormsModule,ReactiveFormsModule,BrowserModule,RouterModule,
        
      ],
      declarations: [AppComponent,
        PlayerComponent
      ],
      providers: [
        PlayerService
      ],
      
      
    }).compileComponents();
  }));

   beforeEach(() => {
    
    playerService = new PlayerService(http)
    component = new PlayerComponent(playerService) 
    //fixture = TestBed.createComponent(PlayerComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("calculateAge should return '26' years", async(()=>{   
    
    expect(component.calculateAge("02/02/1993")).toEqual(26);
  }));

});