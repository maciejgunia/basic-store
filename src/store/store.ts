export class Store {
    private subscribers: Function[];
    private reducers: { [key: string]: Function };
    private state: { [key: string]: any };

    constructor(reducers = {}, initialState = {}) {
        this.subscribers = [];
        this.reducers = reducers;
        this.state = this.reduce(initialState, {});
    }

    get value() {
        return this.state;
    }

    subscribe(fn) {
        this.subscribers = [...this.subscribers, fn];
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn);
        };
    }

    public dispatch(action) {
        this.state = this.reduce(this.state, action);
        this.subscribers.forEach(sub => sub(this.value));
    }

    private reduce(state, action) {
        const newState = {};
        for (const prop in this.reducers) {
            newState[prop] = this.reducers[prop](state[prop], action);
        }
        return newState;
    }
}
