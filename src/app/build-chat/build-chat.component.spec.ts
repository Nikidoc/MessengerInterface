import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildChatComponent } from './build-chat.component';

describe('BuildChatComponent', () => {
  let component: BuildChatComponent;
  let fixture: ComponentFixture<BuildChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
