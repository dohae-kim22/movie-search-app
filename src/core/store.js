export default class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};

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
  subscribe(key, callback) {
    if (!Array.isArray(this.observers[key])) {
      this.observers[key] = [];
    }
    this.observers[key].push(callback);
  }
}
