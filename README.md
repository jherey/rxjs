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


Source: [RxJS Pluralsight](https://app.pluralsight.com/library/courses/91a768ba-e8b1-43c3-9c1c-8106dc058891/table-of-contents)
