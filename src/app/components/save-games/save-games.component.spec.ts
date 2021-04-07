import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveGamesComponent } from './save-games.component';

describe('SaveGamesComponent', () => {
  let component: SaveGamesComponent;
  let fixture: ComponentFixture<SaveGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
