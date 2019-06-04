import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/player.service';
import { Player, SearchModel } from "../shared/player";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  providers: [PlayerService],
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  allPlayers: Player[];
  visiblePlayers: Player[];
  searchModel: SearchModel = new SearchModel();
  formSearch: FormGroup;
  nameError = false;
  ageError = false;
  status_values = [
    "Centre-Forward",
    "Keeper",
    "Centre-Back",
    "Left-Back",
    "Central Midfield",
    "Left Midfield",
    "Attacking Midfield",
    "Left Wing",
    "Defensive Midfield",
    ]
    
  constructor(public playerService: PlayerService) {}

  ngOnInit() {
    
    //to be seen in the select
    this.searchModel.position = "Position"

    this.formSearch = new FormGroup({
      namePlayer: new FormControl(' '),
      positionPlayer: new FormControl(''),
      agePlayer: new FormControl(this.searchModel.agePlayer, [Validators.min(18), Validators.max(40)])
    })

    this.playerService.getPlayers().subscribe(
      players => {
        this.allPlayers = players;
        this.visiblePlayers = this.allPlayers;
        this.calculateAges();
      }
    );
  }

  calculateAges() {
    this.allPlayers.forEach(player => {
      player.age = this.calculateAge(player.dateOfBirth)
    });
  }

  search(namePlayer: string, positionPlayer: string, agePlayer: number) {
    let playersF = this.allPlayers;

    if (namePlayer !== undefined && namePlayer.trim().length > 0)
      playersF = playersF.filter(player => player.name.toLowerCase().includes(namePlayer.toLowerCase()));

    if (positionPlayer !== undefined && positionPlayer.trim().length > 0 && positionPlayer !== "Position")
      playersF = playersF.filter(player => player.position == positionPlayer);

    if (agePlayer !== undefined && agePlayer !== null)
      playersF = playersF.filter(player => agePlayer == player.age)

    this.visiblePlayers = playersF;
  }

  calculateAge(birthdate: string) {
    var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  validateAge(age: number) {
    this.ageError = (age < 18 || age > 40)
  }

  validateName(name: string) {
    const regex = /^[a-zA-Z_]*$/;
    this.nameError = (regex.exec(name)) === null;
  }

  onSubmit(form: NgForm) {
    this.validateName(form.value.namePlayer)
    this.validateAge(form.value.agePlayer)

    if (!(this.nameError || this.ageError))
      this.search(form.value.namePlayer, form.value.position, form.value.agePlayer);
  }
}
