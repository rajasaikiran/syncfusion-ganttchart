import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MsalmoduleserviceService } from './shared/msalmoduleservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './events/events.component';
import { DatePipe } from '@angular/common';
import { FilterService, GanttModule, SortService } from '@syncfusion/ej2-angular-gantt';
import { FormsModule } from '@angular/forms';

const ROUTES: Routes = [
  {
    path: environment.msal.redirectPath,
    component: MsalRedirectComponent
  },
  {
    path: "",
    redirectTo: 'events',
    pathMatch: 'full'
  },
  {
    path: "events",
    component: EventsComponent,
    canActivate: [MsalGuard]
  }
]

const mainModule: NgModule = {
  declarations: [
    AppComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, GanttModule, BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [MsalmoduleserviceService, DatePipe, FilterService, SortService],
  bootstrap: [AppComponent, MsalRedirectComponent]
}

const msalModuleService = new MsalmoduleserviceService();
msalModuleService.addMsal(mainModule);

@NgModule({
  declarations: mainModule.declarations,
  imports: mainModule.imports,
  providers: mainModule.providers,
  bootstrap: mainModule.bootstrap
})
export class AppModule { }
