import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebedsComponent } from './updatebeds.component';

describe('UpdatebedsComponent', () => {
  let component: UpdatebedsComponent;
  let fixture: ComponentFixture<UpdatebedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatebedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
