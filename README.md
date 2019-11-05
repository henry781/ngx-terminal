# NGX Terminal

This component is a basic easy to use fake terminal for Angular.

![](https://user-images.githubusercontent.com/26506130/68243301-83457500-0012-11ea-8c2c-4c92eafb3020.gif)

## Usage

component.html
```
<ngx-terminal [login]="login" [server]="server" (command)="onCommand($event)"></ngx-terminal>
```

component.ts
```
  public server = 'localhost';
  public login = 'henry781';

  onCommand(prompt: TerminalPrompt) {
    switch (prompt.getCommand()) {

      case 'whoami':
        prompt.response = prompt.login;
        prompt.responseComplete();
        break;

      default:
        prompt.response = 'unknown command';
        prompt.responseComplete();
    }
  }
```

module.ts
```
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
```

## Features

### Autoscroll

This terminal supports autoscroll when the scroll position is at the end of the page.
It can be disabled using the input `autoscroll="false"`.

### History (Up & Down)

Keyboard keys &#8593; and &#8595; allows to navigate in the command history.

### Ansi color

There is a peer dependency with lib [ansi_up](https://www.npmjs.com/package/ansi-up). 

### Asynchronous response

### HTML response
