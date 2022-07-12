import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameTheBotComponent } from './name-the-bot.component';

describe('NameTheBotComponent', () => {
  let component: NameTheBotComponent;
  let fixture: ComponentFixture<NameTheBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameTheBotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameTheBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
