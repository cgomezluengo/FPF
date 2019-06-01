import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerfinderComponent } from './playerfinder/playerfinder.component';

const routes: Routes = [
  { path: '', redirectTo: '/playerfinder', pathMatch: 'full' },
  { path: 'playerfinder', component: PlayerfinderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
