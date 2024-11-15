import { TodoList } from "./Components/TodoList.js";
import { fetchJson } from "./functions/api.js";
import { createElement } from "./functions/dom.js";

(async () => {
    try {
        const todos = await fetchJson('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const list = new TodoList(todos);
        list.appendTo(document.querySelector('#todoList')); 
    } catch (e) {
        const AlertElement = createElement('div', {
            class: 'alert alert-danger m-2',
            role: 'alert'
        });
        AlertElement.innerText = "Impossible de charger les éléments.";
        document.body.prepend(AlertElement);
    }
})();
