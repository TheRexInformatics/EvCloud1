import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { protectedResources } from './auth-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'pedidos-frontend';
  isLoggedIn = false;
  userName = '';

  private authService = inject(MsalService);

  ngOnInit(): void {
    this.authService.instance.initialize().then(() => {
      this.authService.handleRedirectObservable().subscribe({
        next: (result: AuthenticationResult | null) => {
          if (result) {
            this.authService.instance.setActiveAccount(result.account);
          }
          this.checkLoginStatus();
        },
        error: (error) => console.error('Error de autenticación:', error)
      });
    });
  }

  checkLoginStatus(): void {
    const activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0]);
    }
    
    const currentAccount = this.authService.instance.getActiveAccount();
    this.isLoggedIn = !!currentAccount;
    if (currentAccount) {
      this.userName = currentAccount.name || currentAccount.username;
    }
  }

  login(): void {
    this.authService.loginRedirect({
      scopes: protectedResources.apiGateway.scopes
    });
  }

  logout(): void {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
}