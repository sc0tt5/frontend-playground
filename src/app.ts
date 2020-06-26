import { ObservableStore } from './store';

const store = new ObservableStore({
  user: 'joe',
  isAuthenticated: true
});

store.selectState('user').subscribe(console.log);

store.updateState({
  user: 'bob'
});

store.updateState({
  isAuthenticated: true
});

store.updateState({
  isAuthenticated: false
});
