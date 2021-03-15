import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesValidesComponent } from './commandes-valides.component';

describe('CommandesValidesComponent', () => {
  let component: CommandesValidesComponent;
  let fixture: ComponentFixture<CommandesValidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandesValidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
