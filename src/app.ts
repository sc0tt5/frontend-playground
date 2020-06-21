import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck } from 'rxjs/operators';

// elem refs
const inputBox = document.getElementById('text-input');

// streams
const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(debounceTime(1000), pluck('target', 'value'), distinctUntilChanged())
  .subscribe(console.log);
