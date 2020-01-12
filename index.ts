import { Observable } from 'rxjs';
import { allBooks } from './data';

let allBookObservabel$ = new Observable(subscriber => {
  // defines what will happen when the observable is executed
  if (document.title !== 'RxBookTracker') {
    subscriber.error('Incorrect page title');
  }

  for (let book of allBooks) {
    subscriber.next(book);
  }

  setTimeout(() => {
    subscriber.complete();
  }, 2000);

  return () => console.log(`Executing teardown code`);
});

allBookObservabel$.subscribe(book => console.log(book.title));
