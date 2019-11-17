import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovicafeComponent } from './covicafe.component';

describe('CovicafeComponent', () => {
  let component: CovicafeComponent;
  let fixture: ComponentFixture<CovicafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovicafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovicafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
