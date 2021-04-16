import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseInfoComponent } from '../components/course-info/course-info.component';
import { CourseSelectionComponent } from '../components/course-selection/course-selection.component';
import { SaveGamesComponent } from '../components/save-games/save-games.component';
import { ScorecardComponent } from '../components/scorecard/scorecard.component';

const routes: Routes = [
  { path: 'course-info/:id', component: CourseInfoComponent },
  { path: 'scorecard/:id', component: ScorecardComponent },
  { path: 'saved-games', component: SaveGamesComponent },
  { path: '', component: CourseSelectionComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
