import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComComponent } from './update-com.component';

describe('UpdateComComponent', () => {
  let component: UpdateComComponent;
  let fixture: ComponentFixture<UpdateComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
