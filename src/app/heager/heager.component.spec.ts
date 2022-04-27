import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeagerComponent } from './heager.component';

describe('HeagerComponent', () => {
  let component: HeagerComponent;
  let fixture: ComponentFixture<HeagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
