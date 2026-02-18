import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDialog } from './resumen-dialog';

describe('ResumenDialog', () => {
  let component: ResumenDialog;
  let fixture: ComponentFixture<ResumenDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
