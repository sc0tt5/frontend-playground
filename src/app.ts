import { combineLatest, fromEvent, of } from 'rxjs';
import { delay, filter, map, mergeMap, share, tap } from 'rxjs/operators';
import { calculateMortgage } from './helpers';

// elem refs
const loanAmount = document.getElementById('loanAmount');
const interest = document.getElementById('interest');
const loanLength = document.querySelectorAll('.loanLength');
const expected = document.getElementById('expected');

// helpers
const createInputValueStream = elem => {
  return fromEvent(elem, 'input').pipe(map((event: any) => parseFloat(event.target.value)));
};

// simulating a save request
const saveResponse = mortgageAmount => {
  return of(mortgageAmount).pipe(delay(1000));
};

// streams
const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

/*
 * Combine streams of the three values needed to complete
 * our mortgage calculation. Once all three are filled out
 * any subsequent updates will trigger a new calculation.
 */
const calculation$ = combineLatest(interest$, loanAmount$, loanLength$).pipe(
  map(([interest, loanAmount, loanLength]) => {
    return calculateMortgage(interest, loanAmount, loanLength);
  }),
  // proving the stream is shared
  tap(console.log),
  /*
   *  If a field is empty, we'll just ignore the update for now
   *  by filtering out invalid values.
   */
  filter(mortgageAmount => !isNaN(mortgageAmount)),
  /*
   *  Demonstrate sharing a stream so saves won't impact
   *  display updates. Behind the scenes this uses a Subject,
   *  which we we learn about in the first lessons of the
   *  Masterclass course.
   */
  share()
);

calculation$.subscribe(mortgageAmount => {
  expected.innerHTML = mortgageAmount;
});

calculation$.pipe(mergeMap(mortgageAmount => saveResponse(mortgageAmount))).subscribe();
