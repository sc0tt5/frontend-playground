import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilKeyChanged, map, scan } from 'rxjs/operators';

export class ObservableStore {
  private initialState: object;
  private stateUpdate$: Subject<object> = new Subject();
  private store$: BehaviorSubject<object>;

  constructor(initialState: object) {
    this.initialState = initialState || {};
    this.store$ = new BehaviorSubject(this.initialState);

    this.stateUpdate$
      .pipe(
        scan((current, updated) => {
          return { ...current, ...updated };
        }, this.initialState)
      )
      .subscribe(this.store$);
  }

  selectState(key: string): Observable<object> {
    return this.store$.pipe(
      distinctUntilKeyChanged(key as never),
      map(state => state[key])
    );
  }

  stateChanges(): Observable<object> {
    return this.store$.asObservable();
  }

  updateState(newState: object): void {
    this.stateUpdate$.next(newState);
  }
}
