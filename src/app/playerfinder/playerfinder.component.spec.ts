import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayerfinderComponent } from './playerfinder.component';

describe('PlayerfinderComponent', () => {
  let component: PlayerfinderComponent;
  let fixture: ComponentFixture<PlayerfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
