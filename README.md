## Observables

An observable is a representation of any set of values over any amount of time (synchronous or asynchronous). The word `Observable` means that something is observing them and they're called `observes`. Observers are objects that implement the very simple observer interface in RxJS. That interface has methods called;
```
- next()
- error()
- complete()
```
These methods correspond to the 3 types of messaging that an observable can produce.
- They push the next value in the data stream to the observer with the next method.
- If they encounter an error, they call the error object.
- When they're done producing values, they call complete.

An observable is not executed until an object subscribes to it. Whenever an observable calls `error` or `complete`, no new values is returned.


## Subscribers
Objects that want to receive value from an observable are passed to a method called `subscribe`. Subscribers are a specific type in RxJS, however it's actually an observer because it implements the observer interface.

### Understanding Observers
Observers are simply collection of callback functions that process values and messages received from an Observable. Observers implement the observer interface, that interface has 3 methods that happen to correspond to the callback functions on an observable.

Observer objects
```
// subscribing with an observer

let myObserver = {
  next: value => console.log(`Value produced: ${value}`),
  error: error => console.log(`ERROR: ${error}`),
  complete: () => console.log('All done producing values'),
}

let sourceObservable$ = of(1, 3, 5);
sourceObservable$.subscribe(myObserver);
```

Observer callback
```
let sourceObservable$ = of(1, 3, 5);

sourceObservable$.subscribe(
  value => console.log(`Value produced: ${value}`),
  error => console.log(`ERROR: ${error}`),
  () => console.log('All done producing values'),
);
```

## Categories of Operators
Operators simply operate or act on observables

1. Transformation
2. Filtering
3. Combination
4. Utility
5. Conditional
6. Aggregate
7. Multicasting

