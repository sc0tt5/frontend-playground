import { EMPTY, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, distinctUntilChanged, pluck, switchMap } from 'rxjs/operators';

/** note: use mergeMap for post/save and switchMap when
 * call is cancellable like get/read
 *
 */
const BASE_URL = 'https://api.openbrewerydb.org/breweries';
// elem refs
const inputBox = document.getElementById('text-input');
const typeaheadContainer = document.getElementById('typeahead-container');

// streams
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMap(searchTerm => {
      return ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`).pipe(catchError(error => EMPTY));
    })
  )
  .subscribe((response: any[]) => {
    typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>');
  });
