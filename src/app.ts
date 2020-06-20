import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// helpers
function calculateScrollPercent(element: HTMLElement): number {
  const { scrollTop, scrollHeight, clientHeight } = element;
  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elem
const progressBar: HTMLElement = document.querySelector('.progress-bar');

// streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
  // percent progress
  map(({ target }) => calculateScrollPercent((<HTMLDocument>target).documentElement))
);

progress$.subscribe((percent: number) => {
  progressBar.style.width = `${percent}%`;
});
