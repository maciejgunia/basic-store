import { Store } from "./store/store";

import { reducer } from "./store/reducers";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

const reducers = {
    todos: reducer
};
const store = new Store(reducers);

button.addEventListener(
    "click",
    () => {
        if (!input.value.trim()) return;

        const payload = { label: input.value, complete: false };

        store.dispatch({
            type: "ADD_TODO",
            payload
        });

        input.value = "";
    },
    false
);

store.subscribe(state => {
    todoList.innerHTML = "";
    state.todos.data.forEach(item => {
        const itemElement = document.createElement("li");
        itemElement.innerHTML = item.label;
        todoList.appendChild(itemElement);
    });
});
