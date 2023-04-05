import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyManagementComponent } from './giphy-management.component';

describe('GiphyManagementComponent', () => {
  let component: GiphyManagementComponent;
  let fixture: ComponentFixture<GiphyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
