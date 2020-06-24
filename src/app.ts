import { interval, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

const subject = new Subject();
const subscription = subject.subscribe(observer);

subject.next('Hello');

const secondSubscription = subject.subscribe(observer);

subject.next('World');

const interval$ = interval(2000).pipe(tap(i => console.log('new interval', i)));
