import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    const msalServiceMock = {
      instance: {
        initialize: () => Promise.resolve(),
        getActiveAccount: () => null,
        getAllAccounts: () => [],
        setActiveAccount: () => {}
      },
      handleRedirectObservable: () => of(null),
      loginRedirect: () => {},
      logoutRedirect: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: MsalService, useValue: msalServiceMock },
        { provide: MsalBroadcastService, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});