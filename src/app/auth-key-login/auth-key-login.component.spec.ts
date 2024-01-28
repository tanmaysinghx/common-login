import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthKeyLoginComponent } from './auth-key-login.component';

describe('AuthKeyLoginComponent', () => {
  let component: AuthKeyLoginComponent;
  let fixture: ComponentFixture<AuthKeyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthKeyLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthKeyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
