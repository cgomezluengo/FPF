import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { PlayerComponent } from './player.component';
import { Player, SearchModel } from "../shared/player";
import { HttpClient, HttpParams } from '@angular/common/http';

  describe("Test for player.calculateAge", ()=>{

    it("should return '26' years", ()=>{
      let player :Player = new Player();
      
      player.dateOfBirth = "02/22/1993";
      //let playerComponent: PlayerComponent = new PlayerComponent();

      expect(this.calculateAge(player.dateOfBirth)).toEqual(26);
    });
   });
 
   
  

