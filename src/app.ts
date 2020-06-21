import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck, throttleTime } from 'rxjs/operators';

// elem refs
const inputBox = document.getElementById('text-input');

// streams
const click$ = fromEvent(document, 'click');

click$.pipe(throttleTime(3000)).subscribe(console.log);
