import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseInfoComponent } from '../components/course-info/course-info.component';
import { CourseSelectionComponent } from '../components/course-selection/course-selection.component';
import { ScorecardComponent } from '../components/scorecard/scorecard.component';

const routes: Routes = [
  { path: '', redirectTo: 'course-selection', pathMatch: 'full' },
  { path: 'course-selection', component: CourseSelectionComponent },
  { path: 'course-info/:id', component: CourseInfoComponent },
  { path: 'scorecard/:id', component: ScorecardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
