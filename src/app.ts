import { fromEvent, of } from 'rxjs';
import { first, map, takeWhile } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);
const click$ = fromEvent(document, 'click');

click$
  .pipe(
    map((event: MouseEvent) => ({
      x: event.clientX,
      y: event.clientY
    })),
    // filter, take(1)
    takeWhile(({ y }) => y <= 200, true)
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('Complete!')
  });
