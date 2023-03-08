import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import { MsalInterceptor, MsalBroadcastService, MsalGuard, MsalService, MsalRedirectComponent, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalModule, ProtectedResourceScopes } from '@azure/msal-angular';
import { BrowserAuthOptions, PublicClientApplication, InteractionType, Configuration, BrowserCacheLocation, BrowserSystemOptions, CacheOptions } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

interface IMsalSettings {
  clientId: string,
  authority: string,
  redirectPath: string
}

@Injectable({
  providedIn: 'root'
})
export class MsalmoduleserviceService {

  public addMsal(mainModule: NgModule) {
    const protectedResources: { url: string, scopes: Array<string> }[] = [];
    protectedResources.push(...environment.protectedResourceMap);
    const msalModule = this.createMsalModule(environment.msal, protectedResources);
    if (!mainModule.imports) {
      mainModule.imports = [];
    }
    mainModule.imports.push(msalModule);

    if (!mainModule.providers) {
      mainModule.providers = [];
    }
    mainModule.providers.push(
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
      },
      MsalBroadcastService,
      MsalGuard,
      MsalService
    );
    if (!mainModule.bootstrap) {
      mainModule.bootstrap = [];
    }
    mainModule.bootstrap.push(MsalRedirectComponent);
  }

  private createMsalModule(settings: IMsalSettings, protectedResources: { url: string, scopes: Array<string>; }[]): ModuleWithProviders<MsalModule> {
    const webpageBaseUrl = location.origin + "/";
    const auth: BrowserAuthOptions = {
      clientId: settings.clientId,
      authority: settings.authority,
      redirectUri: webpageBaseUrl
    };
    const cache: CacheOptions = {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: false,
    };
    const system: BrowserSystemOptions = {
      loggerOptions: {
        loggerCallback: () => { },
        piiLoggingEnabled: false
      }
    };
    const configuration: Configuration = {
      auth,
      cache,
      system
    };

    const publicClientApplication = new PublicClientApplication(configuration);
    const interactionType = InteractionType.Redirect;
    const guardConfig: MsalGuardConfiguration = {
      interactionType
    };
    const protectedResourceMap: Map<string, Array<string | ProtectedResourceScopes> | null> = new Map();
    protectedResources.forEach(element => {
      protectedResourceMap.set(element.url, element.scopes);
    });
    const interceptorConfig: MsalInterceptorConfiguration = {
      interactionType,
      protectedResourceMap
    };
    return MsalModule.forRoot(publicClientApplication, guardConfig, interceptorConfig);
  }
}
