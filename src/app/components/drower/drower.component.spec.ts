import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrowerComponent } from './drower.component';

describe('DrowerComponent', () => {
  let component: DrowerComponent;
  let fixture: ComponentFixture<DrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
