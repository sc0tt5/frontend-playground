import { fromEvent, interval } from 'rxjs';
import { mapTo, scan, takeUntil, takeWhile, tap } from 'rxjs/operators';

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abortButton = document.getElementById('abort');

// streams
const counter$ = interval(1000);
const abortClick$ = fromEvent(abortButton, 'click');

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => accumulator + current, 10),
    tap(console.log), // takeWhile will prevent from continuing when 0
    takeWhile(value => value >= 0),
    takeUntil(abortClick$) // the event will stop the timer
  )
  .subscribe(value => {
    countdown.innerHTML = value.toString();

    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
