import { Observable, of, from, fromEvent, concat } from 'rxjs';
import { allBooks, allReaders } from './data';

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

// allBookObservabel$.subscribe(book => console.log(book.title));


// from and of allow you create an observable from data you already have
let source1$ = of('hello', 10, true, allReaders[0].name);

// source1$.subscribe(value => console.log(value));

let source2$ = from(allBooks);

// source2$.subscribe(book => console.log(book.title));


// combining two observables into one
// concat(source1$, source2$)
//   .subscribe(value => console.log(value));


// Creating observables to handle events
const button = document.getElementById('readersButton');

fromEvent(button, 'click')
  .subscribe(event => {
    console.log(event);

    let readersDiv = document.getElementById('readers');

    for (let readers of allReaders) {
      readersDiv.innerHTML += readers.name + '<br>';
    }
  });
