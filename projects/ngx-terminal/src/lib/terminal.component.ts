import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TerminalPrompt} from './TerminalPrompt';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, OnDestroy {

  private static KEYCODES = {
    ENTER: 13,
    ARROW_DOWN: 40,
    ARROW_UP: 38
  };

  @HostBinding('class') class = 'ngx-terminal';

  /**
   * Autoscroll
   */
  private _autoscroll = true;

  @Output() public autoscrollChange = new EventEmitter();

  @Input()
  public get autoscroll() {
    return this._autoscroll;
  }

  public set autoscroll(autoscroll: boolean) {
    this._autoscroll = autoscroll;
    this.autoscrollChange.emit(this._autoscroll);
  }

  /**
   * Login & server & intro
   */
  @Input() public login = 'root';
  @Input() public server = 'localhost';
  @Input() public intro: string;

  /**
   * When a command is executed
   */
  @Output() public command = new EventEmitter<TerminalPrompt>();

  @ViewChildren('terminalInput') private terminalInputs: QueryList<ElementRef>;
  @ViewChild('terminalContainer', {read: ElementRef, static: false}) private terminalContainer: ElementRef;

  public stack: TerminalPrompt[] = [];
  public currentPrompt: TerminalPrompt;

  private historyIndex: number;
  private historyCurrentValue: string;

  private subscriptions: {
    onCurrentPromptResponseComplete?: Subscription;
    onCurrentPromptResponseChanged?: Subscription;
  } = {};

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * On Destroy
   */
  public ngOnDestroy() {
    if (this.subscriptions.onCurrentPromptResponseChanged) {
      this.subscriptions.onCurrentPromptResponseChanged.unsubscribe();
    }
    if (this.subscriptions.onCurrentPromptResponseChanged) {
      this.subscriptions.onCurrentPromptResponseChanged.unsubscribe();
    }
  }

  /**
   * On terminal init
   */
  public ngOnInit() {
    this.initNewPrompt();
  }

  /**
   * Scroll to bottom
   */
  public scrollBottom() {
    this.terminalContainer.nativeElement.scrollTop = this.terminalContainer.nativeElement.scrollHeight;
  }

  /**
   * Init a new prompt
   */
  public initNewPrompt() {

    // add new prompt
    this.currentPrompt = new TerminalPrompt({
      text: '',
      login: this.login,
      server: this.server,
      response: ''
    });
    this.stack.push(this.currentPrompt);
    if (this.stack[this.stack.length - 2] && this.stack[this.stack.length - 2].text === '') {
      this.stack.splice(this.stack.length - 2, 1);
    }

    // reset history index
    this.historyIndex = this.stack.length - 1;
    this.historyCurrentValue = '';

    // on response changed
    if (this.subscriptions.onCurrentPromptResponseChanged) {
      this.subscriptions.onCurrentPromptResponseChanged.unsubscribe();
    }
    this.subscriptions.onCurrentPromptResponseChanged = this.currentPrompt.onResponseChanged()
      .subscribe(() => {
        if (this.autoscroll) {
          this.scrollBottom();
        }
      });

    // on response complete
    if (this.subscriptions.onCurrentPromptResponseComplete) {
      this.subscriptions.onCurrentPromptResponseComplete.unsubscribe();
    }
    this.subscriptions.onCurrentPromptResponseComplete = this.currentPrompt.onResponseComplete()
      .subscribe(() => this.initNewPrompt());

    // let some time to display new prompt then focus
    setTimeout(() => this.focusCurrentPrompt(), 100);
  }

  /**
   * On terminal clicked
   */
  public onTerminalClicked() {
    // when user click inside terminal, we focus on current prompt
    this.focusCurrentPrompt();
  }

  /**
   * Focus current prompt
   */
  public focusCurrentPrompt() {
    const lastTerminalInput = this.terminalInputs.last;
    if (lastTerminalInput) {
      lastTerminalInput.nativeElement.focus();
    }
  }

  /**
   * History up
   */
  public historyUp() {

    if (this.historyIndex === this.stack.length - 1) {
      // first 'up', we record current prompt value & set history index to previous prompt
      this.historyCurrentValue = this.currentPrompt.text;
      this.historyIndex = this.stack.length - 2;

    } else if (this.historyIndex > 0) {
      this.historyIndex--;
    }

    const historyEntry = this.stack[this.historyIndex];
    if (historyEntry) {
      this.currentPrompt.text = historyEntry.text;
    }
  }

  /**
   * History down
   */
  public historyDown() {

    if (this.historyIndex < this.stack.length - 2) {
      this.historyIndex++;
      const historyEntry = this.stack[this.historyIndex];
      if (historyEntry) {
        this.currentPrompt.text = historyEntry.text;
      }

    } else if (this.historyIndex === this.stack.length - 2) {
      this.historyIndex++;
      this.currentPrompt.text = this.historyCurrentValue;
    }
  }

  /**
   * On key pressed
   * @param event keyboard
   */
  public onKeyPressed(event: KeyboardEvent) {

    switch (event.keyCode) {

      case TerminalComponent.KEYCODES.ENTER:
        event.preventDefault();
        this.currentPrompt.lock();
        this.command.next(this.currentPrompt);
        break;

      case TerminalComponent.KEYCODES.ARROW_UP:
        event.preventDefault();
        this.historyUp();
        break;

      case TerminalComponent.KEYCODES.ARROW_DOWN:
        event.preventDefault();
        this.historyDown();
        break;

      default:
        // resize textarea with content
        const target = event.target as HTMLTextAreaElement;
        target.style.height = target.scrollHeight + 'px';
        break;
    }
  }
}
