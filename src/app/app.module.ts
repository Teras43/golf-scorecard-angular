import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseSelectionComponent } from './components/course-selection/course-selection.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MaterialModule } from './modules/material.module';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    CourseSelectionComponent,
    NavBarComponent,
    CourseInfoComponent,
    ScorecardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
