import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrowerCardComponent } from './drower-card.component';

describe('DrowerCardComponent', () => {
  let component: DrowerCardComponent;
  let fixture: ComponentFixture<DrowerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrowerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
