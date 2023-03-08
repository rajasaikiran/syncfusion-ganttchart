import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base'
registerLicense("ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxLeUx0RWFab1h6cVdMY1pBNQtUQF1hSn5RdEBjX3pZdXRVR2FZ")


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
