import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSettingComponent } from './form-setting.component';

describe('FormSettingComponent', () => {
  let component: FormSettingComponent;
  let fixture: ComponentFixture<FormSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
