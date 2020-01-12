import { Observable, of, from, fromEvent, concat, interval, throwError } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { mergeMap, filter, tap, catchError, take, takeUntil } from 'rxjs/operators';
import { allBooks, allReaders } from './data';

//#region Creating observables
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
concat(source1$, source2$)
//   .subscribe(value => console.log(value));


// Creating observables to handle events
// const button = document.getElementById('readersButton');

fromEvent(button, 'click')
  // .subscribe(event => {
  //   console.log(event);

  //   let readersDiv = document.getElementById('readers');

  //   for (let reader of allReaders) {
  //     readersDiv.innerHTML += reader.name + '<br>';
  //   }
  // });


// making AJAX requests with observables
// Creating observables to handle events
// let button = document.getElementById('readersButton');

fromEvent(button, 'click')
  .subscribe(event => {
    ajax('/api/readers')
      .subscribe(ajaxResponse => {
        console.log(ajaxResponse);
        let readers = ajaxResponse.response;

          let readersDiv = document.getElementById('readers');

          for (let reader of readers) {
            readersDiv.innerHTML += reader.name + '<br>';
          }
      });
  });

//#endregion

//#region Subscribing to Observables with Observers

let books$ = from(allBooks);

// let booksObserver = {
//   next: book => console.log(`Title: ${book.title}`),
//   error: error => console.log(`ERROR: ${error}`),
//   complete: () => console.log('All done!'),
// }

// all of the function arguments to subscribe are optional
// books$.subscribe(
//   book => console.log(`Title: ${book.title}`),
//   error => console.log(`ERROR: ${error}`),
//   () => console.log('All done!'),
// );

// let currentTime$ = new Observable(subscriber => {
//   const timeString = new Date().toLocaleTimeString();
//   subscriber.next(timeString);
//   subscriber.complete();
// });

// currentTime$.subscribe(
//   currentTime => console.log(`Observer 1: ${currentTime}`)
// );

// setTimeout(() => {
//   currentTime$.subscribe(
//     currentTime => console.log(`Observer 2: ${currentTime}`)
//   );
// }, 1000);

// setTimeout(() => {
//   currentTime$.subscribe(
//     currentTime => console.log(`Observer 3: ${currentTime}`)
//   );
// }, 2000);

// let timesDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

// // let timers$ = interval(1000);
// let timers$ = new Observable(subscriber => {
//   let i = 0;

//   let intervalID = setInterval(() => {
//     subscriber.next(i++);
//   }, 1000);

//   return () => {
//     console.log('Executing teardown code');
//     clearInterval(intervalID);
//   }
// });

// let timerSubscription = timers$
  // .subscribe(
  //   value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
  //   null,
  //   () => console.log('All done!'),
  // );

// let timerConsoleSubscription = timers$
  // .subscribe(
  //   value => console.log(`${new Date().toLocaleTimeString()} (${value})`)
  // )

// timerSubscription.add(timerConsoleSubscription);

// fromEvent(button, 'click')
  // .subscribe(
  //   event => timerSubscription.unsubscribe(),
  // )

//#endregion

//#region Using Operators

// ajax('/api/errors/500')
//   .pipe(
//     mergeMap(ajaxResponse => ajaxResponse.response),
//     filter(book => book.publicationYear < 1950),
//     tap(oldBook => console.log(`Title: ${oldBook.title}`)),
//     // catchError(err => of({ title: 'Corduroy', author: 'Don Freeman' }))
//     // catchError((error, caught) => caught)
//     // catchError(err => { throw `Something bad happened - ${err.message}` })
//     catchError(err => throwError(err.message))
//   )
//   .subscribe(
//     finalValue => console.log(`VALUE: ${finalValue.title}`),
//     error => console.log(`ERROR: ${error}`),
//   )


let timesDiv = document.getElementById('times');
let button = document.getElementById('timerButton');

// let timers$ = interval(1000);
let timers$ = new Observable(subscriber => {
  let i = 0;

  let intervalID = setInterval(() => {
    subscriber.next(i++);
  }, 1000);

  return () => {
    console.log('Executing teardown code');
    clearInterval(intervalID);
  }
});

let timerSubscription = timers$
  .subscribe(
    value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
    null,
    () => console.log('All done!'),
  );

//#endregion
