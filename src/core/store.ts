interface IObservers {
  [key: string]: ISubscribeCallback[];
}

interface ISubscribeCallback {
  (arg: unknown): void;
}

export default class Store<S> {
  public state = {} as S;
  private observers = {} as IObservers;
  constructor(state: S) {
    // Iterate through each state and set up getters and setters
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (val) => {
          state[key] = val; // Update state value
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }
  // Method to subscribe to state changes
  subscribe(key: string, callback: ISubscribeCallback) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(callback)
      : (this.observers[key] = [callback]);
  }
}
