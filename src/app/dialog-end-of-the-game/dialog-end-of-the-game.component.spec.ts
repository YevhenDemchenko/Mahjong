import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEndOfTheGameComponent } from './dialog-end-of-the-game.component';

describe('DialogEndOfTheGameComponent', () => {
  let component: DialogEndOfTheGameComponent;
  let fixture: ComponentFixture<DialogEndOfTheGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEndOfTheGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEndOfTheGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
