import { Observable } from 'rxjs';

const observer = {
  next: value => console.log('next', value),
  error: error => console.log('error', error),
  complete: () => console.log('complete')
};

const observable = new Observable(subscriber => {
  let count = 0;

  const id = setInterval(() => {
    subscriber.next(count);
    count += 1;
  }, 1000);

  return () => {
    console.log('called');
    clearInterval(id);
  };
});

const subscription = observable.subscribe(observer);

setTimeout(() => {
  subscription.unsubscribe();
}, 3500);
