import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyViewDetaisComponent } from './giphy-view-detais.component';

describe('GiphyViewDetaisComponent', () => {
  let component: GiphyViewDetaisComponent;
  let fixture: ComponentFixture<GiphyViewDetaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphyViewDetaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyViewDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
