import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';

// elem refs
const inputBox = document.getElementById('text-input');

// streams
const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(
    debounceTime(1000),
    mergeMap(({ target }) => {
      const term = (<any>target).value;
      return ajax.getJSON(`https://api.github.com/users/${term}`);
    }),
    distinctUntilChanged()
  )
  .subscribe(console.log);
