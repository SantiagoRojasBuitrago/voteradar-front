import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteHomeComponent } from './gerente-home.component';

describe('GerenteHomeComponent', () => {
  let component: GerenteHomeComponent;
  let fixture: ComponentFixture<GerenteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
