import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseInfoComponent } from '../components/course-info/course-info.component';
import { CourseSelectionComponent } from '../components/course-selection/course-selection.component';

const routes: Routes = [
  { path: '', redirectTo: 'course-selection', pathMatch: 'full' },
  { path: 'course-selection', component: CourseSelectionComponent },
  { path: 'course-info/:id', component: CourseInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
