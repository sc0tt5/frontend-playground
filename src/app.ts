import { interval } from 'rxjs';
import { mapTo, scan, takeWhile, tap } from 'rxjs/operators';

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

// streams
const counter$ = interval(1000);

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => accumulator + current, 10),
    tap(console.log), // takeWhile will prevent from continuing when 0
    takeWhile(value => value >= 0)
  )
  .subscribe(value => {
    countdown.innerHTML = value.toString();

    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
