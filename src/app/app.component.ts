import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public profilePicture?: SafeResourceUrl;
  public displayName?: string;

  constructor(private readonly _authService: MsalService,
    private readonly _http: HttpClient, private readonly _domsanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.getProfile();
  }

  public logout() {
    this._authService.logout();
  }

  private getProfile() {
    this._http.get("https://graph.microsoft.com/v1.0/me").subscribe((resp: any) => {
      this.displayName = 'Hello' + ' ' + resp['displayName'] + ' !';
    });
  }

}