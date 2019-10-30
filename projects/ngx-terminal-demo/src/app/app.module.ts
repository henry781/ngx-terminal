import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TerminalModule} from '@henry781/ngx-terminal';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TerminalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
