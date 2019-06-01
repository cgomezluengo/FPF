import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { Player , SearchModel } from "../shared/player";

import { NgForm, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  providers: [ PlayerService ],
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  allPlayers: Player[];
  visiblePlayers: Player[];
  searchModel:SearchModel = new SearchModel();
  formSearch: FormGroup;

  constructor(public playerService: PlayerService) { 
    
  }


  ngOnInit() {

    this.formSearch = new FormGroup({
      namePlayer: new FormControl(' '),
      positionPlayer: new FormControl(' '),
      agePlayer: new FormControl(' ')
    })

    this.playerService.getPlayers().subscribe(
      players => {
        this.allPlayers = players;
        this.visiblePlayers = this.allPlayers;
        this.calculateAges();
      }
    );

  //   this.formSearch = new FormGroup({
  //     namePlayer: new FormControl(null, Validators.required),
  //     positionPlayer: new FormControl(' '),
  //     agePlayer: new FormControl(null, [Validators.max(this.maxAge),Validators.min(this.minAge)])
  //   })
  }

  calculateAges() {
    this.allPlayers.forEach(player => {
      player.age = this.calculateAge(player.dateOfBirth)
    });
  }

  search(namePlayer: string, positionPlayer:string, agePlayer:number) {
    let playersF = this.allPlayers;
    
    if (namePlayer !== undefined && namePlayer.trim().length > 0) {
      playersF = playersF.filter(player => player.name.toLowerCase().includes(namePlayer.toLowerCase()));
    }

    if (positionPlayer !== undefined && positionPlayer.trim().length > 0){
      playersF = playersF.filter(player => player.position == positionPlayer);
    }

    if (agePlayer !== undefined && agePlayer !== null){
      playersF = playersF.filter(player => agePlayer == player.age)
    }

    this.visiblePlayers = playersF;
  }
 
  calculateAge(birthdate:string) {
    var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }  

  onSubmit(form: NgForm){
      this.search(form.value.name,form.value.position,form.value.age);
    }
  }
