import { from } from 'rxjs';

function* hello() {
  yield 'Hello';
  yield 'World';
}

const iterator = hello();

const observer = {
  next: value => console.log('next:::', value),
  error: error => console.log('error:::', error),
  complete: () => console.log('complete!')
};

const source$ = from(iterator);

source$.subscribe(observer);
