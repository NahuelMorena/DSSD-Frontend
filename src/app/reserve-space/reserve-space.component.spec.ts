import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveSpaceComponent } from './reserve-space.component';

describe('ReserveSpaceComponent', () => {
  let component: ReserveSpaceComponent;
  let fixture: ComponentFixture<ReserveSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveSpaceComponent]
    });
    fixture = TestBed.createComponent(ReserveSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
