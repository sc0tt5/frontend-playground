import { from } from 'rxjs';

function* hello() {
  yield 'Hello';
  yield 'World';
}

const observer = {
  next: value => console.log('next:::', value),
  error: error => console.log('error:::', error),
  complete: () => console.log('complete!')
};

const source$ = from(fetch('https://api.github.com/users/octocat'));

source$.subscribe(observer);
