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
import { PlayerNamePipePipe } from './pipes/player-name-pipe.pipe';
import { SaveGamesComponent } from './components/save-games/save-games.component';
import { FirebaseDbComponent } from './components/firebase-db/firebase-db.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    CourseSelectionComponent,
    NavBarComponent,
    CourseInfoComponent,
    ScorecardComponent,
    PlayerNamePipePipe,
    SaveGamesComponent,
    FirebaseDbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
